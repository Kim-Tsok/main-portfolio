import SymbolField from "@/components/symbol-field";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Work from "@/components/work";
import About from "@/components/about";
import Personal from "@/components/personal";
import Contact from "@/components/contact";
import { getProjects } from "@/lib/data";
import { jsonLd, projectSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export default async function Home() {
  const projects = await getProjects();
  return <div className="portfolio-shell"><SymbolField/><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ "@context": "https://schema.org", "@type": "ItemList", name: `Projects by ${site.name}`, itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: projectSchema(p) })) })} /><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" className="container-page"><Hero /><Work projects={projects} /><About skills={[]} /><Personal /><Contact /></main></div>;
}
