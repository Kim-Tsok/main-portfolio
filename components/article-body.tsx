import { Fragment } from "react";

// A deliberately small Markdown renderer. Text is always escaped by React;
// arbitrary HTML, embedded scripts and remote embeds are never interpreted.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part,i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2,-2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1,-1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
export default function ArticleBody({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g,"\n").split(/\n\s*\n/);
  return <div className="article-prose">{blocks.map((block,i) => {
    if (block.startsWith("### ")) return <h3 key={i}>{inline(block.slice(4))}</h3>;
    if (block.startsWith("## ") || block.startsWith("# ")) return <h2 key={i}>{inline(block.replace(/^#{1,2} /,""))}</h2>;
    if (block.startsWith("> ")) return <blockquote key={i}>{inline(block.replace(/^> /gm,""))}</blockquote>;
    if (block.startsWith("```")) return <pre key={i}><code>{block.replace(/^```[^\n]*\n?/,"").replace(/\n?```$/,"")}</code></pre>;
    if (block.split("\n").every(l => /^[-*] /.test(l))) return <ul key={i}>{block.split("\n").map((l,j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
    if (block.split("\n").every(l => /^\d+\. /.test(l))) return <ol key={i}>{block.split("\n").map((l,j) => <li key={j}>{inline(l.replace(/^\d+\. /,""))}</li>)}</ol>;
    return <p key={i}>{inline(block)}</p>;
  })}</div>;
}
