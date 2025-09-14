import type { MetadataRoute } from "next";
import { listPosts } from "./lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts();
  return [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
  ];
}
