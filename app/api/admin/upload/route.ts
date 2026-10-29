import {NextResponse} from 'next/server';
import sharp from 'sharp';
import {randomUUID} from 'node:crypto';
import {adminSession,sameOrigin} from '@/lib/admin';
export const runtime='nodejs';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Request origin is not allowed.'},{status:403});
 const session=await adminSession();if(!session)return NextResponse.json({error:'Administrator sign-in required.'},{status:401});
 if(Number(req.headers.get('content-length'))>7*1024*1024)return NextResponse.json({error:'Choose an image smaller than 6 MB.'},{status:413});
 try{
  const form=await req.formData();const file=form.get('file');
  const purpose=String(form.get('purpose')||'photography');
  if(!['photography','projects','portrait','blog'].includes(purpose))return NextResponse.json({error:'Choose a valid image destination.'},{status:400});
  if(!(file instanceof File)||file.size>6*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type))return NextResponse.json({error:'Use a JPEG, PNG or WebP image up to 6 MB.'},{status:400});
  const image=sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:40000000,animated:false});
  const metadata=await image.metadata();if(!['jpeg','png','webp'].includes(metadata.format||'')||(metadata.pages||1)>1)throw Error('Unsupported image.');
  // Re-encode and strip EXIF/GPS data; store a web-sized copy, never an executable SVG.
  const bytes=await image.rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toBuffer();
  const bucket=purpose==='photography'?'portfolio-photos':'portfolio-media';
  const path=`${purpose}/${randomUUID()}.webp`;
  const {error}=await session.supabase.storage.from(bucket).upload(path,bytes,{contentType:'image/webp',upsert:false});
  if(error){console.error('Image upload failed:',error.message);return NextResponse.json({error:'Upload failed. Check the media storage setup and try again.'},{status:400});}
  if(purpose!=='photography'){
   const {data}=session.supabase.storage.from(bucket).getPublicUrl(path);
   return NextResponse.json({url:data.publicUrl});
  }
  const {data,error:previewError}=await session.supabase.storage.from(bucket).createSignedUrl(path,1800);
  if(previewError)return NextResponse.json({error:'The image uploaded, but its preview could not be created. Try again.'},{status:400});
  return NextResponse.json({path,preview_url:data.signedUrl});
 }catch{return NextResponse.json({error:'This image could not be read. Try exporting it as JPEG, PNG or WebP.'},{status:400});}
}
