import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import Header from '@/components/header';
import {getBusinessSectors} from '@/lib/content';
import {site} from '@/lib/site';

export const metadata:Metadata={
 title:'For businesses',
 description:'Websites and practical web tools for service businesses, with Kim Tsok. Explore websites for cleaning businesses and landscaping companies.',
 alternates:{canonical:'/business'},
 openGraph:{title:'For businesses — Kim Tsok',description:'Websites, enquiries and the work that happens after someone gets in touch.',url:'/business',type:'website'},
};

export default async function BusinessPage(){
 const sectors=(await getBusinessSectors()).filter(sector=>['/business/cleaning','/business/landscaping'].includes(sector.link||''));
 return <div className="portfolio-shell">
  <a href="#main" className="skip-link">Skip to content</a><Header/>
  <main id="main" className="container-page blog-archive business-archive">
   <Link href="/" className="breadcrumb"><ArrowLeft size={14}/>Back home</Link>
   <div className="blog-archive-heading business-heading"><h1>Websites for your business<span>.</span></h1><p>I’m Kim Tsok. I build websites for cleaning and lawn-care businesses, including companies serving the United States. Choose your industry to see the offer and try a demo.</p></div>
   <div className="business-list">{sectors.map(sector=>{
    const available=sector.status==='Available'&&sector.link;
    const content=<><div><h2>{sector.title}</h2><p>{sector.description}</p></div><span className={`business-status ${available?'is-available':''}`}>{available?<>Explore<ArrowUpRight size={17}/></>:'Page in planning'}</span></>;
    return available?<Link className="business-row" href={sector.link!} key={sector.id}>{content}</Link>:<article className="business-row" key={sector.id}>{content}</article>;
   })}</div>
   {!sectors.length&&<p className="inline-notice">Get in touch below to discuss a website for your cleaning or lawn-care business.</p>}
   <footer className="business-contact"><h2>Let’s talk about your website.</h2><a href={`mailto:${site.email}?subject=${encodeURIComponent('A website for my business')}`}>Get a quote<ArrowUpRight size={18}/></a></footer>
  </main>
 </div>;
}
