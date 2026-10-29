import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import { PostList } from "@/components/blog";
import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/schema";
export const metadata: Metadata = {title:"Blog",description:"Notes by Kim Tsok on building web products, interface design, and the ideas behind his projects.",alternates:{canonical:"/blog"},openGraph:{title:"Kim Tsok — Blog",description:"Product notes, design decisions, and things in progress.",url:"/blog",type:"website"}};
export default async function BlogPage() {
 const posts=await getPosts();
  return <div className="portfolio-shell"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="container-page blog-archive"><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({"@context":"https://schema.org","@type":"Blog",name:"Kim Tsok's blog",url:`${site.url}/blog`,author:{"@type":"Person",name:site.fullName,url:site.url},blogPost:posts.map(p=>({"@type":"BlogPosting",headline:p.title,url:`${site.url}/blog/${p.slug}`,datePublished:p.publishedAt,description:p.excerpt}))})}/><Link href="/" className="breadcrumb"><ArrowLeft size={14}/>Back home</Link><div className="blog-archive-heading"><h1>Blog<span>.</span></h1></div><PostList entries={posts}/>{!posts.length&&<p className="inline-notice">No articles published yet.</p>}<footer className="blog-footnote"><span>More personal writing lives on <a href="https://substack.com/@kimtsok" target="_blank" rel="noopener noreferrer">Substack<ArrowUpRight size={13}/></a>.</span><Link href="/#contact">Get in touch<ArrowUpRight size={13}/></Link></footer></main></div>;
}
