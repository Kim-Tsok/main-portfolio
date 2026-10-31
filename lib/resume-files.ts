import resumes from './resumes.json';

export const resumeFiles = resumes.versions.flatMap(version =>
  (['pdf', 'docx'] as const).map(format => {
    const filename = `${version.filename}.${format}`;
    const isPublic = version.id === 'fullstack' && format === 'pdf';
    return {
      filename,
      format,
      title: version.title,
      isPublic,
      href: isPublic ? `/resumes/${filename}` : `/api/admin/resumes/${filename}`,
    };
  }),
);

// Resolve only known private files; never use an incoming path as a disk path.
export function privateResumeFile(filename: string) {
  return resumeFiles.find(file => !file.isPublic && file.filename === filename);
}
