import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const collections = new Map([
  ["post", "src/content/posts"],
  ["page", "src/content/pages"],
]);

function usage(message) {
  if (message) console.error(`${message}\n`);
  console.error(
    [
      "Usage: pnpm new <post|page> <title> [options]",
      "",
      "  --slug <slug>          Override the slug derived from the title",
      "  --description <text>   Meta description",
      "  --date <YYYY-MM-DD>    Publish date (default: today)",
      "  --publish              Create with draft: false",
    ].join("\n"),
  );
  process.exit(1);
}

function parseArguments(argv) {
  const positional = [];
  const options = {};
  const valueOptions = new Set(["slug", "description", "date"]);

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--publish") {
      options.publish = true;
      continue;
    }

    if (argument.startsWith("--")) {
      const name = argument.slice(2);
      if (!valueOptions.has(name)) usage(`Unknown option: ${argument}`);
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        usage(`${argument} needs a value`);
      }
      options[name] = value;
      index += 1;
      continue;
    }

    positional.push(argument);
  }

  return { positional, options };
}

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// The author lives in src/config.ts, which is TypeScript this script cannot
// import. Reading the literal keeps a single source of truth without a build.
function siteAuthor() {
  const config = readFileSync("src/config.ts", "utf8");
  const match = config.match(/^\s*author:\s*"([^"]+)"/m);

  if (!match) {
    throw new Error("Could not find author in src/config.ts");
  }

  return match[1];
}

function existingSlugs() {
  const slugs = new Map();

  for (const directory of collections.values()) {
    for (const file of readdirSync(directory)) {
      if (!file.endsWith(".md")) continue;

      const path = join(directory, file);
      const match = readFileSync(path, "utf8").match(/^slug:\s*"?([^"\r\n]+)"?/m);
      if (match) slugs.set(match[1].trim(), path);
    }
  }

  return slugs;
}

function today() {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function frontMatter(fields) {
  const lines = Object.entries(fields).map(([key, value]) => {
    if (typeof value === "boolean") return `${key}: ${value}`;
    return `${key}: ${JSON.stringify(value)}`;
  });

  return `---\n${lines.join("\n")}\n---\n`;
}

try {
  const { positional, options } = parseArguments(process.argv.slice(2));
  const [kind, title] = positional;

  if (!collections.has(kind)) usage("First argument must be 'post' or 'page'");
  if (!title) usage("Second argument must be the title");

  const slug = options.slug ? slugify(options.slug) : slugify(title);
  if (!slug) usage(`Could not derive a slug from ${JSON.stringify(title)}`);

  const date = options.date ?? today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) usage("--date must be YYYY-MM-DD");

  const taken = existingSlugs().get(slug);
  if (taken) throw new Error(`Slug "${slug}" is already used by ${taken}`);

  const path = join(collections.get(kind), `${slug}.md`);

  // The pre-commit hook rewrites updatedAt on staged content, so seeding it
  // with the publish date is enough to satisfy the schema until then.
  const source = frontMatter({
    title,
    slug,
    description: options.description ?? "",
    publishedAt: date,
    updatedAt: date,
    author: siteAuthor(),
    draft: !options.publish,
    featured: false,
  });

  writeFileSync(path, `${source}\n`, { flag: "wx" });

  console.log(`Created ${path}`);
  if (!options.description) console.log("Add a description before publishing.");
  if (!options.publish) console.log("Set draft: false when it is ready.");
  if (kind === "page") console.log("Add it to navigation in src/config.ts.");
} catch (error) {
  console.error(`Unable to create entry: ${error.message}`);
  process.exitCode = 1;
}
