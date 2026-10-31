import {test} from 'node:test';
import assert from 'node:assert/strict';
import {access, readdir} from 'node:fs/promises';
import {resumeFiles, privateResumeFile} from '../lib/resume-files';

test('only the full-stack PDF is stored in the public résumé directory', async () => {
  const files = await readdir(new URL('../public/resumes/', import.meta.url));
  assert.deepEqual(files.sort(), ['Kim-Tsok-Full-Stack-Engineer-Resume.pdf']);
  for (const file of resumeFiles.filter(file => !file.isPublic)) {
    await access(new URL(`../private/resumes/${file.filename}`, import.meta.url));
    assert.match(file.href, /^\/api\/admin\/resumes\//);
  }
});

test('private downloads reject unknown filenames and traversal paths', () => {
  for (const name of ['../../.env.local', '%2e%2e%2f.env.local', 'unknown.pdf', 'Kim-Tsok-Full-Stack-Engineer-Resume.pdf']) {
    assert.equal(privateResumeFile(name), undefined);
  }
  assert.equal(privateResumeFile('Kim-Tsok-Frontend-Engineer-Resume.docx')?.format, 'docx');
});
