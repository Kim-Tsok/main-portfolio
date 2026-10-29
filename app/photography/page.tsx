import type {Metadata} from "next";
import Link from "next/link";
import {ArrowLeft,Camera} from "lucide-react";
import Header from "@/components/header";
import PhotographyGallery from "@/components/photography-gallery";
import {getPhotos,getSettings} from "@/lib/content";
export const metadata:Metadata={title:'Photography',description:'Photography by Kim Tsok. A collection of moments, places and details from his side of the world.',alternates:{canonical:'/photography'}};
export default async function Photography(){const [photos,settings]=await Promise.all([getPhotos(),getSettings()]);return <div className="portfolio-shell"><Header/><main className="container-page photography-page"><Link href="/#elsewhere" className="breadcrumb"><ArrowLeft size={14}/>Beyond code</Link><header className="blog-archive-heading"><p className="note-label"><Camera size={16}/> Through my lens</p><h1>Stopped to look<span>.</span></h1><p>{settings.photography_intro}</p></header><PhotographyGallery photos={photos}/><footer className="blog-footnote"><span>Photographs by Kim Tsok.</span><Link href="/#contact">Get in touch</Link></footer></main></div>}
