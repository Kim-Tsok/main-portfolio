import {projectCategories} from './project-categories';
export const collections=['projects','blog_posts','photographs','personal_content','business_sectors','skills','services','site_settings'] as const;
export type Collection=typeof collections[number];
export const isCollection=(value:unknown):value is Collection=>typeof value==='string'&&(collections as readonly string[]).includes(value);
export const validId=(id:unknown)=>typeof id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
function text(value:unknown,max:number,required=false){if(typeof value!=='string')value='';const t=(value as string).trim();if(t.length>max)throw Error(`Text must be ${max} characters or fewer.`);if(required&&!t)throw Error('Fill in all required fields.');return t;}
function number(value:unknown){if(typeof value!=='number'||!Number.isInteger(value)||Math.abs(value)>100000)throw Error('Order must be a whole number between -100000 and 100000.');return value;}
function bool(value:unknown){if(typeof value!=='boolean')throw Error('Invalid publishing status.');return value;}
export function safeLink(value:unknown){const url=text(value,2048);if(!url)return null;if(/^\/(?!\/)[^\\]*$/.test(url)&&!/[\u0000-\u001f]/.test(url))return url;try{const u=new URL(url);if(u.protocol==='https:'&&!u.username&&!u.password)return u.href;}catch{}throw Error('Use an HTTPS URL or a local path starting with /.');}
export function mediaLink(value:unknown){const link=safeLink(value);if(!link||link.startsWith('/'))return link;const host=new URL(link).hostname;const configured=process.env.NEXT_PUBLIC_SUPABASE_URL;const allowed=['res.cloudinary.com',...(configured?[new URL(configured).hostname]:[])];if(!allowed.includes(host))throw Error('Use a Cloudinary or configured Supabase image URL.');return link;}
function date(value:unknown,required=false){const d=text(value,10,required);if(!d)return null;if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||!Number.isFinite(Date.parse(d))||new Date(d).toISOString().slice(0,10)!==d)throw Error('Use a valid date.');return d;}
function slug(value:unknown){const s=text(value,160,true);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s))throw Error('Slugs use lowercase letters, numbers and single hyphens.');return s;}
export function validateContent(collection:Collection,input:unknown){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid content.');
 const r=input as Record<string,unknown>;
 if(collection==='site_settings')return {id:'main',resume_url:safeLink(r.resume_url)||'/resume',booking_url:safeLink(r.booking_url),photography_intro:text(r.photography_intro,1000,true),intro_description:text(r.intro_description,140,true),intro_photo_url:mediaLink(r.intro_photo_url)||'/kim-tsok-profile.jpg',intro_photo_alt:text(r.intro_photo_alt,200,true)};
 if(collection==='skills')return {name:text(r.name,100,true),category:text(r.category,100,true)};
 const base={title:text(r.title,200,true)};
 if(collection==='services')return {...base,description:text(r.description,2000,true),order_index:number(r.order_index??0)};
 const publishing={published:bool(r.published??false),sort_order:number(r.sort_order??0)};
 if(collection==='business_sectors'){
  const status=text(r.status,20,true);if(!['Planned','Available'].includes(status))throw Error('Choose Planned or Available.');
  const link=safeLink(r.link);if(status==='Available'&&!link)throw Error('Add a link before marking this page available.');
  return {...base,...publishing,description:text(r.description,1000,true),status,link};
 }
 if(collection==='blog_posts')return {...base,...publishing,slug:slug(r.slug),excerpt:text(r.excerpt,1000,true),category:text(r.category,100,true),body:text(r.body,100000,true),published_at:date(r.published_at,true)};
 if(collection==='personal_content'){
  const category=text(r.category,30,true);if(!['writing','games','music','3d','photography','other'].includes(category))throw Error('Choose a valid category.');
  return {...base,...publishing,category,description:text(r.description,2000,true),link:safeLink(r.link),link_label:text(r.link_label,100)};
 }
 if(collection==='photographs'){
  const path=text(r.storage_path,200);if(path&&!/^photography\/[0-9a-f-]{36}\.webp$/.test(path))throw Error('Invalid uploaded photograph.');
  const image=path?null:mediaLink(r.image_url);if(!image&&!path)throw Error('Upload a photograph or provide its image URL.');
  return {...base,...publishing,alt_text:text(r.alt_text,500,true),caption:text(r.caption,2000),location:text(r.location,200),taken_at:date(r.taken_at),image_url:path?`storage://${path}`:image,storage_path:path||null};
 }
 const tech=r.tech_stack;if(!Array.isArray(tech)||tech.length>30||tech.some(t=>typeof t!=='string'||t.length>100))throw Error('Provide a valid list of tools.');
 const category=text(r.category,40,true);if(!(projectCategories as readonly string[]).includes(category))throw Error('Choose a valid project category.');
 const custom=r.custom_links??[];if(!Array.isArray(custom)||custom.length>12)throw Error('Use at most 12 project links.');
 return {...base,...publishing,category,slug:slug(r.slug),description:text(r.description,10000,true),summary:text(r.summary,1000),article:text(r.article,100000),image_url:mediaLink(r.image_url),link:safeLink(r.link),github_url:safeLink(r.github_url),tech_stack:tech.map(t=>t.trim()).filter(Boolean),featured:bool(r.featured??false),custom_links:custom.map(l=>({label:text(l?.label,100,true),url:safeLink(l?.url)}))};
}
