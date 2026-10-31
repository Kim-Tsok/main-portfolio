import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import ArticleBody from "@/components/article-body";
import ProjectImage from "@/components/project-image";
import { getProject, getProjects, projectLinks, projectTags } from "@/lib/data";
import { projectStory } from "@/lib/project-stories";
import { jsonLd, projectSchema, projectUrl } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getProjects()).map(p => ({ slug:p.slug })); }
export async function generateMetadata({ params }:Props):Promise<Metadata> {
 const project=await getProject((await params).slug); if(!project) return {};
 const story=projectStory(project); const images=[{url:`/projects/${project.slug}/opengraph-image`,width:1200,height:630,alt:story.title}];
 return { title:story.title,description:story.summary,alternates:{canonical:`/projects/${project.slug}`},openGraph:{type:"article",url:projectUrl(project),title:story.title,description:story.summary,images},twitter:{card:"summary_large_image",title:story.title,description:story.summary,images} };
}
export default async function ProjectPage({params}:Props) {
 const slug=(await params).slug; const projects=await getProjects(); const index=projects.findIndex(p=>p.slug===slug); if(index===-1) notFound();
 const project=projects[index], story=projectStory(project), next=projects[(index+1)%projects.length];
 const minutes=Math.max(1,Math.ceil(story.article.split(/\s+/).length/200));
 return <div className="portfolio-shell"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="container-page"><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({"@context":"https://schema.org","@graph":[projectSchema(project),{"@type":"Article",headline:story.title,description:story.summary,author:{"@type":"Person",name:site.fullName,url:site.url},mainEntityOfPage:projectUrl(project),datePublished:project.created_at,dateModified:project.updated_at||project.created_at,...(project.image_url?{image:project.image_url}:{})},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Projects",item:`${site.url}/projects`},{"@type":"ListItem",position:2,name:story.title,item:projectUrl(project)}]}]})}/><article><header className="article-header"><Link className="breadcrumb" href="/projects"><ArrowLeft size={14}/>All projects</Link><div className="article-heading"><h1>{story.title}</h1><p className="article-deck">{story.summary}</p><div className="article-meta"><span>By Kim Tsok</span><span>{minutes} min read</span><span>{projectTags(project).slice(0,3).join(" / ")}</span></div></div></header>{project.image_url&&<div className="article-image"><ProjectImage src={project.image_url} alt={`${story.title} screenshot`} sizes="(min-width:1100px) 1056px, 95vw" priority className="object-cover object-top"/></div>}<div className="article-body"><ArticleBody text={story.article}/><div className="article-links">{projectLinks(project).map(link=><a className={link.kind==="live"?"primary-button":"small-button"} key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={15}/></a>)}</div><p className="article-tech">Built with {projectTags(project).join(", ")}.</p>{next&&next.id!==project.id&&<nav className="next-project" aria-label="More work"><div><Link href={`/projects/${next.slug}`}>{projectStory(next).title}<ArrowUpRight size={19}/></Link></div><Link href="/projects" className="text-link">All projects</Link></nav>}</div></article></main></div>;
}
