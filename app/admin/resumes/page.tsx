import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {adminSession} from '@/lib/admin';
import {resumeFiles} from '@/lib/resume-files';
import resumes from '@/lib/resumes.json';
import styles from '@/app/resume/resume.module.css';

export const metadata: Metadata = {title:'Résumé downloads', robots:{index:false, follow:false}};

export default async function AdminResumes() {
  if (!await adminSession()) redirect('/admin/login');
  return <div className="cms-shell">
    <header className="cms-top"><div><Link href="/admin" className="cms-brand">♠ Kim Tsok</Link><p>Portfolio studio</p></div><Link href="/admin">Back to content</Link></header>
    <main className="cms-main">
      <div className="cms-heading"><div><h1>Résumés</h1><p>The full-stack PDF is public. Word files and the frontend résumé require admin sign-in.</p></div></div>
      <div className={styles.downloads}>{resumes.versions.map(version => <article key={version.id}>
        <h2>{version.title}</h2><p>{version.audience}</p>
        <div>{resumeFiles.filter(file => file.title === version.title).map(file => <a key={file.filename} href={file.href} download>{file.format === 'pdf' ? 'Download PDF' : 'Word (.docx)'}</a>)}</div>
      </article>)}</div>
    </main>
  </div>;
}
