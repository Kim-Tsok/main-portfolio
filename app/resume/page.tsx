import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft,Download} from 'lucide-react';
import Header from '@/components/header';
import resumes from '@/lib/resumes.json';
import PrintButton from './print-button';
import styles from './resume.module.css';

export const metadata:Metadata={title:'Résumé',description:'Kim Tsok’s full-stack engineering résumé. Read online or download the PDF.',alternates:{canonical:'/resume'}};
export default function Resume(){
 const current=resumes.versions.find(version=>version.id==='fullstack')!;
 return <div className="portfolio-shell">
  <a href="#main" className="skip-link">Skip to content</a><Header/>
  <main id="main" className={`container-page ${styles.page}`}>
   <header className={styles.intro}><Link href="/" className="breadcrumb"><ArrowLeft size={14}/>Back home</Link><h1>Résumé.</h1><a className={styles.pdfDownload} href={`/resumes/${current.filename}.pdf`} download><Download size={16} aria-hidden="true"/>Download PDF</a></header>
   <article className={`resume-sheet ${styles.sheet}`} aria-label={`${current.title} résumé`}>
    <h1>{resumes.name}</h1><p className={styles.role}>{current.title} · {resumes.location}</p><p className={styles.contact}><a href={`mailto:${resumes.email}`}>{resumes.email}</a><a href={resumes.github}>GitHub</a><a href={resumes.linkedin}>LinkedIn</a></p>
    <h2>Profile</h2><p>{current.summary}</p>
    <h2>Skills</h2><ul>{current.skills.map(skill=><li key={skill}>{skill}</li>)}</ul>
    <h2>Experience</h2>{current.experience.map(job=><section key={job.organization} className={styles.entry}><div><h3>{job.role}</h3><span>{job.dates}</span></div><p>{job.organization}</p><ul>{job.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul></section>)}
    <h2>Selected projects</h2>{current.projects.map(project=><section key={project.name} className={styles.entry}><h3><a href={project.url}>{project.name}</a></h3><p>{project.stack}</p><ul>{project.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul></section>)}
    <h2>Education</h2><p>{resumes.education}</p><p>{resumes.educationDates}</p>
    <h2>Certification and award</h2><ul>{resumes.credentials.map(credential=><li key={credential}>{credential}</li>)}</ul>
    <div className={styles.print}><PrintButton/></div>
   </article>
  </main>
 </div>;
}
