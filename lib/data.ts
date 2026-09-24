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
}

export const isClientProject = (p: Project) =>
  p.tech_stack.some((t) => t.toLowerCase() === "client");

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
      .select("id, title, description, image_url, tech_stack, link, github_url, custom_links")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
    return data;
  },
  ["projects-cache"],
  { revalidate: 60, tags: ["projects"] }
);

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
