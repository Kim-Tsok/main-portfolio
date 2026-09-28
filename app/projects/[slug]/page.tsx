import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import ProjectImage from "@/components/project-image";
import {
  getProject,
  getProjects,
  isClientProject,
  projectLinks,
  projectTags,
} from "@/lib/data";
import { jsonLd, projectSchema, projectUrl } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};

  const title = project.title;
  const description =
    project.description.length > 160
      ? `${project.description.slice(0, 157).trimEnd()}…`
      : project.description;
  const images = project.image_url
    ? [{ url: project.image_url, alt: project.title }]
    : ["/og-image.png"];

  return {
    title,
    description,
    keywords: [project.title, ...projectTags(project), site.name],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      creator: "@im_telepathic",
      images: project.image_url ? [project.image_url] : ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const tags = projectTags(project);
  const links = projectLinks(project);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      projectSchema(project),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: `${site.url}/#work` },
          { "@type": "ListItem", position: 2, name: project.title, item: projectUrl(project) },
        ],
      },
    ],
  };

  return (
    <div className="grid-paper min-h-svh">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <header className="border-b border-line bg-paper/85 backdrop-blur-md">
        <nav className="container-page flex h-16 items-center justify-between md:h-18">
          <Link href="/" className="font-serif text-3xl font-medium italic text-ink">
            Kim<span className="text-tan">.</span>
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink/80 transition-colors hover:border-tan hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </nav>
      </header>

      <main className="container-page py-16 md:py-24">
        <article>
          {isClientProject(project) && (
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-tan">
              Client project
            </p>
          )}
          <h1 className="max-w-3xl text-balance text-4xl font-semibold text-ink md:text-6xl md:leading-[1.05]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-brown">
            {project.description}
          </p>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map(({ label, href, kind }, i) => {
                const Icon = kind === "source" ? Github : ArrowUpRight;
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className={
                      i === 0
                        ? "inline-flex items-center gap-1.5 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brown-deep"
                        : "inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-tan"
                    }
                  >
                    {label === "Live site" ? `Visit ${project.title}` : label}
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          )}

          {project.image_url && (
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper-deep md:mt-16">
              <ProjectImage
                src={project.image_url}
                alt={`Screenshot of ${project.title}`}
                sizes="(min-width: 1152px) 1088px, 100vw"
                priority
                className="object-cover object-top"
              />
            </div>
          )}

          {tags.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-ink">Built with</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-paper/60 px-3 py-1 text-sm text-brown"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {next && next.slug !== project.slug && (
          <nav className="mt-20 border-t border-line pt-10" aria-label="More projects">
            <p className="text-sm text-brown">Next project</p>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-2 inline-flex items-center gap-2 text-3xl font-semibold text-ink md:text-4xl"
            >
              {next.title}
              <ArrowUpRight className="size-6 text-tan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>
        )}
      </main>
    </div>
  );
}
