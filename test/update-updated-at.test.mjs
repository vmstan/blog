import assert from "node:assert/strict";
import { readFileSync, rmSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  git,
  initializeGit,
  runNode,
  temporaryProject,
  validFrontmatter,
  write,
} from "../test-utils/helpers.mjs";

function committedProject() {
  const root = temporaryProject("updated-at");
  initializeGit(root);
  write(root, "src/content/posts/fixture.md", validFrontmatter());
  write(root, "src/content/pages/now.md", validFrontmatter());
  write(root, "src/content/pages/whois.md", validFrontmatter());
  write(root, "src/data/now.ts", "export const value = 1;\n");
  write(root, "src/data/whois.ts", "export const value = 1;\n");
  write(root, "src/data/credly-badges.json", "{}\n");
  git(root, "add", ".");
  git(root, "commit", "-qm", "initial");
  return root;
}

test("update-updated-at updates staged content in the index and working tree", () => {
  const root = committedProject();
  write(root, "src/content/posts/fixture.md", `${validFrontmatter()}Changed\n`);
  git(root, "add", "src/content/posts/fixture.md");

  const result = runNode("scripts/update-updated-at.mjs", [], root);

  assert.equal(result.status, 0, result.stderr);
  const working = readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8");
  const staged = git(root, "show", ":src/content/posts/fixture.md");
  const timestamp = working.match(/^updatedAt: "([^"]+)"$/m)?.[1];
  assert.ok(timestamp);
  assert.equal(new Date(timestamp).toISOString(), timestamp);
  assert.match(staged, new RegExp(`updatedAt: "${timestamp}"`));
});

test("update-updated-at maps changed data files to their pages", () => {
  const root = committedProject();
  write(root, "src/data/now.ts", "export const value = 2;\n");
  write(root, "src/data/credly-badges.json", '{"changed":true}\n');
  git(root, "add", "src/data/now.ts", "src/data/credly-badges.json");

  const result = runNode("scripts/update-updated-at.mjs", [], root);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /src\/content\/pages\/now\.md/);
  assert.match(result.stdout, /src\/content\/pages\/whois\.md/);
  assert.doesNotMatch(result.stdout, /posts\/fixture/);
});

test("update-updated-at rejects malformed or duplicate fields", () => {
  for (const source of ["No frontmatter\n", validFrontmatter().replace("---\n\nBody", "updatedAt: other\n---\n\nBody")]) {
    const root = committedProject();
    write(root, "src/content/posts/fixture.md", source);
    git(root, "add", "src/content/posts/fixture.md");
    const result = runNode("scripts/update-updated-at.mjs", [], root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /opening front matter|exactly one updatedAt/);
  }
});

test("update-updated-at repairs unchanged timestamps across a commit range", () => {
  const root = committedProject();
  const base = git(root, "rev-parse", "HEAD");
  write(root, "src/content/posts/fixture.md", `${validFrontmatter()}New paragraph\n`);
  git(root, "add", "src/content/posts/fixture.md");
  git(root, "commit", "-qm", "change body");
  const head = git(root, "rev-parse", "HEAD");
  const committedAt = new Date(git(root, "show", "-s", "--format=%cI", head)).toISOString();

  const result = runNode(
    "scripts/update-updated-at.mjs",
    ["--repair-range", base, head],
    root,
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8"),
    new RegExp(`updatedAt: "${committedAt}"`),
  );
});

test("update-updated-at leaves explicitly updated and deleted range targets alone", () => {
  const root = committedProject();
  const base = git(root, "rev-parse", "HEAD");
  write(root, "src/content/posts/fixture.md", validFrontmatter("2025-01-01"));
  git(root, "add", "src/content/posts/fixture.md");
  git(root, "commit", "-qm", "update timestamp");
  const head = git(root, "rev-parse", "HEAD");

  const result = runNode("scripts/update-updated-at.mjs", ["--repair-range", base, head], root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "");
  assert.match(readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8"), /updatedAt: "2025-01-01"/);
});

test("update-updated-at validates repair arguments and unknown options", () => {
  const root = committedProject();
  for (const args of [["--repair-range"], ["--unknown"]]) {
    const result = runNode("scripts/update-updated-at.mjs", args, root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /requires a base and head|unknown argument/);
  }
});

test("update-updated-at reports malformed range content", () => {
  for (const source of ["No frontmatter\n", validFrontmatter().replace("---\n\nBody", "updatedAt: other\n---\n\nBody")]) {
    const root = committedProject();
    const base = git(root, "rev-parse", "HEAD");
    write(root, "src/content/posts/fixture.md", source);
    git(root, "add", "src/content/posts/fixture.md");
    git(root, "commit", "-qm", "malformed content");
    const head = git(root, "rev-parse", "HEAD");
    const result = runNode("scripts/update-updated-at.mjs", ["--repair-range", base, head], root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /opening front matter|exactly one updatedAt/);
  }
});

test("update-updated-at reports mapped pages missing from the index", () => {
  const root = committedProject();
  write(root, "src/data/now.ts", "export const value = 2;\n");
  rmSync(path.join(root, "src/content/pages/now.md"));
  git(root, "add", "src/data/now.ts");
  git(root, "rm", "-q", "src/content/pages/now.md");
  const result = runNode("scripts/update-updated-at.mjs", [], root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /now\.md is not present in the Git index/);
});

test("update-updated-at ignores a related page absent from a repair range", () => {
  const root = committedProject();
  git(root, "rm", "-q", "src/content/pages/whois.md");
  git(root, "commit", "-qm", "remove whois page");
  const base = git(root, "rev-parse", "HEAD");
  write(root, "src/data/credly-badges.json", '{"changed":true}\n');
  git(root, "add", "src/data/credly-badges.json");
  git(root, "commit", "-qm", "update badges");
  const head = git(root, "rev-parse", "HEAD");
  const result = runNode("scripts/update-updated-at.mjs", ["--repair-range", base, head], root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "");
});
