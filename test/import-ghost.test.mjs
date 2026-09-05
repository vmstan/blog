import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import test from "node:test";

import { repositoryRoot, runNode, temporaryProject, write } from "../test-utils/helpers.mjs";

const execFileAsync = promisify(execFile);

function text(value, format = 0) {
  return { type: "text", text: value, format };
}

function exportFixture(posts) {
  return {
    db: [{
      meta: { version: "5.0", exported_on: 1_700_000_000_000 },
      data: {
        posts,
        users: [{ id: "user-1", name: "Fixture Author" }],
        posts_authors: posts.map((post) => ({ post_id: post.id, author_id: "user-1" })),
        tags: [
          { id: "public", name: "Public Tag", visibility: "public" },
          { id: "internal", name: "#internal", visibility: "internal" },
        ],
        posts_tags: posts.flatMap((post) => [
          { post_id: post.id, tag_id: "public" },
          { post_id: post.id, tag_id: "internal" },
        ]),
        posts_meta: posts.map((post) => ({
          post_id: post.id,
          meta_title: `Meta ${post.title}`,
          meta_description: `Meta description ${post.title}`,
        })),
      },
    }],
  };
}

function post(overrides = {}) {
  return {
    id: "post-1",
    uuid: "uuid-1",
    type: "post",
    slug: "fixture",
    title: "Fixture",
    plaintext: "Fallback plaintext",
    status: "published",
    featured: 1,
    published_at: "2024-01-02T00:00:00.000Z",
    updated_at: "2024-01-03T00:00:00.000Z",
    lexical: JSON.stringify({ root: { children: [{ type: "paragraph", children: [text("Body")] }] } }),
    ...overrides,
  };
}

function runImport(root, fixture, args = []) {
  const source = write(root, "export.json", `${JSON.stringify(fixture)}\n`);
  return runNode("scripts/import-ghost.mjs", [source, ...args], root);
}

test("import-ghost converts metadata and every supported Lexical block", () => {
  const root = temporaryProject("ghost-import");
  const lexical = {
    root: {
      children: [
        { type: "extended-heading", tag: "h3", children: [text("Heading")] },
        {
          type: "paragraph",
          children: [
            text(" bold ", 1),
            text("italic", 2),
            text(" strike", 4),
            text(" underline", 8),
            text(" a`b ", 16),
            { type: "link", url: "__GHOST_URL__/a path", title: "Link title", children: [text("link")] },
            { type: "link", url: "GHOST_URL/new-recruit-er-239b48359021/", children: [text("legacy")] },
            { type: "inline-mystery" },
          ],
        },
        { type: "extended-quote", children: [text("one"), { type: "linebreak" }, text("two")] },
        {
          type: "list",
          listType: "number",
          start: 3,
          children: [{ children: [text("Parent"), { type: "paragraph", children: [text("Block child")] }, { type: "list", tag: "ul", children: [{ children: [text("Child")] }] }] }],
        },
        { type: "codeblock", language: "JS<script>", code: "const x = `ok`;\n", caption: "Code caption" },
        { type: "image", src: "https://example.test/a b.png", alt: "A [picture]", title: "Title", caption: "Image caption" },
        { type: "markdown", markdown: "*raw markdown*" },
        { type: "html", html: "<aside>raw html</aside>" },
        { type: "linebreak" },
        { type: "mystery", children: [{ type: "paragraph", children: [text("Recovered child")] }] },
      ],
    },
  };
  const fixturePost = post({ lexical: JSON.stringify(lexical), canonical_url: "https://canonical.test/post" });
  const result = runImport(root, exportFixture([fixturePost]));

  assert.equal(result.status, 0, result.stderr);
  const source = readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8");
  assert.match(source, /author: "Fixture Author"/);
  assert.match(source, /tags:\n  - "Public Tag"/);
  assert.match(source, /canonicalUrl: "https:\/\/canonical\.test\/post"/);
  assert.match(source, /metaTitle: "Meta Fixture"/);
  assert.match(source, /### Heading/);
  assert.match(source, / \*\*bold\*\* _italic_ ~~strike~~ <u>underline<\/u> ``a`b``/);
  assert.match(source, /\[link\]\(\/a%20path\/ "Link title"\)/);
  assert.match(source, /\[legacy\]\(\/new-recruit-er\/\)/);
  assert.match(source, /> one  \n> two/);
  assert.match(source, /3\. Parent Block child\n  - Child/);
  assert.match(source, /```jsscript\nconst x = `ok`;\n```/);
  assert.ok(source.includes('![A \\[picture\\]](https://example.test/a b.png "Title")'));
  assert.match(source, /<small class="image-caption">Image caption<\/small>/);
  assert.match(source, /\*raw markdown\*[\s\S]*<aside>raw html<\/aside>/);
  assert.match(source, /Recovered child/);

  const report = JSON.parse(readFileSync(path.join(root, "migration-report.json"), "utf8"));
  assert.equal(report.posts, 1);
  assert.deepEqual(report.excludedInternalTags, ["#internal"]);
  assert.deepEqual(report.unknownNodeTypes, { "inline-mystery": 1, mystery: 1 });
  assert.match(result.stderr, /unknown Lexical nodes/);
});

test("import-ghost creates pages, falls back metadata, skips files, and honors force", () => {
  const root = temporaryProject("ghost-force");
  const fixture = exportFixture([
    post({ id: "page-1", uuid: "page-uuid", type: "page", slug: "about", title: "About", status: "draft", custom_excerpt: "Custom excerpt" }),
  ]);
  fixture.db[0].data.posts_meta = [];
  fixture.db[0].data.posts_tags = [];

  let result = runImport(root, fixture);
  assert.equal(result.status, 0, result.stderr);
  const target = path.join(root, "src/content/pages/about.md");
  assert.match(readFileSync(target, "utf8"), /description: "Custom excerpt"/);
  assert.match(readFileSync(target, "utf8"), /draft: true/);
  assert.match(readFileSync(target, "utf8"), /tags: \[\]/);

  writeFileSync(target, "Hand edited\n");
  result = runImport(root, fixture);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, "utf8"), "Hand edited\n");
  assert.equal(JSON.parse(readFileSync(path.join(root, "migration-report.json"))).skippedExisting.length, 1);

  result = runImport(root, fixture, ["--force"]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(readFileSync(target, "utf8"), /title: "About"/);
});

test("import-ghost shortens long plaintext at a word boundary", () => {
  const root = temporaryProject("ghost-excerpt");
  const longText = `${"word ".repeat(45)}ending`;
  const fixture = exportFixture([post({ plaintext: longText })]);
  fixture.db[0].data.posts_meta = [];
  const result = runImport(root, fixture);
  assert.equal(result.status, 0, result.stderr);
  const source = readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8");
  const description = source.match(/^description: "(.*)"$/m)?.[1];
  assert.ok(description.endsWith("…"));
  assert.ok(description.length <= 191);
});

test("import-ghost validates exports and Lexical JSON", () => {
  let root = temporaryProject("ghost-invalid");
  let result = runImport(root, {});
  assert.equal(result.status, 1);
  assert.match(result.stderr, /supported Ghost export/);

  root = temporaryProject("ghost-invalid-lexical");
  result = runImport(root, exportFixture([post({ lexical: "{" })]));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Could not parse Lexical content for fixture/);

  result = runNode("scripts/import-ghost.mjs", [], root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

test("import-ghost mirrors available images and reports failed downloads", async () => {
  const good = "https://images.test/good%20image.png";
  const bad = "https://images.test/missing.png";
  const lexical = { root: { children: [
    { type: "image", src: good, alt: "Good" },
    { type: "image", src: bad, alt: "Bad" },
  ] } };
  const root = temporaryProject("ghost-images");
  const source = write(root, "export.json", JSON.stringify(exportFixture([post({ lexical: JSON.stringify(lexical) })])));
  const fetchMock = write(root, "fetch-mock.mjs", `
globalThis.fetch = async (url) =>
  String(url).includes("good%20image.png")
    ? new Response("image bytes", { status: 200 })
    : new Response("missing", { status: 404 });
`);

  const result = await execFileAsync(
    process.execPath,
    [path.join(repositoryRoot, "scripts/import-ghost.mjs"), source, "--download-images"],
    {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, NODE_OPTIONS: `--import=${fetchMock}` },
    },
  );

  const markdown = readFileSync(path.join(root, "src/content/posts/fixture.md"), "utf8");
  assert.match(markdown, /\/images\/migrated\/good-20image\.png/);
  assert.match(markdown, new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal(readFileSync(path.join(root, "public/images/migrated/good-20image.png"), "utf8"), "image bytes");
  const report = JSON.parse(readFileSync(path.join(root, "migration-report.json")));
  assert.deepEqual(report.failedImages, [{ source: bad, status: 404 }]);
  assert.match(result.stdout, /Mirrored 1 images/);

  const second = await execFileAsync(
    process.execPath,
    [path.join(repositoryRoot, "scripts/import-ghost.mjs"), source, "--download-images"],
    {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, NODE_OPTIONS: `--import=${fetchMock}` },
    },
  );
  assert.match(second.stdout, /Mirrored 1 images/);
});
