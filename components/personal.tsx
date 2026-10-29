import { BookOpen, Gamepad2, Music2, Box, Camera, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getPersonalItems, getPhotos, getSettings } from "@/lib/content";
import PhotographyGallery from "./photography-gallery";

const icons:Record<string,typeof BookOpen>={writing:BookOpen,games:Gamepad2,music:Music2,'3d':Box,photography:Camera};
export default async function Personal(){
 const [items,photos,settings]=await Promise.all([getPersonalItems(),getPhotos(),getSettings()]);
 const photography=items.find(item=>item.category==='photography');
 return <section id="elsewhere" className="personal-section section-space" aria-labelledby="personal-title"><div className="section-top"><div><h2 id="personal-title">The wild cards<span className="heading-suit" aria-hidden="true">♣</span></h2><p>A few other things that make me, me.</p></div></div><div className="beyond-items">{items.filter(item=>item.category!=='photography').map(item=>{const Icon=icons[item.category]||Sparkles;return <article className={`beyond-item beyond-${item.category}`} key={item.id}><Icon size={23} strokeWidth={1.5}/><div><h3>{item.title}</h3><p>{item.description}</p>{item.link&&<Link href={item.link} className="text-link" {...(item.link.startsWith('https://')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{item.link_label||'Take a look'}<ArrowUpRight size={14}/></Link>}</div></article>;})}</div><div className="photography-preview"><div className="photography-intro"><div><Camera size={20}/><h3>{photography?.title||'Photography'}</h3><p>{photography?.description||settings.photography_intro}</p></div><Link href="/photography" className="text-link">The collection<ArrowUpRight size={14}/></Link></div><PhotographyGallery photos={photos.slice(0,4)}/></div><p className="personal-footnote">For the less curated version, I’m <a href="https://x.com/im_telepathic" target="_blank" rel="noopener noreferrer">@im_telepathic on Twitter<ArrowUpRight size={13}/></a>.</p></section>;
}
