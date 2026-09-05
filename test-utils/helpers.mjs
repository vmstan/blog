import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export function temporaryProject(prefix) {
  const root = mkdtempSync(path.join(tmpdir(), `${prefix}-`));
  mkdirSync(path.join(root, "src/content/posts"), { recursive: true });
  mkdirSync(path.join(root, "src/content/pages"), { recursive: true });
  return root;
}

export function write(root, relativePath, source) {
  const target = path.join(root, relativePath);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, source);
  return target;
}

export function runNode(script, args, cwd) {
  return spawnSync(process.execPath, [path.join(repositoryRoot, script), ...args], {
    cwd,
    encoding: "utf8",
  });
}

export function git(root, ...args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

export function initializeGit(root) {
  git(root, "init", "-q");
  git(root, "config", "user.name", "Test User");
  git(root, "config", "user.email", "test@example.com");
}

export const validFrontmatter = (updatedAt = "2024-01-01") => `---
title: "Fixture"
slug: "fixture"
description: "Fixture"
publishedAt: "2024-01-01"
updatedAt: "${updatedAt}"
author: "Test User"
draft: false
featured: false
---

Body
`;
