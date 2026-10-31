import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects,posts]=await Promise.all([getProjects(),getPosts()]);

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
    { url: `${site.url}/blog`, lastModified: posts.length ? new Date(`${posts[0].publishedAt}T12:00:00+01:00`) : undefined, changeFrequency: "weekly", priority: 0.8 },
    {url:`${site.url}/photography`,changeFrequency:"monthly",priority:0.6},
    {url:`${site.url}/business`,changeFrequency:"monthly",priority:0.8},
    {url:`${site.url}/simple`,changeFrequency:"monthly",priority:0.6},
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
