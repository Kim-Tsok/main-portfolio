"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  {href:"/#work",label:"Work",suit:"♠"},
  {href:"/#about",label:"About",suit:"♦"},
  {href:"/blog",label:"Blog",suit:"♥"},
  {href:"/#elsewhere",label:"Beyond code",suit:"♣"},
];

export default function Header() {
  const [open,setOpen]=useState(false);
  const [hovered,setHovered]=useState<string|null>(null);
  const toggle=useRef<HTMLButtonElement>(null);
  const pathname=usePathname();
  const reduced=useReducedMotion();
  return <header className="site-header simple-header capsule-header table-header" id="top">
    <nav className="container-page header-inner" aria-label="Main navigation">
      <Link href="/" className="simple-wordmark" aria-label="Kim Tsok, home"><span className="table-brand-suit" aria-hidden="true">♠</span><span className="table-brand-name">Kim Tsok<span>Product engineer</span></span></Link>
      <div className="simple-header-links nav-capsule" onMouseLeave={()=>setHovered(null)}>{links.map(link=><Link key={link.href} href={link.href} aria-current={link.href==="/blog"&&pathname.startsWith("/blog")?"page":undefined} onMouseEnter={()=>setHovered(link.href)} onFocus={()=>setHovered(link.href)} onBlur={()=>setHovered(null)}>{hovered===link.href&&<motion.span className="nav-hover" layoutId="header-highlight" transition={{type:"spring",stiffness:450,damping:35,duration:reduced?0:undefined}}/>}<span className="nav-suit" aria-hidden="true">{link.suit}</span><span>{link.label}</span></Link>)}</div>
      <div className="header-actions"><Link href={site.cvUrl} className="resume-link">Résumé<ArrowUpRight size={12}/></Link><a href={`mailto:${site.email}`} className="header-contact">Let’s talk<ArrowUpRight size={15}/></a><button ref={toggle} className="header-menu-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-controls="header-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button></div>
    </nav>
    <AnimatePresence initial={false}>{open&&<motion.nav key="mobile-menu" id="header-mobile-menu" className="header-mobile-menu container-page" aria-label="Mobile navigation" initial={{opacity:0,y:reduced?0:-8,scale:reduced?1:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:reduced?0:-5}} transition={{duration:reduced?0:.2,ease:[.22,1,.36,1]}} onKeyDown={e=>{if(e.key==="Escape"){setOpen(false);toggle.current?.focus();}}}>{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}><span><i aria-hidden="true">{link.suit}</i>{link.label}</span><ArrowUpRight size={15}/></Link>)}<a href={`mailto:${site.email}`}>Let’s talk<ArrowUpRight size={15}/></a></motion.nav>}</AnimatePresence>
  </header>;
}
