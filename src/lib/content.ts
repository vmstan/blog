import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function publishedPosts(posts: Post[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort(
      (left, right) =>
        right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
    );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
