type ProjectLinks = {
  link?: string | null;
  github_url?: string | null;
  custom_links?: { label: string; url: string | null }[] | null;
  card_link?: string | null;
};

export function projectCardLinkOptions(project: ProjectLinks) {
  return [
    ...(project.link ? [{ value: 'live', label: 'Live site', href: project.link }] : []),
    ...(project.github_url ? [{ value: 'github', label: 'GitHub', href: project.github_url }] : []),
    ...(project.custom_links ?? []).flatMap(link => link.url ? [{ value: `custom:${link.url}`, label: link.label, href: link.url }] : []),
  ];
}

export function projectCardLink(project: ProjectLinks) {
  if (project.card_link === 'none') return null;
  const options = projectCardLinkOptions(project);
  if (project.card_link && project.card_link !== 'auto') {
    return options.find(option => option.value === project.card_link) ?? null;
  }
  return options[0] ?? null;
}
