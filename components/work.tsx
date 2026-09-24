"use client";

import { useMemo, useState } from "react";
import Image, { type ImageLoader } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { isClientProject as isClient, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

// Screenshots live on Cloudinary, so let it resize and pick the format.
const cloudinary: ImageLoader = ({ src, width, quality }) =>
  src.replace("/upload/", `/upload/f_auto,q_${quality ?? "auto"},w_${width}/`);

type Filter = "all" | "client" | "personal";

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

export default function Work({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const clientCount = useMemo(() => projects.filter(isClient).length, [projects]);
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    { id: "client", label: "Client work", count: clientCount },
    { id: "personal", label: "Personal", count: projects.length - clientCount },
  ];

  const visible = projects.filter((p) =>
    filter === "all" ? true : filter === "client" ? isClient(p) : !isClient(p)
  );

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Things I&apos;ve{" "}
              <span className="font-serif font-normal italic tracking-normal">
                built
              </span>
            </>
          }
        >
          Client sites, tools, games and the odd experiment.
        </SectionHeading>

        {projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-tan/50 p-12 text-center text-brown">
            New projects are on the way. Check back soon.
          </p>
        ) : (
          <>
            <div
              role="tablist"
              aria-label="Filter projects"
              className="mb-10 flex flex-wrap gap-2"
            >
              {filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                    filter === f.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink/80 hover:border-tan hover:text-ink"
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "tabular-nums text-xs",
                      filter === f.id ? "text-paper/60" : "text-brown/60"
                    )}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <motion.ul layout className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project) => (
                  <motion.li
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectCard project={project} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primary = project.link ?? project.github_url ?? project.custom_links?.[0]?.url;
  const client = isClient(project);
  const tags = project.tech_stack
    .filter((t) => t.toLowerCase() !== "client")
    .map((t) => tagNames[t.toLowerCase()] ?? t);

  const links = [
    project.link && { label: "Live site", href: project.link, icon: ArrowUpRight },
    project.github_url && { label: "Source", href: project.github_url, icon: Github },
    ...(project.custom_links ?? []).map((l) => ({
      label: l.label,
      href: l.url,
      icon: ArrowUpRight,
    })),
  ].filter(Boolean) as { label: string; href: string; icon: typeof ArrowUpRight }[];

  return (
    <article className="group">
      <a
        href={primary}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        tabIndex={-1}
        className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper-deep"
      >
        {project.image_url ? (
          <Image
            src={project.image_url}
            loader={project.image_url.includes("res.cloudinary.com") ? cloudinary : undefined}
            alt=""
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <span className="grid h-full place-items-center font-serif text-4xl italic text-tan">
            {project.title}
          </span>
        )}
        <span className="absolute right-4 top-4 grid size-11 translate-y-1 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </a>

      <div className="mt-6">
        {client && (
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-tan">
            Client project
          </p>
        )}
        <h3 className="text-2xl font-semibold text-ink">{project.title}</h3>
      </div>

      <p className="mt-3 line-clamp-3 leading-relaxed text-brown">
        {project.description}
      </p>

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-paper/60 px-2.5 py-1 text-xs text-brown"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-tan/50 underline-offset-4 transition-colors hover:decoration-ink"
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
