import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import Header from '@/components/header';
import {getBusinessSectors} from '@/lib/content';
import {site} from '@/lib/site';

export const metadata:Metadata={
 title:'For businesses',
 description:'Websites and practical web tools for service businesses, with Kim Tsok. Explore work for law firms and upcoming industry pages.',
 alternates:{canonical:'/business'},
 openGraph:{title:'For businesses — Kim Tsok',description:'Websites, enquiries and the work that happens after someone gets in touch.',url:'/business',type:'website'},
};

export default async function BusinessPage(){
 const sectors=await getBusinessSectors();
 return <div className="portfolio-shell">
  <a href="#main" className="skip-link">Skip to content</a><Header/>
  <main id="main" className="container-page blog-archive business-archive">
   <Link href="/" className="breadcrumb"><ArrowLeft size={14}/>Back home</Link>
   <div className="blog-archive-heading business-heading"><h1>For businesses<span>.</span></h1><p>A website that explains what you do. A simpler way to handle what comes next.</p></div>
   <div className="business-list">{sectors.map(sector=>{
    const available=sector.status==='Available'&&sector.link;
    const content=<><div><h2>{sector.title}</h2><p>{sector.description}</p></div><span className={`business-status ${available?'is-available':''}`}>{available?<>Explore<ArrowUpRight size={17}/></>:'Page in planning'}</span></>;
    return available?<Link className="business-row" href={sector.link!} key={sector.id}>{content}</Link>:<article className="business-row" key={sector.id}>{content}</article>;
   })}</div>
   <footer className="business-contact"><h2>What does your business need?</h2><a href={`mailto:${site.email}?subject=${encodeURIComponent('A website for my business')}`}>Let’s talk<ArrowUpRight size={18}/></a></footer>
  </main>
 </div>;
}
