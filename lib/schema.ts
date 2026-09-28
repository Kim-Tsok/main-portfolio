import type { Project } from "./data";
import { projectTags } from "./data";
import { site } from "./site";

export const projectUrl = (p: Project) => `${site.url}/projects/${p.slug}`;

const author = { "@type": "Person", name: site.name, url: site.url };

// Structured data for one project. `url` is the product itself so search
// engines tie the portfolio page to the live site; `mainEntityOfPage` is ours.
export function projectSchema(p: Project) {
  const tags = projectTags(p);
  const sameAs = [p.github_url, ...(p.custom_links ?? []).map((l) => l.url)].filter(
    Boolean
  );

  return {
    "@type": "CreativeWork",
    "@id": `${projectUrl(p)}#project`,
    name: p.title,
    description: p.description,
    url: p.link ?? projectUrl(p),
    mainEntityOfPage: projectUrl(p),
    ...(p.image_url && { image: p.image_url }),
    ...(tags.length > 0 && { keywords: tags.join(", ") }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(p.github_url && { codeRepository: p.github_url }),
    dateCreated: p.created_at,
    ...(p.updated_at && { dateModified: p.updated_at }),
    author,
    creator: author,
  };
}

export const jsonLd = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
