import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const sourcePath = args.find((arg) => !arg.startsWith("--"));
const force = args.includes("--force");
const downloadImages = args.includes("--download-images");
const rootDir = process.cwd();
const unknownNodeTypes = new Map();
const failedImages = [];

if (!sourcePath) {
  console.error(
    "Usage: npm run import:ghost -- /path/to/export.json [--download-images] [--force]",
  );
  process.exit(1);
}

const raw = JSON.parse(await readFile(path.resolve(sourcePath), "utf8"));
const database = raw?.db?.[0];
const data = database?.data;

if (!data?.posts || !data?.users || !data?.posts_authors) {
  throw new Error("The input file does not look like a supported Ghost export.");
}

const usersById = new Map(data.users.map((user) => [user.id, user]));
const tagsById = new Map((data.tags ?? []).map((tag) => [tag.id, tag]));
const authorsByPost = groupRelations(data.posts_authors, "post_id", "author_id");
const tagsByPost = groupRelations(data.posts_tags ?? [], "post_id", "tag_id");
const metaByPost = new Map(
  (data.posts_meta ?? []).map((metadata) => [metadata.post_id, metadata]),
);

const imageSources = [
  ...new Set(
    data.posts.flatMap((post) => {
      const document = parseLexical(post);
      return collectNodes(document?.root, "image")
        .map((node) => node.src)
        .filter(Boolean);
    }),
  ),
];

const imageMap = downloadImages
  ? await mirrorImages(imageSources)
  : new Map(imageSources.map((source) => [source, source]));

await mkdir(path.join(rootDir, "src/content/posts"), { recursive: true });
await mkdir(path.join(rootDir, "src/content/pages"), { recursive: true });

const report = {
  sourceVersion: database.meta?.version ?? null,
  exportedOn: database.meta?.exported_on
    ? new Date(database.meta.exported_on).toISOString()
    : null,
  posts: 0,
  pages: 0,
  written: [],
  skippedExisting: [],
  mirroredImages: Object.fromEntries(imageMap),
  failedImages,
  excludedInternalTags: [],
  unknownNodeTypes: {},
};

for (const post of data.posts) {
  const document = parseLexical(post);
  const content = renderBlockChildren(document.root.children ?? []).trim();
  const isPage = post.type === "page";
  const destination = path.join(
    rootDir,
    "src/content",
    isPage ? "pages" : "posts",
    `${post.slug}.md`,
  );

  const authors = (authorsByPost.get(post.id) ?? [])
    .map((id) => usersById.get(id)?.name)
    .filter(Boolean);
  const assignedTags = (tagsByPost.get(post.id) ?? [])
    .map((id) => tagsById.get(id))
    .filter(Boolean);
  const publicTags = assignedTags
    .filter((tag) => tag.visibility === "public")
    .map((tag) => tag.name);
  const internalTags = assignedTags
    .filter((tag) => tag.visibility !== "public")
    .map((tag) => tag.name);
  report.excludedInternalTags.push(...internalTags);

  const metadata = metaByPost.get(post.id) ?? {};
  const description =
    post.custom_excerpt ||
    metadata.meta_description ||
    makeExcerpt(post.plaintext ?? "");
  const frontmatter = serializeFrontmatter({
    title: post.title,
    slug: post.slug,
    description,
    publishedAt: post.published_at ?? post.created_at,
    updatedAt: post.updated_at ?? post.published_at ?? post.created_at,
    author: authors[0] ?? "Michael Stanclift",
    tags: publicTags,
    draft: post.status !== "published",
    featured: Boolean(post.featured),
    canonicalUrl: post.canonical_url || undefined,
    metaTitle: metadata.meta_title || undefined,
    ghostId: post.uuid,
  });
  const output = `${frontmatter}\n\n${content}\n`;

  if (!force && (await exists(destination))) {
    report.skippedExisting.push(path.relative(rootDir, destination));
    continue;
  }

  await writeFile(destination, output, "utf8");
  report.written.push(path.relative(rootDir, destination));
  report[isPage ? "pages" : "posts"] += 1;
}

report.excludedInternalTags = [...new Set(report.excludedInternalTags)].sort();
report.unknownNodeTypes = Object.fromEntries(
  [...unknownNodeTypes.entries()].sort(([left], [right]) =>
    left.localeCompare(right),
  ),
);

await writeFile(
  path.join(rootDir, "migration-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(
  `Imported ${report.posts} posts and ${report.pages} pages. ` +
    `${report.skippedExisting.length} existing files were skipped.`,
);
if (downloadImages) {
  console.log(
    `Mirrored ${imageMap.size - failedImages.length} images into ` +
      `public/images/migrated; ${failedImages.length} were unavailable.`,
  );
}
if (unknownNodeTypes.size > 0) {
  console.warn("Some unknown Lexical nodes were rendered using their children.");
}

function groupRelations(relations, key, value) {
  const grouped = new Map();
  for (const relation of relations) {
    const values = grouped.get(relation[key]) ?? [];
    values.push(relation[value]);
    grouped.set(relation[key], values);
  }
  return grouped;
}

function parseLexical(post) {
  try {
    return JSON.parse(post.lexical);
  } catch (error) {
    throw new Error(`Could not parse Lexical content for ${post.slug}`, {
      cause: error,
    });
  }
}

function collectNodes(node, type) {
  if (!node || typeof node !== "object") return [];
  const matches = node.type === type ? [node] : [];
  for (const child of node.children ?? []) {
    matches.push(...collectNodes(child, type));
  }
  return matches;
}

function renderBlockChildren(children) {
  return children
    .map((child) => renderBlock(child))
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{4,}/g, "\n\n\n");
}

function renderBlock(node) {
  switch (node.type) {
    case "paragraph":
      return renderInlineChildren(node.children).trimEnd();
    case "extended-heading": {
      const level = Number(node.tag?.slice(1)) || 2;
      return `${"#".repeat(level)} ${renderInlineChildren(node.children)}`;
    }
    case "extended-quote":
      return renderInlineChildren(node.children)
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "list":
      return renderList(node, 0);
    case "codeblock":
      return renderCodeBlock(node);
    case "image": {
      const source = imageMap.get(node.src) ?? node.src;
      const alt = escapeInline(node.alt || node.title || "");
      const title = node.title ? ` ${JSON.stringify(node.title)}` : "";
      const image = `![${alt}](${source}${title})`;
      const caption = node.caption
        ? `\n\n<small class="image-caption">${node.caption}</small>`
        : "";
      return `${image}${caption}`;
    }
    case "markdown":
      return node.markdown?.trim() ?? "";
    case "html":
      return node.html?.trim() ?? "";
    case "linebreak":
      return "  \n";
    default:
      unknownNodeTypes.set(
        node.type ?? "unknown",
        (unknownNodeTypes.get(node.type ?? "unknown") ?? 0) + 1,
      );
      if (node.children) return renderBlockChildren(node.children);
      return "";
  }
}

function renderInlineChildren(children = []) {
  let output = "";
  let index = 0;

  while (index < children.length) {
    const format = getInlineFormat(children[index]);
    const run = [];

    while (
      index < children.length &&
      getInlineFormat(children[index]) === format
    ) {
      run.push(children[index]);
      index += 1;
    }

    const content = run
      .map((child) => renderInlineBase(child, format))
      .join("");
    output += applyFormat(content, format);
  }

  return output;
}

function renderInline(node) {
  return renderInlineChildren([node]);
}

function renderInlineBase(node, inheritedFormat) {
  switch (node.type) {
    case "extended-text":
    case "text":
    case "tab":
      return escapeInline(node.text ?? "");
    case "linebreak":
      return "  \n";
    case "link": {
      const label =
        (getInlineFormat(node) === inheritedFormat
          ? node.children
              .map((child) => renderInlineBase(child, inheritedFormat))
              .join("")
          : renderInlineChildren(node.children)) || escapeInline(node.url);
      const title = node.title ? ` ${JSON.stringify(node.title)}` : "";
      return `[${label}](${escapeUrl(node.url)}${title})`;
    }
    default:
      if (node.children) return renderInlineChildren(node.children);
      return renderBlock(node);
  }
}

function getInlineFormat(node) {
  if (["extended-text", "text", "tab"].includes(node.type)) {
    return node.format ?? 0;
  }
  if (node.type === "link") {
    const formats = new Set(
      (node.children ?? [])
        .filter((child) => ["extended-text", "text", "tab"].includes(child.type))
        .map((child) => child.format ?? 0),
    );
    if (formats.size === 1) return [...formats][0];
  }
  return 0;
}

function applyFormat(content, format) {
  if (!content || format === 0) return content;
  const leading = content.match(/^\s*/)?.[0] ?? "";
  const trailing = content.match(/\s*$/)?.[0] ?? "";
  let output = content.slice(leading.length, content.length - trailing.length);
  if (!output) return content;

  if (format & 16) {
    const fence = output.includes("`") ? "``" : "`";
    return `${leading}${fence}${output}${fence}${trailing}`;
  }

  if (format & 8) output = `<u>${output}</u>`;
  if (format & 4) output = `~~${output}~~`;
  if (format & 2) output = `_${output}_`;
  if (format & 1) output = `**${output}**`;
  return `${leading}${output}${trailing}`;
}

function renderList(node, depth) {
  const ordered = node.listType === "number" || node.tag === "ol";
  const start = Number(node.start) || 1;
  return (node.children ?? [])
    .map((item, index) => renderListItem(item, depth, ordered, start + index))
    .join("\n");
}

function renderListItem(item, depth, ordered, number) {
  const indent = "  ".repeat(depth);
  const marker = ordered ? `${number}.` : "-";
  const blocks = [];
  const nestedLists = [];

  for (const child of item.children ?? []) {
    if (child.type === "list") nestedLists.push(child);
    else if (isInlineNode(child)) blocks.push(renderInline(child));
    else blocks.push(renderBlock(child));
  }

  const lines = blocks
    .filter(Boolean)
    .join(" ")
    .split("\n")
    .filter((line, index, all) => line || index < all.length - 1);
  const firstLine = lines.shift() ?? "";
  const continuation = lines
    .map((line) => `${indent}  ${line}`)
    .join("\n");
  const nested = nestedLists
    .map((list) => renderList(list, depth + 1))
    .join("\n");

  return [
    `${indent}${marker} ${firstLine}`,
    continuation,
    nested,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderCodeBlock(node) {
  const code = node.code ?? "";
  const longestFence = Math.max(
    3,
    ...[...code.matchAll(/`+/g)].map((match) => match[0].length + 1),
  );
  const fence = "`".repeat(longestFence);
  const language = (node.language ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9_+-]/g, "");
  const caption = node.caption
    ? `\n\n<small class="code-caption">${node.caption}</small>`
    : "";
  return `${fence}${language}\n${code.replace(/\n$/, "")}\n${fence}${caption}`;
}

function escapeInline(value = "") {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/([*_[\]])/g, "\\$1")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeUrl(value = "") {
  const isGhostUrl = /^(?:__)?GHOST_URL(?:__)?/.test(value);
  let normalized = value.replace(/^(?:__)?GHOST_URL(?:__)?\/?/, "/");

  if (isGhostUrl && !/[?#]/.test(normalized)) {
    normalized = `${normalized.replace(/\/+$/, "")}/`;
  }
  if (normalized === "/new-recruit-er-239b48359021/") {
    normalized = "/new-recruit-er/";
  }

  return normalized
    .replace(/ /g, "%20")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
}

function makeExcerpt(plaintext) {
  const normalized = plaintext.replace(/\s+/g, " ").trim();
  if (normalized.length <= 190) return normalized;
  const shortened = normalized.slice(0, 190).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

function serializeFrontmatter(values) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        value.forEach((item) => lines.push(`  - ${JSON.stringify(item)}`));
      }
      continue;
    }
    lines.push(
      `${key}: ${typeof value === "string" ? JSON.stringify(value) : value}`,
    );
  }
  lines.push("---");
  return lines.join("\n");
}

function isInlineNode(node) {
  return [
    "extended-text",
    "text",
    "tab",
    "linebreak",
    "link",
  ].includes(node.type);
}

async function mirrorImages(sources) {
  const destinationDir = path.join(rootDir, "public/images/migrated");
  await mkdir(destinationDir, { recursive: true });
  const mapping = new Map();

  for (const source of sources) {
    const url = new URL(source);
    const originalName = path.basename(url.pathname) || "image";
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const destination = path.join(destinationDir, safeName);
    const publicPath = `/images/migrated/${safeName}`;

    if (!force && (await exists(destination))) {
      mapping.set(source, publicPath);
      continue;
    }

    const response = await fetch(source);
    if (!response.ok) {
      failedImages.push({ source, status: response.status });
      mapping.set(source, source);
      console.warn(`Could not mirror ${source}: HTTP ${response.status}`);
      continue;
    }
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    mapping.set(source, publicPath);
  }

  return mapping;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
