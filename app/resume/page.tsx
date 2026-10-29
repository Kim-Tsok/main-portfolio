import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import { site } from "@/lib/site";
import { getProjects, projectTags } from "@/lib/data";
import { projectStory } from "@/lib/project-stories";
import PrintButton from "./print-button";
export const metadata:Metadata={title:"Résumé",description:"Kim Kelvin Tsok — product engineer based in Nigeria. Selected projects, technical skills and contact information.",alternates:{canonical:"/resume"}};
export default async function Resume(){const projects=await getProjects();return <div className="portfolio-shell"><Header/><main className="container-page"><article className="resume-sheet"><h1>{site.fullName}</h1><p>Product engineer · Nigeria</p><p><a href={`mailto:${site.email}`}>{site.email}</a> / <a href="https://github.com/Kim-Tsok">GitHub</a></p><h2>Profile</h2><p>I build web products and client websites, working across interfaces, databases, authentication and APIs. My work includes a notes app, websites for businesses, developer tools and games.</p><h2>Selected work</h2>{projects.filter(p=>["ellipsis-a-calm-place-for-busy-minds","usiju-event-centre","scriblr-legacy"].includes(p.slug)).map(p=><div key={p.id} className="mb-5"><h3><Link href={`/projects/${p.slug}`}>{projectStory(p).title}</Link></h3><p>{projectStory(p).summary}</p><p>{projectTags(p).join(", ")}</p></div>)}<h2>Technical skills</h2><ul><li>React, Next.js, TypeScript, HTML, CSS and Tailwind CSS</li><li>Node.js, PostgreSQL, Supabase, authentication and API integrations</li><li>Git, Figma and Astro</li><li>Python, Unity and C# for game projects</li></ul><PrintButton/><Link className="text-link ml-4" href="/#contact">Get in touch</Link></article></main></div>}
