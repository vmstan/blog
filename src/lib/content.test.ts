import assert from "node:assert/strict";
import test from "node:test";

import {
  formatDate,
  publishedPosts,
  readingTime,
  type Post,
} from "./content.ts";

function post(
  options: { draft?: boolean; publishedAt?: string } = {},
): Post {
  const { draft = false, publishedAt = "2026-01-01" } = options;

  return {
    data: {
      draft,
      publishedAt: new Date(`${publishedAt}T00:00:00Z`),
    },
  } as unknown as Post;
}

test("publishedPosts drops drafts and sorts newest first", () => {
  const oldest = post({ publishedAt: "2024-01-01" });
  const newest = post({ publishedAt: "2026-01-01" });
  const middle = post({ publishedAt: "2025-01-01" });
  const draft = post({ draft: true, publishedAt: "2027-01-01" });

  assert.deepEqual(
    publishedPosts([oldest, draft, newest, middle]),
    [newest, middle, oldest],
  );
});

test("publishedPosts handles empty and all-draft lists", () => {
  assert.deepEqual(publishedPosts([]), []);
  assert.deepEqual(publishedPosts([post({ draft: true })]), []);
});

test("formatDate renders a UTC date in US style", () => {
  assert.equal(formatDate(new Date("2026-01-15T00:00:00Z")), "Jan 15, 2026");
});

test("formatDate is stable across time zones for the same instant", () => {
  assert.equal(
    formatDate(new Date("2026-01-15T05:00:00+05:00")),
    formatDate(new Date("2026-01-15T00:00:00Z")),
  );
});

test("readingTime floors at one minute", () => {
  assert.equal(readingTime(""), 1);
  assert.equal(readingTime("   "), 1);
  assert.equal(readingTime("hello"), 1);
});

test("readingTime counts words at 220 per minute", () => {
  const words = (count: number) =>
    Array.from({ length: count }, () => "word").join(" ");

  assert.equal(readingTime(words(220)), 1);
  assert.equal(readingTime(words(221)), 2);
  assert.equal(readingTime(words(440)), 2);
  assert.equal(readingTime(words(441)), 3);
});

test("readingTime splits on any whitespace", () => {
  assert.equal(readingTime("one\ntwo\tthree"), 1);
});
