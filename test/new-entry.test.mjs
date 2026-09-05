import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { runNode, temporaryProject, write } from "../test-utils/helpers.mjs";

function project() {
  const root = temporaryProject("new-entry");
  write(root, "src/config.ts", 'export const SITE = {\n  author: "Test Author",\n};\n');
  return root;
}

test("new-entry creates normalized draft post frontmatter", () => {
  const root = project();
  const result = runNode(
    "scripts/new-entry.mjs",
    ["post", "L'été & Déjà Vu", "--date", "2026-02-03", "--description", "A test"],
    root,
  );

  assert.equal(result.status, 0, result.stderr);
  const source = readFileSync(path.join(root, "src/content/posts/lete-deja-vu.md"), "utf8");
  assert.match(source, /slug: "lete-deja-vu"/);
  assert.match(source, /description: "A test"/);
  assert.match(source, /publishedAt: "2026-02-03"/);
  assert.match(source, /updatedAt: "2026-02-03"/);
  assert.match(source, /author: "Test Author"/);
  assert.match(source, /draft: true/);
  assert.match(result.stdout, /Created src\/content\/posts\/lete-deja-vu\.md/);
});

test("new-entry supports pages, explicit slugs, and publishing", () => {
  const root = project();
  const result = runNode(
    "scripts/new-entry.mjs",
    ["page", "About", "--slug", "Résumé Page", "--publish"],
    root,
  );

  assert.equal(result.status, 0, result.stderr);
  const source = readFileSync(path.join(root, "src/content/pages/resume-page.md"), "utf8");
  assert.match(source, /draft: false/);
  assert.doesNotMatch(source, /^tags:/m);
  assert.match(result.stdout, /Add it to navigation/);
});

test("new-entry rejects duplicates across collections", () => {
  const root = project();
  write(root, "src/content/pages/taken.md", "---\nslug: taken\n---\n");

  const result = runNode("scripts/new-entry.mjs", ["post", "Taken"], root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Slug "taken" is already used/);
});

test("new-entry validates its command line", () => {
  const cases = [
    { args: [], message: /First argument/ },
    { args: ["note", "Title"], message: /First argument/ },
    { args: ["post"], message: /Second argument/ },
    { args: ["post", "!!!"], message: /Could not derive a slug/ },
    { args: ["post", "Title", "--date", "03-02-2026"], message: /YYYY-MM-DD/ },
    { args: ["post", "Title", "--description"], message: /needs a value/ },
    { args: ["post", "Title", "--publsh"], message: /Unknown option/ },
  ];

  for (const { args, message } of cases) {
    const result = runNode("scripts/new-entry.mjs", args, project());
    assert.equal(result.status, 1, args.join(" "));
    assert.match(result.stderr, message, args.join(" "));
  }
});

test("new-entry reports a missing author and never replaces an existing file", () => {
  const root = temporaryProject("new-entry-errors");
  write(root, "src/config.ts", "export const SITE = {};\n");
  let result = runNode("scripts/new-entry.mjs", ["post", "Fresh"], root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Could not find author/);

  write(root, "src/config.ts", 'export const SITE = {\n  author: "Test",\n};\n');
  write(root, "src/content/posts/fresh.md", "not frontmatter\n");
  result = runNode("scripts/new-entry.mjs", ["post", "Fresh"], root);
  assert.equal(result.status, 1);
  assert.equal(
    readFileSync(path.join(root, "src/content/posts/fresh.md"), "utf8"),
    "not frontmatter\n",
  );
});
