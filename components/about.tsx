"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {useSiteSettings} from "./settings-provider";
import type { Skill } from "@/lib/data";

export default function About({ skills }: { skills: Skill[]; projectCount?: number; clientCount?: number }) {
  const settings=useSiteSettings();
  const [tab, setTab] = useState("About me");
  const groups = Object.entries(skills.reduce<Record<string,string[]>>((result,skill)=>{const category=skill.category||"Tools";(result[category]??=[]).push(skill.name);return result;},{})).map(([name,tools])=>({name,tools:tools.join(", ")}));
  return <section className="about-section section-space" id="about" aria-labelledby="about-title"><div className="about-heading"><h2 id="about-title">A bit about me.</h2><Link className="text-link" href={settings.resume_url}>View my résumé <ArrowUpRight size={15} /></Link></div><div className="about-content"><div className="about-tabs" role="tablist" aria-label="About Kim">{["About me", "Skills"].map((t,i) => <button key={t} type="button" role="tab" id={`about-tab-${i}`} aria-selected={tab===t} aria-controls="about-panel" tabIndex={tab===t?0:-1} onClick={() => setTab(t)} onKeyDown={e => { if (["ArrowLeft","ArrowRight","Home","End"].includes(e.key)) { e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 1 : tab === "About me" ? 1 : 0; setTab(next ? "Skills" : "About me"); document.getElementById(`about-tab-${next}`)?.focus(); } }}>{t}</button>)}</div><div id="about-panel" role="tabpanel" aria-labelledby={`about-tab-${tab === "Skills" ? 1 : 0}`} tabIndex={0}>{tab === "About me" ? <div className="about-prose"><p>I’m Kim Kelvin Tsok, a product engineer based in Nigeria. I build web products and websites for clients.</p><p>My own projects follow my interests: writing, scattered thoughts, and games.</p><a className="text-link" href="https://github.com/Kim-Tsok" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div> : <div className="skill-groups">{groups.map(g => <div key={g.name}><h3>{g.name}</h3><p>{g.tools}</p></div>)}</div>}</div></div></section>;
}
