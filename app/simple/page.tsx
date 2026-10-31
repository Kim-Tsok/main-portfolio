import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects,getSkills,projectLinks} from '@/lib/data';
import {getPersonalItems,getPosts,getSettings} from '@/lib/content';
import {projectStory} from '@/lib/project-stories';
import {site,socials} from '@/lib/site';
import styles from './simple.module.css';

export const metadata:Metadata={
 title:'Simplified portfolio',
 description:'A text-only version of Kim Tsok’s portfolio: projects, skills, writing and contact details.',
 alternates:{canonical:'/simple'},
};

export default async function SimplePortfolio(){
 const [projects,skills,posts,personal,settings]=await Promise.all([getProjects(),getSkills(),getPosts(),getPersonalItems(),getSettings()]);
 const groups=Object.entries(skills.reduce<Record<string,string[]>>((all,skill)=>{
  (all[skill.category||'Other']??=[]).push(skill.name);return all;
 },{}));
 const ordered=[...projects].sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||(a.sort_order??100)-(b.sort_order??100));
 return <div className={styles.canvas}><div className={styles.page}>
  <a href="#simple-main" className="skip-link">Skip to content</a>
  <header className={styles.header}><Link href="/" prefetch={false}>Full version</Link><nav aria-label="Portfolio sections"><a href="#projects">Projects</a><a href="#writing">Writing</a><a href="#contact">Contact</a></nav></header>
  <main id="simple-main">
   <section className={styles.intro} aria-labelledby="simple-title">
    <h1 id="simple-title">{site.name}</h1><p className={styles.role}>{site.role} · {site.location}</p>
    <p>{settings.intro_description}</p>
    <p className={styles.links}><a href={settings.resume_url}>Résumé</a><a href={`mailto:${site.email}`}>Email me</a>{settings.booking_url&&<a href={settings.booking_url}>Book a call</a>}</p>
   </section>
   <section id="projects" aria-labelledby="projects-heading"><h2 id="projects-heading">Projects</h2>
    {ordered.length?<ul className={styles.entries}>{ordered.map(project=>{
     const story=projectStory(project);
     return <li key={project.id}><h3><Link href={`/projects/${project.slug}`} prefetch={false}>{story.title}</Link></h3><p>{story.summary}</p><p className={styles.links}>{projectLinks(project).map(link=><a href={link.href} key={`${link.kind}-${link.href}`}>{link.label}</a>)}</p></li>;
    })}</ul>:<p>No projects published yet.</p>}
   </section>
   {groups.length>0&&<section aria-labelledby="skills-heading"><h2 id="skills-heading">Skills</h2><dl className={styles.skills}>{groups.map(([category,names])=><div key={category}><dt>{category}</dt><dd>{names.join(', ')}</dd></div>)}</dl></section>}
   <section id="writing" aria-labelledby="writing-heading"><h2 id="writing-heading">Writing</h2>
    {posts.length>0&&<ul className={styles.entries}>{posts.map(post=><li key={post.slug}><h3><Link href={`/blog/${post.slug}`} prefetch={false}>{post.title}</Link></h3><p>{post.excerpt}</p></li>)}</ul>}
    <p className={styles.links}><Link href="/blog" prefetch={false}>All articles</Link><a href="https://substack.com/@kimtsok">Substack</a></p>
   </section>
   {personal.length>0&&<section aria-labelledby="beyond-heading"><h2 id="beyond-heading">Beyond code</h2><ul className={styles.entries}>{personal.map(item=><li key={item.id}><h3>{item.title}</h3><p>{item.description}</p>{item.link&&<p><a href={item.link}>{item.link_label||'Take a look'}</a></p>}</li>)}</ul>{!personal.some(item=>item.link==='/photography')&&<p><Link href="/photography" prefetch={false}>Photography collection</Link></p>}</section>}
   <section id="contact" aria-labelledby="contact-heading"><h2 id="contact-heading">Get in touch</h2><p><a href={`mailto:${site.email}`}>{site.email}</a></p><p className={styles.links}>{socials.filter(profile=>['GitHub','X / Twitter'].includes(profile.label)).map(profile=><a key={profile.label} href={profile.href}>{profile.label==='X / Twitter'?'Twitter':profile.label}</a>)}</p><p><Link href="/business" prefetch={false}>Are you a business?</Link></p></section>
  </main>
  <footer className={styles.footer}><Link href="/" prefetch={false}>Back to the full version</Link><span>© {new Date().getFullYear()} {site.fullName}</span></footer>
 </div></div>;
}
