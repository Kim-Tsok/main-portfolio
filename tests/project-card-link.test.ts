import {test} from 'node:test';
import assert from 'node:assert/strict';
import {projectCardLink} from '../lib/project-card-link';
import {validateContent} from '../lib/content-validation';

const project = {
  title: 'Game', slug: 'game', description: 'A game', category: 'Game', tech_stack: ['Unity'],
  link: 'https://example.com/', github_url: 'https://github.com/example/game',
  custom_links: [{label: 'itch.io', url: 'https://example.itch.io/game'}],
};

test('existing projects get a live site, GitHub or additional link automatically', () => {
  assert.equal(projectCardLink(project)?.label, 'Live site');
  assert.equal(projectCardLink({...project, link: null})?.label, 'GitHub');
  assert.equal(projectCardLink({...project, link: null, github_url: null})?.label, 'itch.io');
  assert.equal(projectCardLink({}), null);
});

test('explicit selections override automatic and can hide the extra link', () => {
  assert.equal(projectCardLink({...project, card_link: 'github'})?.href, project.github_url);
  assert.equal(projectCardLink({...project, card_link: `custom:${project.custom_links[0].url}`})?.label, 'itch.io');
  assert.equal(projectCardLink({...project, card_link: 'none'}), null);
  assert.equal(projectCardLink({...project, link: null, card_link: 'live'}), null);
});

test('card selection survives validation and reads back to the chosen destination', () => {
  for (const card_link of ['auto', 'none', 'live', 'github', `custom:${project.custom_links[0].url}`]) {
    const saved = validateContent('projects', {...project, card_link});
    assert.equal('card_link' in saved && saved.card_link, card_link);
    if ('card_link' in saved) assert.deepEqual(projectCardLink(saved), projectCardLink({...project, card_link}));
  }
});

test('rejects missing destinations and unsafe custom destinations', () => {
  assert.throws(() => validateContent('projects', {...project, link: '', card_link: 'live'}));
  assert.throws(() => validateContent('projects', {...project, card_link: 'custom:https://missing.example'}));
  assert.throws(() => validateContent('projects', {...project, card_link: 'custom:javascript:alert(1)'}));
});

test('custom link choices normalize with their URLs and survive link reordering', () => {
  const saved = validateContent('projects', {...project, card_link: 'custom:https://example.itch.io', custom_links: [{label: 'itch.io', url: 'https://example.itch.io'}]});
  assert.equal('card_link' in saved && saved.card_link, 'custom:https://example.itch.io/');
  if ('card_link' in saved) assert.equal(projectCardLink(saved)?.label, 'itch.io');
  assert.equal(projectCardLink({...project, card_link: `custom:${project.custom_links[0].url}`, custom_links: [{label:'Download',url:'https://example.com/download'}, ...project.custom_links]})?.label, 'itch.io');
});
