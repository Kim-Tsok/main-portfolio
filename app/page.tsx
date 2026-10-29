import ScrollChoreography from "@/components/scroll-choreography";
import MotionProvider from "@/components/motion-provider";
import SymbolField from "@/components/symbol-field";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Work from "@/components/work";
import About from "@/components/about";
import Blog from "@/components/blog";
import Personal from "@/components/personal";
import Contact from "@/components/contact";
import { getProjects } from "@/lib/data";
import { jsonLd, projectSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export default async function Home() {
  const projects = await getProjects();
  return <MotionProvider><div className="portfolio-shell"><ScrollChoreography/><SymbolField/><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ "@context": "https://schema.org", "@type": "ItemList", name: `Projects by ${site.name}`, itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: projectSchema(p) })) })} /><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" className="container-page"><Hero /><Work projects={projects} /><About skills={[]} /><Blog /><Personal /><Contact /></main></div></MotionProvider>;
}
