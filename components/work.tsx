"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isClientProject, projectTags, type Project } from "@/lib/data";
import { projectStory } from "@/lib/project-stories";
import ScrollSurface from "./scroll-surface";
import ProjectImage from "./project-image";

export default function Work({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Highlights");
  const [expanded, setExpanded] = useState(false);
  const priority = ["ellipsis-a-calm-place-for-busy-minds", "usiju-event-centre", "scriblr-legacy", "genie"];
  const ordered = [...projects].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    const order=(a.sort_order ?? 100)-(b.sort_order ?? 100);
    if(order) return order;
    const rank = (p: Project) => priority.includes(p.slug) ? priority.indexOf(p.slug) : 100;
    return rank(a) - rank(b);
  });
  const filtered = filter === "Client work" ? ordered.filter(isClientProject) : filter === "Experiments" ? ordered.filter(p => !isClientProject(p) && !priority.slice(0, 3).includes(p.slug)) : ordered;
  const visible = expanded || filter !== "Highlights" ? filtered : filtered.slice(0, 4);
  return <section id="work" className="work-section section-space" aria-labelledby="work-title">
    <div className="section-top"><div><h2 id="work-title">Things I’ve built<span className="heading-suit" aria-hidden="true">♠</span></h2></div></div>
    <div className="project-filters" aria-label="Filter work">{["Highlights", "Client work", "Experiments"].map(label => <button key={label} type="button" aria-pressed={filter === label} onClick={() => { setFilter(label); setExpanded(false); }}>{label}</button>)}</div>
    <div className="project-grid">{visible.map((project, index) => {
      const story = projectStory(project);
      return <ScrollSurface as="article" key={project.id} index={index} className={`project-card project-tone-${index % 4}`}>
        <Link href={`/projects/${project.slug}`} className="project-cover" aria-label={`Read about ${story.title}`}>
          {project.image_url ? <ScrollSurface treatment="image" className="project-screenshot"><ProjectImage src={project.image_url} alt={`${story.title} interface`} sizes="(min-width: 1100px) 490px, (min-width: 700px) 45vw, 90vw" priority={index < 2} className="object-cover object-top" /></ScrollSurface> : <span className="cover-title">{story.title}</span>}
          <span className="project-open" aria-hidden="true"><ArrowUpRight size={20} /></span>
        </Link>
        <div className="project-details"><h3><Link href={`/projects/${project.slug}`}>{story.title}</Link></h3><p className="project-summary">{story.summary}</p><div className="project-bottom"><span>{projectTags(project).slice(0, 3).join(" / ")}</span><Link href={`/projects/${project.slug}`} aria-label={`Read the ${story.title} story`}><span className="story-label">Read story</span><ArrowUpRight size={16} /></Link></div></div>
      </ScrollSurface>;
    })}</div>
    {filter === "Highlights" && filtered.length > 4 && <button className="more-work" onClick={() => setExpanded(!expanded)}>{expanded ? "Show highlights" : `See all ${projects.length} projects`}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button>}
    {visible.length === 0 && <p className="inline-notice">There are no published projects in this category yet.</p>}
  </section>;
}
