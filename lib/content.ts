import "server-only";
import { createClient } from "@supabase/supabase-js";
import {publicFetch} from "./public-fetch";
import type { Post } from "./posts";

export type Photograph = {id:string;title:string;alt_text:string;caption:string;location:string;taken_at:string|null;image_url:string;storage_path:string|null;sort_order:number};
export type PersonalItem = {id:string;title:string;description:string;category:string;link:string|null;link_label:string|null;sort_order:number};
export type SiteSettings = {resume_url:string;booking_url:string|null;photography_intro:string};
export function publicClient(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{auth:{persistSession:false},global:{fetch:publicFetch}});}
function storageClient(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function getPosts():Promise<Post[]>{
 const {data,error}=await publicClient().from('blog_posts').select('slug,title,excerpt,category,body,published_at').eq('published',true).is('archived_at',null).order('sort_order').order('published_at',{ascending:false});
 if(error) {console.error('Blog content unavailable:',error.code);return [];}
 return (data||[]).map(p=>({...p,publishedAt:p.published_at}));
}
export async function getPost(slug:string){return (await getPosts()).find(p=>p.slug===slug);}
export async function getPersonalItems():Promise<PersonalItem[]>{
 const {data,error}=await publicClient().from('personal_content').select('id,title,description,category,link,link_label,sort_order').eq('published',true).is('archived_at',null).order('sort_order');
 if(error){console.error('Personal content unavailable:',error.code);return [];}
 return data||[];
}
export async function getPhotos():Promise<Photograph[]>{
 const {data,error}=await publicClient().from('photographs').select('id,title,alt_text,caption,location,taken_at,image_url,storage_path,sort_order').eq('published',true).is('archived_at',null).order('sort_order').order('created_at',{ascending:false});
 if(error){console.error('Photography unavailable:',error.code);return [];}
 if(!data?.length) return [];
 const paths=data.map(p=>p.storage_path).filter((p):p is string=>Boolean(p));
 const {data:signed}=paths.length?await storageClient().storage.from('portfolio-photos').createSignedUrls(paths,3600):{data:[]};
 const urls=new Map(signed?.map(p=>[p.path,p.signedUrl]));
 return data.filter(p=>!p.storage_path||urls.get(p.storage_path)).map(p=>({...p,image_url:p.storage_path?urls.get(p.storage_path)!:p.image_url}));
}
export async function getSettings():Promise<SiteSettings>{
 const {data}=await publicClient().from('site_settings').select('resume_url,booking_url,photography_intro').eq('id','main').single();
 return data||{resume_url:'/resume',booking_url:null,photography_intro:'A few things I stopped to look at. Photographs from my side of the world.'};
}
