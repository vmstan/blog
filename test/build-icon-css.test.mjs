import assert from "node:assert/strict";
import { readFileSync, symlinkSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { repositoryRoot, runNode, temporaryProject, write } from "../test-utils/helpers.mjs";

function iconProject(source) {
  const root = temporaryProject("icon-css");
  for (const directory of ["src/components", "src/data", "src/layouts", "src/pages"]) {
    write(root, `${directory}/fixture.txt`, directory === "src/components" ? source : "");
  }
  symlinkSync(path.join(repositoryRoot, "node_modules"), path.join(root, "node_modules"), "dir");
  return root;
}

test("build-icon-css emits only used solid, brand, and utility rules", () => {
  const root = iconProject("fa-solid fa-certificate fa-brands fa-github fa-rotate-90");
  const result = runNode("scripts/build-icon-css.mjs", [], root);

  assert.equal(result.status, 0, result.stderr);
  const css = readFileSync(path.join(root, "src/styles/icons.css"), "utf8");
  assert.match(css, /\.fa-certificate\{--fa:/);
  assert.match(css, /\.fa-github\{--fa:/);
  assert.match(css, /\.fa-rotate-90\{transform:rotate\(90deg\)\}/);
  assert.doesNotMatch(css, /\.fa-linkedin\{--fa:/);
  assert.ok(readFileSync(path.join(root, "src/styles/fonts/fa-solid-900-subset.woff2")).length > 0);
  assert.ok(readFileSync(path.join(root, "src/styles/fonts/fa-brands-400-subset.woff2")).length > 0);
});

test("build-icon-css rejects unknown Font Awesome classes", () => {
  const root = iconProject("fa-solid fa-does-not-exist");
  const result = runNode("scripts/build-icon-css.mjs", [], root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown Font Awesome classes: fa-does-not-exist/);
});
