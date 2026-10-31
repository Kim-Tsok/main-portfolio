import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import Header from '@/components/header';
import Work from '@/components/work';
import {getProjects} from '@/lib/data';
import {jsonLd,projectSchema} from '@/lib/schema';
import {site} from '@/lib/site';

export const metadata:Metadata={
 title:'Projects',
 description:'Web products, client websites, developer tools and games built by Kim Tsok. Browse projects and read the stories behind them.',
 alternates:{canonical:'/projects'},
 openGraph:{title:'Projects — Kim Tsok',description:'Products, websites, tools and games. Explore the work and the decisions behind it.',url:'/projects',type:'website'},
};

export default async function ProjectsPage(){
 const projects=await getProjects();
 return <div className="portfolio-shell">
  <a href="#main" className="skip-link">Skip to content</a><Header/>
  <main id="main" className="container-page blog-archive projects-archive">
   <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({'@context':'https://schema.org','@type':'CollectionPage',name:'Projects by Kim Tsok',url:`${site.url}/projects`,mainEntity:{'@type':'ItemList',itemListElement:projects.map((project,index)=>({'@type':'ListItem',position:index+1,item:projectSchema(project)}))}})}/>
   <Link href="/#work" className="breadcrumb"><ArrowLeft size={14}/>Back home</Link>
   <div className="blog-archive-heading"><h1 id="projects-title">Projects<span>.</span></h1></div>
   <Work projects={projects} archive/>
   <footer className="blog-footnote"><Link href="/#contact">Get in touch</Link><Link href="/business">Are you a business?</Link></footer>
  </main>
 </div>;
}
