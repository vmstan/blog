import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { repositoryRoot } from "../test-utils/helpers.mjs";

const build = spawnSync("pnpm", ["build"], {
  cwd: repositoryRoot,
  encoding: "utf8",
  timeout: 60_000,
});

test("production site builds successfully", () => {
  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
  assert.match(build.stdout, /page\(s\) built/);
  assert.match(build.stdout, /Indexed 68 pages/);
});

const output = (...segments) =>
  readFileSync(path.join(repositoryRoot, "dist", ...segments), "utf8");

test("home, archive, and posts render expected publishing behavior", () => {
  assert.equal(build.status, 0, build.stderr);
  const home = output("index.html");
  const archive = output("archive", "index.html");
  const newest = output("cashflow-positive", "index.html");

  assert.match(home, /<body class="home-template">/);
  assert.match(home, /Browse all 68 posts/);
  assert.equal((home.match(/class="post-card"/g) ?? []).length, 7);
  assert.match(archive, /All 68 articles/);
  assert.match(archive, /<h2>2026<\/h2>/);
  assert.match(newest, /<meta property="og:type" content="article">/);
  assert.match(newest, /<link rel="canonical" href="https:\/\/vmstan\.com\/cashflow-positive\/">/);
  assert.match(newest, /data-pagefind-body/);
  assert.match(newest, /aria-label="Adjacent posts"/);
  assert.doesNotMatch(newest, />Newer<\/span>/);
  assert.match(newest, />Older<\/span>/);

  const jsonLd = newest.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  assert.ok(jsonLd);
  const structured = JSON.parse(jsonLd);
  assert.equal(structured["@type"], "BlogPosting");
  assert.equal(structured.mainEntityOfPage, "https://vmstan.com/cashflow-positive/");
});

test("special pages, metadata, RSS, sitemap, and search assets are emitted", () => {
  assert.equal(build.status, 0, build.stderr);
  const missing = output("404.html");
  const whois = output("whois", "index.html");
  const now = output("now", "index.html");
  const rss = output("rss.xml");

  assert.match(missing, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(missing, /rel="canonical"/);
  assert.match(whois, /data-whois-age data-birth-date="1983-11-09"/);
  assert.match(whois, /src="\/js\/whois-age\.js"/);
  assert.match(whois, /aria-disabled="true" tabindex="-1"/);
  assert.match(whois, /<summary class="whois-cert-set-title">\s*Active/);
  assert.match(whois, /<summary class="whois-cert-set-title">\s*Expired/);
  assert.match(now, /class="now-overview"/);
  assert.match(now, /Last refreshed <time datetime=/);
  assert.ok(rss.indexOf("Cashflow Positive") < rss.indexOf("Format Change"));
  assert.match(rss, /<link>https:\/\/vmstan\.com\/cashflow-positive\/<\/link>/);
  assert.ok(existsSync(path.join(repositoryRoot, "dist/sitemap-index.xml")));
  assert.ok(existsSync(path.join(repositoryRoot, "dist/pagefind/pagefind.js")));
  assert.ok(existsSync(path.join(repositoryRoot, "dist/pagefind/pagefind-entry.json")));
});

test("every root-relative page link resolves in the static output", () => {
  assert.equal(build.status, 0, build.stderr);
  const htmlFiles = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(target);
      else if (entry.name.endsWith(".html")) htmlFiles.push(target);
    }
  };
  visit(path.join(repositoryRoot, "dist"));

  const missing = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      const pathname = href.split(/[?#]/, 1)[0];
      const target = pathname.endsWith("/")
        ? path.join(repositoryRoot, "dist", pathname, "index.html")
        : path.join(repositoryRoot, "dist", pathname);
      if (!existsSync(target)) missing.push(`${path.relative(repositoryRoot, file)} -> ${href}`);
    }
  }
  assert.deepEqual(missing, []);
});
