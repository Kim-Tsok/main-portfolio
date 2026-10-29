export function sameOrigin(req:Request){
 const origin=req.headers.get('origin');
 if(!origin)return true;
 const target=new URL(req.url);
 // Next's internal URL can use the bind address (0.0.0.0), while the browser
 // addresses the same server through Host. Do not trust x-forwarded-host.
 const host=req.headers.get('host');
 return origin===target.origin || Boolean(host && origin===`${target.protocol}//${host}`);
}
