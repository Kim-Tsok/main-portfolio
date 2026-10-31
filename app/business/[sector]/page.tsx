import type {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {businessPages,isBusinessPage} from '@/lib/business-pages';
import {site} from '@/lib/site';
import {jsonLd} from '@/lib/schema';
import styles from './sector.module.css';

export const dynamicParams=false;

type Props={params:Promise<{sector:string}>};
export function generateStaticParams(){return Object.keys(businessPages).map(sector=>({sector}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {sector}=await params;if(!isBusinessPage(sector))return {title:'Page not found',robots:{index:false}};
 const page=businessPages[sector];return {title:page.title,description:page.description,alternates:{canonical:`/business/${sector}`},openGraph:{title:page.title,description:page.description,url:`/business/${sector}`,type:'website'}};
}
export default async function SectorPage({params}:Props){
 const {sector}=await params;if(!isBusinessPage(sector))notFound();const page=businessPages[sector];
 const contact=`mailto:${site.email}?subject=${encodeURIComponent(page.title)}`;
 return <div className={`${styles.site} ${styles[sector]}`}>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className={styles.nav}><Link href="/business">Kim Tsok / For businesses</Link><nav aria-label="Page navigation"><a href="#demo">View demo</a><a className={styles.button} href={contact}>Get a quote</a></nav></header>
  <main id="main">
   <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({'@context':'https://schema.org','@type':'Service',name:page.title,description:page.description,url:`${site.url}/business/${sector}`,provider:{'@type':'Person',name:site.name,url:site.url}})}/>
   <section className={styles.hero}><div><p className={styles.context}>{page.title}</p><h1>{page.headline}</h1><p className={styles.lead}>{page.description}</p><div className={styles.actions}><a href="#demo" className={styles.button}>See the demo</a><a href={contact}>Get a quote</a></div></div><div className={styles.heroPhoto}><Image src={page.image} alt={page.alt} fill sizes="(min-width:800px) 55vw, 100vw" priority/></div></section>
   <section className={styles.section} aria-labelledby="included-heading"><h2 id="included-heading">Built around how your business works.</h2><div className={styles.features}>{page.features.map(feature=><article key={feature.title}><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div></section>
   <section className={styles.section} aria-labelledby="package-heading"><h2 id="package-heading">A focused website package.</h2><p className={styles.packageIntro}>A clear starting scope, shaped around your business. I’ll confirm the pages, features and price with you before work starts.</p><ul className={styles.packageList}><li>Home, service and coverage pages</li><li>{sector==='cleaning'?'A quote request form for your cleaning services':'An estimate request form and a project gallery'}</li><li>Your photos, business details and genuine customer reviews</li><li>A mobile layout, basic search metadata and domain setup</li></ul><p>Content editing, integrations and ongoing updates can be scoped separately.</p><a href={contact} className={styles.button}>Get a quote</a></section>
   <section id="demo" className={`${styles.section} ${styles.demoSection}`} aria-labelledby="demo-heading"><div><h2 id="demo-heading">Try a sample website.</h2><p>{page.demoName} is a fictional business. Open the demo, explore its services and try the enquiry form.</p><Link href={`/business/${sector}/demo`} className={styles.button}>Open {page.demoName}</Link></div><Link href={`/business/${sector}/demo`} className={styles.preview} aria-label={`Open the ${page.demoName} demo`}><span>{page.demoName}<span aria-hidden="true">↗</span></span><div className={styles.previewPhoto}><Image src={page.image} alt="" fill sizes="(min-width:800px) 50vw, 90vw"/></div><strong>{page.demoHeadline}</strong></Link></section>
   <section className={styles.section} aria-labelledby="process-heading"><h2 id="process-heading">From a conversation to a working site.</h2><ol className={styles.process}><li><h3>Agree the scope</h3><p>We work through your services, customers and enquiry process, then agree the pages and features.</p></li><li><h3>Build with your content</h3><p>Your business name, photographs and service details shape the site. You review it on a phone and desktop.</p></li><li><h3>Launch and hand over</h3><p>We connect the domain, check the enquiry flow and walk through how to manage your content.</p></li></ol></section>
   <section className={styles.section} aria-labelledby="questions-heading"><h2 id="questions-heading">A few practical questions.</h2><div className={styles.faq}>{page.faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>
   <section className={styles.contact}><h2>Tell me about your business.</h2><p>A new site, an existing one that needs work, or a specific enquiry problem. We can start there.</p><a href={contact} className={styles.button}>{site.email}</a></section>
  </main>
  <footer className={styles.footer}><Link href="/business">All business types</Link><Link href="/projects">My projects</Link><span>© {new Date().getFullYear()} {site.fullName}</span></footer>
 </div>;
}
