import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeLink,validateContent,validId,isCollection} from '../lib/content-validation';
import {isClientProject,type Project} from '../lib/data';
import {projectCategories} from '../lib/project-categories';
import {slugify} from '../lib/slug';
import {sameOrigin} from '../lib/request-origin';
test('rejects executable and protocol-relative URLs',()=>{for(const url of ['javascript:alert(1)','data:text/html,hi','//evil.example','/\\evil.example','https://user:pass@example.com'])assert.throws(()=>safeLink(url));assert.equal(safeLink('/photography'),'/photography');});
test('photo requires alt text and a real image source',()=>{assert.throws(()=>validateContent('photographs',{title:'A photo',image_url:'https://res.cloudinary.com/test.jpg'}));assert.throws(()=>validateContent('photographs',{title:'A photo',alt_text:'A street',image_url:''}));});
test('uploaded photos retain their private path when edited',()=>{const path='photography/12345678-1234-4234-8234-123456789abc.webp';const record=validateContent('photographs',{title:'Street',alt_text:'A street',storage_path:path,image_url:`storage://${path}`,published:false});assert.equal('image_url' in record && record.image_url,`storage://${path}`);assert.equal('published' in record && record.published,false);});
test('content validation drops role and record ownership injection',()=>{const record=validateContent('personal_content',{title:'Music',description:'A sketch',category:'music',published:true,is_admin:true,id:'attacker'});assert.equal('is_admin' in record,false);assert.equal('id' in record,false);});
test('rejects fake dates, invalid slugs and nonboolean publishing flags',()=>{const post={title:'Test',slug:'test',body:'Text',excerpt:'Excerpt',category:'Notes',published_at:'2026-10-29'};assert.throws(()=>validateContent('blog_posts',{...post,published_at:'2026-02-30'}));assert.throws(()=>validateContent('blog_posts',{...post,slug:'../admin'}));assert.throws(()=>validateContent('blog_posts',{...post,published:'true'}));});
test('skills do not require an unrelated title',()=>{assert.deepEqual(validateContent('skills',{name:'React',category:'Frontend'}),{name:'React',category:'Frontend'});});
test('restricts writable tables and identifiers',()=>{assert.equal(isCollection('portfolio_admins'),false);assert.equal(validId('1 OR 1=1'),false);});
test('introduction settings reject oversized biographies and untrusted portraits',()=>{
 const settings={resume_url:'/resume',booking_url:'',photography_intro:'Photos',intro_description:'I build web products.',intro_photo_url:'/kim-tsok-profile.jpg',intro_photo_alt:'Kim Tsok'};
 assert.throws(()=>validateContent('site_settings',{...settings,intro_description:'x'.repeat(141)}));
 assert.throws(()=>validateContent('site_settings',{...settings,intro_photo_url:'https://untrusted.example/portrait.jpg'}));
 assert.equal('intro_photo_url' in validateContent('site_settings',settings),true);
});
test('project type is validated and overrides legacy client tags',()=>{
 const project={title:'Test',slug:'test',description:'A project',tech_stack:['Client','React']};
 for(const category of projectCategories){const record=validateContent('projects',{...project,category});assert.equal('category' in record&&record.category,category);}
 assert.throws(()=>validateContent('projects',{...project,category:'Made up'}));
 assert.equal(isClientProject({...project,category:'Personal product'} as Project),false);
 assert.equal(isClientProject({...project,tech_stack:[],category:'Client work'} as unknown as Project),true);
 assert.equal(isClientProject(project as Project),true);
});
test('planned business pages cannot become available without a safe link',()=>{
 const sector={title:'Law firms',description:'Websites for law firms',status:'Planned'};
 assert.equal('link' in validateContent('business_sectors',sector),true);
 assert.throws(()=>validateContent('business_sectors',{...sector,status:'Available'}));
 assert.throws(()=>validateContent('business_sectors',{...sector,status:'Available',link:'javascript:alert(1)'}));
 assert.throws(()=>validateContent('business_sectors',{...sector,status:'Live'}));
 assert.equal('status' in validateContent('business_sectors',{...sector,status:'Available',link:'/lawyers'}),true);
});
test('generated slugs normalize titles without unsafe path characters',()=>{
 assert.equal(slugify('A café / some thoughts!'),'a-cafe-some-thoughts');
});
test('origin checks allow the browser host and reject forged forwarded hosts',()=>{
 const request=(origin:string,forwarded?:string)=>new Request('http://0.0.0.0:3000/api/admin/upload',{headers:{host:'localhost:3000',origin,...(forwarded?{'x-forwarded-host':forwarded}:{})}});
 assert.equal(sameOrigin(request('http://localhost:3000')),true);
 assert.equal(sameOrigin(request('https://evil.example','evil.example')),false);
 assert.equal(sameOrigin(request('http://localhost:3001')),false);
});
