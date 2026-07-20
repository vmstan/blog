import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config";
import { publishedPosts } from "../lib/content";

export async function GET(context: { site: URL }) {
  const posts = publishedPosts(await getCollection("posts"));
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/${post.data.slug}/`,
    })),
  });
}
