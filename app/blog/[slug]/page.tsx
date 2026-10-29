import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import ArticleBody from "@/components/article-body";
import { posts, getPost, readingMinutes, postDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/schema";

type Props = {params:Promise<{slug:string}>};
export function generateStaticParams() { return posts.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const post=getPost((await params).slug); if(!post) return {title:"Article not found",robots:{index:false}};
  return {title:post.title,description:post.excerpt,alternates:{canonical:`/blog/${post.slug}`},openGraph:{type:"article",url:`/blog/${post.slug}`,title:post.title,description:post.excerpt,publishedTime:`${post.publishedAt}T12:00:00+01:00`,authors:[site.fullName]},twitter:{card:"summary_large_image",title:post.title,description:post.excerpt}};
}
export default async function PostPage({params}:Props) {
  const post=getPost((await params).slug); if(!post) notFound();
  const next=posts.find(p=>p.slug!==post.slug);
  return <div className="portfolio-shell"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="container-page blog-article"><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({"@context":"https://schema.org","@graph":[{"@type":"BlogPosting",headline:post.title,description:post.excerpt,datePublished:`${post.publishedAt}T12:00:00+01:00`,author:{"@type":"Person",name:site.fullName,url:site.url},mainEntityOfPage:`${site.url}/blog/${post.slug}`,isPartOf:{"@type":"Blog",name:"Kim Tsok's blog",url:`${site.url}/blog`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Blog",item:`${site.url}/blog`},{"@type":"ListItem",position:2,name:post.title,item:`${site.url}/blog/${post.slug}`}]}]})}/><article><header className="article-header"><Link href="/blog" className="breadcrumb"><ArrowLeft size={14}/>All articles</Link><div className="article-heading"><p className="note-label">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta"><span>By {site.name}</span><time dateTime={post.publishedAt}>{postDate(post.publishedAt)}</time><span>{readingMinutes(post.body)} min read</span></div></div></header><div className="article-body"><ArticleBody text={post.body}/><div className="post-signoff"><span aria-hidden="true">♥</span><p>Thanks for reading.</p><Link href="/#work" className="text-link">Explore the projects<ArrowUpRight size={14}/></Link></div>{next&&<nav className="next-project" aria-label="More articles"><div><p>Another note</p><Link href={`/blog/${next.slug}`}>{next.title}<ArrowUpRight size={18}/></Link></div></nav>}</div></article></main></div>;
}
