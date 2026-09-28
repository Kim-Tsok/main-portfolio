import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech_stack: string[];
  link: string | null;
  github_url: string | null;
  custom_links: { label: string; url: string }[] | null;
  created_at: string;
  updated_at: string | null;
  slug: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const isClientProject = (p: Project) =>
  p.tech_stack.some((t) => t.toLowerCase() === "client");

// Tags in the database are typed by hand, so tidy the common ones for display.
const tagNames: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  "tailwind css": "Tailwind CSS",
  "daisy ui": "daisyUI",
  "next.js": "Next.js",
  shadcn: "shadcn/ui",
};

export const projectTags = (p: Project) =>
  p.tech_stack
    .filter((t) => t.toLowerCase() !== "client")
    .map((t) => tagNames[t.toLowerCase()] ?? t);

export const projectLinks = (p: Project) =>
  [
    p.link && { label: "Live site", href: p.link, kind: "live" as const },
    p.github_url && { label: "Source", href: p.github_url, kind: "source" as const },
    ...(p.custom_links ?? []).map((l) => ({
      label: l.label,
      href: l.url,
      kind: "other" as const,
    })),
  ].filter(Boolean) as { label: string; href: string; kind: "live" | "source" | "other" }[];

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await supabase()
      .from("projects")
      .select(
        "id, title, description, image_url, tech_stack, link, github_url, custom_links, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    // Titles aren't unique in the table, so fall back to the id if two collide.
    const seen = new Set<string>();
    return data.map((p) => {
      let slug = slugify(p.title) || p.id.slice(0, 8);
      if (seen.has(slug)) slug = `${slug}-${p.id.slice(0, 8)}`;
      seen.add(slug);
      return { ...p, slug };
    });
  },
  ["projects-cache-v2"],
  { revalidate: 60, tags: ["projects"] }
);

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    const { data, error } = await supabase().from("skills").select("id, name");

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }
    return data;
  },
  ["skills-cache"],
  { revalidate: 60, tags: ["skills"] }
);

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const { data, error } = await supabase()
      .from("services")
      .select("id, title, description")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }
    return data;
  },
  ["services-cache"],
  { revalidate: 60, tags: ["services"] }
);
