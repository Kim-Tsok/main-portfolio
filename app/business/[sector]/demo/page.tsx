import type {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {businessPages,isBusinessPage} from '@/lib/business-pages';
import DemoEnquiry from '@/components/business/demo-enquiry';
import styles from '../sector.module.css';
import demo from './demo.module.css';

export const dynamicParams=false;

type Props={params:Promise<{sector:string}>};
export function generateStaticParams(){return Object.keys(businessPages).map(sector=>({sector}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {sector}=await params;if(!isBusinessPage(sector))return {title:'Demo not found',robots:{index:false}};
 return {title:`${businessPages[sector].demoName} — website demo`,description:'A fictional business website showing a sample service and enquiry experience.',robots:{index:false,follow:true},alternates:{canonical:`/business/${sector}/demo`}};
}
export default async function BusinessDemo({params}:Props){
 const {sector}=await params;if(!isBusinessPage(sector))notFound();const page=businessPages[sector],landscape=sector==='landscaping';
 return <div className={`${styles.site} ${styles[sector]} ${demo.demo}`}>
  <a href="#main" className="skip-link">Skip to content</a>
  <div className={demo.banner}><span>Fictional business demo</span><Link href={`/business/${sector}`}>About this website</Link></div>
  <header className={styles.nav}><a href="#main" className={demo.wordmark}>{page.demoName}</a><nav aria-label="Demo navigation"><a href="#services">{landscape?'Our services':'Services'}</a><a href="#enquiry" className={styles.button}>{landscape?'Request an estimate':'Request a clean'}</a></nav></header>
  <main id="main">
   <section className={`${styles.hero} ${demo.hero}`}><div><h1>{page.demoHeadline}</h1><p className={styles.lead}>{page.demoIntro}</p><div className={styles.actions}><a className={styles.button} href="#enquiry">{landscape?'Tell us about your yard':'Tell us about your space'}</a><a href="#services">{landscape?'Explore our services':'See our services'}</a></div></div><div className={styles.heroPhoto}><Image src={page.image} alt={page.alt} fill priority sizes="(min-width:800px) 55vw, 100vw"/></div></section>
   <section id="services" className={styles.section} aria-labelledby="services-heading"><h2 id="services-heading">{landscape?'Practical care, season after season.':'A little help with the housework.'}</h2><div className={styles.features}>{page.services.map(service=><article key={service.title}><h3>{service.title}</h3><p>{service.body}</p></article>)}</div></section>
   {landscape&&<section className={styles.section} aria-labelledby="gallery-heading"><h2 id="gallery-heading">A place to show the work.</h2><p className={demo.galleryNote}>Illustrative stock photos for this demo. Your site would use your own completed projects.</p><div className={demo.gallery}><figure><div><Image src={page.image} alt={page.alt} fill sizes="(min-width:760px) 45vw, 90vw"/></div><figcaption>Lawn care</figcaption></figure><figure><div><Image src="/business/garden-tools.jpg" alt="A garden trowel and pruning scissors beside potting soil" fill sizes="(min-width:760px) 45vw, 90vw"/></div><figcaption>Planting and bed care</figcaption></figure></div></section>}
   <section className={`${styles.section} ${demo.note}`}><h2>{landscape?'Start with a walk around the yard.':'A simple way to get started.'}</h2><p>{landscape?'Tell us what needs attention. A conversation and, where needed, a visit to the property help define the work before an estimate is agreed.':'Tell us the kind of clean, the size of your home and a day that suits you. The team would confirm what is included, the price and a suitable time before a visit.'}</p></section>
   <section id="enquiry" className={`${styles.section} ${demo.enquiry}`} aria-labelledby="enquiry-heading"><div><h2 id="enquiry-heading">{landscape?'What does your yard need?':'What does your space need?'}</h2><p>{landscape?'Try a sample estimate request. Choose a service and yard size, then add a ZIP code and preferred date.':'Try the sample quote request. A few details help a cleaning business understand the job before replying.'}</p></div><DemoEnquiry sector={sector}/></section>
  </main>
  <footer className={styles.footer}><span>{page.demoName} is a fictional example by Kim Tsok.</span><Link href={`/business/${sector}`}>Get a website for your business</Link><a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Photography: Unsplash</a></footer>
 </div>;
}
