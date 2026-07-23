import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const contentDirectories = ["src/content/posts", "src/content/pages"];
const relatedPages = new Map([
  ["src/data/now.ts", "src/content/pages/now.md"],
  ["src/data/whois.ts", "src/content/pages/whois.md"],
]);

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });
}

function stagedFiles() {
  const output = git([
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=ACMR",
    "-z",
    "--",
    ...contentDirectories,
    ...relatedPages.keys(),
  ]);

  return output
    .toString()
    .split("\0")
    .filter(Boolean);
}

function pageTargets(files) {
  const targets = new Set();

  for (const file of files) {
    if (
      file.endsWith(".md") &&
      contentDirectories.some((directory) => file.startsWith(`${directory}/`))
    ) {
      targets.add(file);
    }

    const relatedPage = relatedPages.get(file);
    if (relatedPage) {
      targets.add(relatedPage);
    }
  }

  return targets;
}

function withUpdatedAt(source, timestamp, file) {
  const frontmatter = source.match(
    /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/,
  );

  if (!frontmatter) {
    throw new Error(`${file} does not have an opening front matter block`);
  }

  const matches = frontmatter[2].match(/^updatedAt:[^\r\n]*$/gm) ?? [];
  if (matches.length !== 1) {
    throw new Error(
      `${file} must contain exactly one updatedAt field in its front matter`,
    );
  }

  const updatedFrontmatter = frontmatter[2].replace(
    /^updatedAt:[^\r\n]*$/m,
    `updatedAt: "${timestamp}"`,
  );

  return source.replace(
    frontmatter[0],
    `${frontmatter[1]}${updatedFrontmatter}${frontmatter[3]}`,
  );
}

function stagedEntry(file) {
  const entry = git(["ls-files", "--stage", "--", file], {
    encoding: "utf8",
  }).trim();
  const match = entry.match(/^(\d+) [0-9a-f]+ 0\t/);

  if (!match) {
    throw new Error(`${file} is not present in the Git index`);
  }

  return {
    mode: match[1],
    source: git(["show", `:${file}`], { encoding: "utf8" }),
  };
}

function updatePage(file, timestamp) {
  const { mode, source } = stagedEntry(file);
  const updatedSource = withUpdatedAt(source, timestamp, file);
  const blob = git(["hash-object", "-w", "--stdin"], {
    encoding: "utf8",
    input: updatedSource,
  }).trim();

  git(["update-index", "--cacheinfo", mode, blob, file]);

  const workingSource = readFileSync(file, "utf8");
  const updatedWorkingSource = withUpdatedAt(workingSource, timestamp, file);
  if (workingSource !== updatedWorkingSource) {
    writeFileSync(file, updatedWorkingSource);
  }

  console.log(`Updated ${file} to ${timestamp}`);
}

try {
  const targets = pageTargets(stagedFiles());

  if (targets.size > 0) {
    const timestamp = new Date().toISOString();
    for (const target of targets) {
      updatePage(target, timestamp);
    }
  }
} catch (error) {
  console.error(`Unable to update front matter: ${error.message}`);
  process.exitCode = 1;
}
