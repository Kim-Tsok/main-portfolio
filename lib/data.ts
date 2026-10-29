import { createClient } from "@supabase/supabase-js";
import {publicFetch} from "./public-fetch";
import snapshot from "./project-snapshot.json";

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
  article?: string | null;
  summary?: string | null;
  published?: boolean;
  featured?: boolean;
  sort_order?: number;
}

export const slugify = (text: string) =>
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
  category?: string;
}

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { fetch: publicFetch } }
  );
}

export async function getProjects(): Promise<Project[]> {
    let rows: Record<string, unknown>[] = snapshot;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      rows = [];
      try {
        const { data, error } = await supabase().from("projects").select("*").eq("published",true).is("archived_at",null).order("created_at", { ascending: false });
        if (!error && data) rows = data;
        else console.error("Project data unavailable");
      } catch { console.error("Project data unavailable"); }
    }
    const seen = new Set<string>();
    return rows.filter(p => p.published !== false).map((row) => {
      const p = row as unknown as Project;
      let slug = p.slug || slugify(p.title) || p.id.slice(0, 8);
      if (seen.has(slug)) slug = `${slug}-${p.id.slice(0, 8)}`;
      seen.add(slug);
      return { ...p, slug };
    }).sort((a, b) => (a.sort_order ?? 100) - (b.sort_order ?? 100));
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getSkills(): Promise<Skill[]> {
    const { data, error } = await supabase().from("skills").select("id, name, category").is("archived_at",null);

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }
    return data;
}

export async function getServices(): Promise<Service[]> {
    const { data, error } = await supabase()
      .from("services")
      .select("id, title, description").is("archived_at",null)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }
    return data;
}
