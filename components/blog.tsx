import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts, readingMinutes, postDate, type Post } from "@/lib/posts";

export function PostList({ entries = posts }: { entries?: Post[] }) {
  return <div className="post-list">{entries.map(post => <article className="post-row" key={post.slug}><div className="post-row-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{postDate(post.publishedAt)}</time></div><div className="post-row-copy"><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><span className="post-reading">{readingMinutes(post.body)} min read</span></div><Link className="post-row-open" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><ArrowUpRight size={22}/></Link></article>)}</div>;
}

export default function Blog() {
  return <section id="blog" className="blog-section section-space" aria-labelledby="blog-title"><div className="section-top"><div><h2 id="blog-title">The blog<span className="heading-suit" aria-hidden="true">♥</span></h2><p>Notes on the things I’m building, and the ideas behind them.</p></div><Link href="/blog" className="text-link">All articles<ArrowUpRight size={15}/></Link></div><PostList entries={posts.slice(0,3)}/></section>;
}
