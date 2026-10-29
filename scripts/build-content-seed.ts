import {writeFileSync} from 'node:fs';
import {posts} from '../lib/posts';
import {projectStory} from '../lib/project-stories';
import {slugify,type Project} from '../lib/data';
import snapshot from '../lib/project-snapshot.json';
const q=(v:string)=>`'${v.replace(/'/g,"''")}'`;
let sql='BEGIN;\n';
for(const p of posts) sql+=`INSERT INTO public.blog_posts(slug,title,excerpt,category,body,published,published_at) VALUES(${q(p.slug)},${q(p.title)},${q(p.excerpt)},${q(p.category)},${q(p.body)},true,${q(p.publishedAt)}) ON CONFLICT(slug) DO NOTHING;\n`;
for(const p of snapshot){const project={...p,slug:slugify(p.title)} as Project;const story=projectStory(project);sql+=`UPDATE public.projects SET slug=COALESCE(slug,${q(project.slug)}),summary=COALESCE(summary,${q(story.summary)}),article=COALESCE(article,${q(story.article)}) WHERE id=${q(p.id)};\n`;}
const personal=[
 ['writing','I write, too.','Essays, observations, and occasional updates on what I’m making.','https://substack.com/@kimtsok','Find me on Substack'],
 ['games','Playing. And making.','I enjoy games, and I’ve made a few of my own. Over the Gear and Gladys are two of them.','/projects/over-the-gear','Meet Cog'],
 ['music','Something in FL Studio','Making music is another way I like to spend time. Sometimes I swap the code editor for a piano roll.','',''],
 ['3d','A little 3D curiosity','I’ve dabbled in Blender. Still very much in the trying-things-out stage.','',''],
 ['photography','Through my lens','Photography is another way I like to explore. A place for the things I stop to look at.','/photography','View photography'],
];
personal.forEach((p,i)=>{sql+=`INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT ${q(p[0])},${q(p[1])},${q(p[2])},${p[3]?q(p[3]):'NULL'},${p[4]?q(p[4]):'NULL'},true,${i} WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category=${q(p[0])});\n`;});
sql+='COMMIT;\n';
writeFileSync('scripts/004_seed_portfolio_content.sql',sql);
console.log('Content seed prepared; existing edited content will be preserved.');
