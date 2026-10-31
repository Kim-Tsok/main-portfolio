"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import {useSiteSettings} from "./settings-provider";

const links = [
  {href:"/#about",label:"About",suit:"♦"},
  {href:"/#work",label:"Work",suit:"♠"},
  {href:"/blog",label:"Blog",suit:"♥"},
  {href:"/#elsewhere",label:"Beyond code",suit:"♣"},
];

export default function Header() {
  const settings=useSiteSettings();
  const [open,setOpen]=useState(false);
  const [hovered,setHovered]=useState<string|null>(null);
  const toggle=useRef<HTMLButtonElement>(null);
  const pathname=usePathname();
  const reduced=useReducedMotion();
  return <header className="site-header simple-header capsule-header" id="top" onKeyDown={e=>{if(e.key==="Escape"&&open){setOpen(false);toggle.current?.focus();}}}>
    <nav className="container-page header-inner" aria-label="Main navigation">
      <Link href="/" className="simple-wordmark" aria-label="Kim Tsok, home"><span className="brand-initials" aria-hidden="true">k<span>t</span></span><span className="brand-suit" aria-hidden="true">♠</span></Link>
      <div className="simple-header-links nav-capsule" onMouseLeave={()=>setHovered(null)}>{links.map(link=><Link key={link.href} href={link.href} aria-current={link.href==="/blog"&&pathname.startsWith("/blog")?"page":undefined} onMouseEnter={()=>setHovered(link.href)} onFocus={()=>setHovered(link.href)} onBlur={()=>setHovered(null)}>{hovered===link.href&&<motion.span className="nav-hover" layoutId="header-highlight" transition={reduced?{duration:0}:{type:"spring",stiffness:450,damping:35}}/>}<span>{link.label}</span></Link>)}</div>
      <div className="header-actions"><Link href={settings.resume_url} className="resume-link">Résumé<ArrowUpRight size={12}/></Link><a href={`mailto:${site.email}`} className="header-contact">Let’s talk<span className="contact-arrow"><ArrowUpRight size={15} aria-hidden="true"/></span></a><button ref={toggle} className="header-menu-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-controls="header-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button></div>
    </nav>
    {open&&<nav id="header-mobile-menu" className="header-mobile-menu container-page" aria-label="Mobile navigation">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}><span><i aria-hidden="true">{link.suit}</i>{link.label}</span><ArrowUpRight size={15}/></Link>)}<a href={`mailto:${site.email}`}>Let’s talk<ArrowUpRight size={15}/></a></nav>}
  </header>;
}
