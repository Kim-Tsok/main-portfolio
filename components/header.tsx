"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [{href:"/#work",label:"Work"},{href:"/#about",label:"About"},{href:"/#elsewhere",label:"Beyond code"}];

export default function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header simple-header capsule-header" id="top">
    <nav className="container-page header-inner" aria-label="Main navigation">
      <Link href="/" className="simple-wordmark" aria-label="Kim Tsok, home"><span className="brand-initials">kt<span>.</span></span><span className="brand-suit" aria-hidden="true">♠</span></Link>
      <div className="simple-header-links nav-capsule">{links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
      <div className="header-actions"><Link href={site.cvUrl} className="resume-link">Résumé<ArrowUpRight size={13}/></Link><a href={`mailto:${site.email}`} className="header-contact">Contact<span className="contact-arrow"><ArrowUpRight size={14}/></span></a><button className="header-menu-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-controls="header-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>
    </nav>
    {open&&<nav id="header-mobile-menu" className="header-mobile-menu container-page" aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==="Escape"){setOpen(false);document.querySelector<HTMLButtonElement>(".header-menu-toggle")?.focus();}}}>{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.label}<ArrowUpRight size={15}/></Link>)}<a href={`mailto:${site.email}`}>Say hello<ArrowUpRight size={15}/></a></nav>}
  </header>;
}
