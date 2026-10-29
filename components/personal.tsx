import { BookOpen, Gamepad2, Music2, Box, Camera, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getPersonalItems, getPhotos } from "@/lib/content";
import PhotographyGallery from "./photography-gallery";

const icons:Record<string,typeof BookOpen>={writing:BookOpen,games:Gamepad2,music:Music2,'3d':Box,photography:Camera};
export default async function Personal(){
 const [items,photos]=await Promise.all([getPersonalItems(),getPhotos()]);
 const photography=items.find(item=>item.category==='photography');
 return <section id="elsewhere" className="personal-section section-space" aria-labelledby="personal-title"><div className="section-top"><div><h2 id="personal-title">The wild cards<span className="heading-suit" aria-hidden="true">♣</span></h2></div></div><div className="beyond-items">{items.filter(item=>item.category!=='photography').map(item=>{const Icon=icons[item.category]||Sparkles;return <article className={`beyond-item beyond-${item.category}`} key={item.id}><Icon size={23} strokeWidth={1.5}/><div><h3>{item.title}</h3><p>{item.description}</p>{item.link&&<Link href={item.link} className="text-link" {...(item.link.startsWith('https://')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{item.link_label||'Take a look'}<ArrowUpRight size={14}/></Link>}</div></article>;})}</div><div className="photography-preview"><div className="photography-intro"><div><Camera size={20}/><h3>{photography?.title||'Photography'}</h3></div><Link href="/photography" className="text-link">The collection<ArrowUpRight size={14}/></Link></div><PhotographyGallery photos={photos.slice(0,4)}/></div></section>;
}
