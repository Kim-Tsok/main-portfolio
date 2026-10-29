import {NextResponse} from 'next/server';
import {revalidateTag,revalidatePath} from 'next/cache';
import {adminSession,sameOrigin} from '@/lib/admin';
import {collections,isCollection,validId,validateContent} from '@/lib/content-validation';
const denied=()=>NextResponse.json({error:'Sign in with an administrator account.'},{status:401});
const invalidate=()=>{for(const tag of ['content','projects','skills','services'])revalidateTag(tag,{expire:0});revalidatePath('/','layout');};
export async function GET(){
 const session=await adminSession();if(!session)return denied();
 const results=await Promise.all(collections.map(async collection=>({collection,...await session.supabase.from(collection).select('*').order(collection==='site_settings'?'id':'created_at',{ascending:false})})));
 const failed=results.find(r=>r.error);if(failed)return NextResponse.json({error:'Content schema is unavailable. Apply the latest content migrations before editing.',code:failed.error?.code},{status:503});
 const data=Object.fromEntries(results.map(r=>[r.collection,r.data]));
 const photos=data.photographs||[];const paths=photos.map(p=>p.storage_path).filter(Boolean);
 if(paths.length){const {data:signed}=await session.supabase.storage.from('portfolio-photos').createSignedUrls(paths,1800);const urls=new Map(signed?.map(p=>[p.path,p.signedUrl]));data.photographs=photos.map(p=>({...p,preview_url:p.storage_path?urls.get(p.storage_path):p.image_url}));}
 return NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}});
}
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Request origin is not allowed.'},{status:403});
 const session=await adminSession();if(!session)return denied();
 if(Number(req.headers.get('content-length'))>200000)return NextResponse.json({error:'Content is too large.'},{status:413});
 try{
  const body=await req.json();if(!isCollection(body.collection))throw Error('Unknown content type.');
  const {collection,id}=body;if(id&&!(collection==='site_settings'?id==='main':validId(id)))throw Error('Invalid entry.');
  const record=validateContent(collection,body.record);
  // Slugs stay stable after publication; changing a title must not break links.
  if(id&&['projects','blog_posts'].includes(collection)){
   const {data:existing}=await session.supabase.from(collection).select('slug').eq('id',id).single();
   if(existing?.slug&&'slug' in record&&existing.slug!==record.slug)throw Error('Keep the original slug so existing links keep working.');
  }
  const query=id?session.supabase.from(collection).update(record).eq('id',id):session.supabase.from(collection).insert(record);
  const {data,error}=await query.select().single();
  if(error){console.error('Admin save failed:',error.code);return NextResponse.json({error:error.code==='23505'?'That slug or name is already in use.':'Could not save this entry. Your changes are still in the editor.'},{status:400});}
  invalidate();return NextResponse.json({id:data.id});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Invalid content.'},{status:400});}
}
export async function PATCH(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Request origin is not allowed.'},{status:403});
 const session=await adminSession();if(!session)return denied();
 try{const {collection,id,archived}=await req.json();if(!isCollection(collection)||collection==='site_settings'||!validId(id)||typeof archived!=='boolean')throw Error('Invalid archive request.');
 const {error}=await session.supabase.from(collection).update({archived_at:archived?new Date().toISOString():null}).eq('id',id).select('id').single();if(error)throw Error('Could not update the archive.');invalidate();return NextResponse.json({saved:true});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Invalid request.'},{status:400});}
}
