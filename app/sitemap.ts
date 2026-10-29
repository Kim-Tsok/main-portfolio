import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/lawyers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${site.url}/blog`, lastModified: new Date(`${posts[0].publishedAt}T12:00:00+01:00`), changeFrequency: "weekly", priority: 0.8 },
    ...posts.map(post => ({ url: `${site.url}/blog/${post.slug}`, lastModified: new Date(`${post.publishedAt}T12:00:00+01:00`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(p.image_url && { images: [p.image_url] }),
    })),
  ];
}
