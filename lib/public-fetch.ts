// Cache successful public HTTP reads once. Do not wrap query results in another
// cache: a temporary failure must not turn into a cached empty content library.
export const publicFetch: typeof fetch = (input,init) => {
 const headers=new Headers(init?.headers);
 headers.set('x-portfolio-read-version','cards-v1');
 return fetch(input,{...init,headers,cache:'force-cache',next:{revalidate:60,tags:['content','projects','skills','services']}});
};
