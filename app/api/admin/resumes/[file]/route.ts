import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {NextResponse} from 'next/server';
import {adminSession} from '@/lib/admin';
import {privateResumeFile} from '@/lib/resume-files';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const privateHeaders = {'Cache-Control':'private, no-store', 'X-Robots-Tag':'noindex, nofollow', 'X-Content-Type-Options':'nosniff'};

export async function GET(_request: Request, {params}: {params: Promise<{file: string}>}) {
  if (!await adminSession()) {
    return NextResponse.json({error:'Administrator sign-in required.'}, {status:401, headers:privateHeaders});
  }
  const file = privateResumeFile((await params).file);
  if (!file) return NextResponse.json({error:'Résumé not found.'}, {status:404, headers:privateHeaders});
  try {
    const bytes = await readFile(path.join(process.cwd(), 'private/resumes', file.filename));
    return new Response(new Uint8Array(bytes), {headers:{
      ...privateHeaders,
      'Content-Type':file.format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition':`attachment; filename="${file.filename}"`,
    }});
  } catch {
    return NextResponse.json({error:'Résumé file unavailable.'}, {status:404, headers:privateHeaders});
  }
}
