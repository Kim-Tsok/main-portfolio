"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import type { Photograph } from "@/lib/content";

export default function PhotographyGallery({photos}:{photos:Photograph[]}){
 const dialog=useRef<HTMLDialogElement>(null);
 const [active,setActive]=useState(0);
 const open=(index:number)=>{setActive(index);dialog.current?.showModal();};
 const step=(by:number)=>setActive(index=>(index+by+photos.length)%photos.length);
 if(!photos.length) return <p className="photo-empty">The first collection is on its way. Come back for a look.</p>;
 const photo=photos[active];
 return <><div className="photo-grid">{photos.map((p,i)=><figure key={p.id} className="photo-frame"><button type="button" onClick={()=>open(i)} aria-label={`View ${p.title}`}><Image src={p.image_url} alt={p.alt_text} width={1000} height={750} sizes="(max-width:699px) 90vw, 45vw" className="photo-image"/><span className="photo-expand"><Expand size={17}/></span></button><figcaption><span>{p.title}</span>{p.location&&<small>{p.location}</small>}</figcaption></figure>)}</div><dialog ref={dialog} className="photo-dialog" aria-label={photo.title} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}><div className="photo-viewer"><button className="photo-close" onClick={()=>dialog.current?.close()} aria-label="Close photograph"><X size={22}/></button><Image src={photo.image_url} alt={photo.alt_text} width={2400} height={1800} sizes="95vw" className="photo-full"/><div className="photo-viewer-caption"><div><h2>{photo.title}</h2>{photo.caption&&<p>{photo.caption}</p>}{photo.location&&<small>{photo.location}</small>}</div>{photos.length>1&&<div className="photo-viewer-controls"><button aria-label="Previous photograph" onClick={()=>step(-1)}><ArrowLeft size={18}/></button><span>{active+1} / {photos.length}</span><button aria-label="Next photograph" onClick={()=>step(1)}><ArrowRight size={18}/></button></div>}</div></div></dialog></>;
}
