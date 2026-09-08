import { cases, profile } from '../data/portfolio-data.js';
import { initSite } from './site.js';

initSite();

const printButton = document.querySelector('[data-print-cv]');
printButton?.addEventListener('click', () => window.print());

const contact = document.querySelector('[data-cv-contact]');
if (contact) {
  const items = [
    [profile.email, `mailto:${profile.email}`],
    [profile.phone, `tel:${profile.phoneHref}`],
    ['LinkedIn', profile.linkedin],
    ['GitHub', profile.github],
    [profile.location, '']
  ];

  items.forEach(([label, href]) => {
    const item = document.createElement('li');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      item.append(link);
    } else {
      item.textContent = label;
    }
    contact.append(item);
  });
}

const experienceList = document.querySelector('[data-cv-experience]');
profile.experience.forEach((experience) => {
  const article = document.createElement('article');
  article.className = 'cv-entry';
  article.innerHTML = `
    <div class="cv-entry__heading">
      <div>
        <h3></h3>
        <p class="cv-entry__role"></p>
      </div>
      <p class="cv-entry__period"></p>
    </div>
    <p class="cv-entry__summary"></p>`;
  article.querySelector('h3').textContent = experience.company;
  article.querySelector('.cv-entry__role').textContent = `${experience.role} · ${experience.location}`;
  article.querySelector('.cv-entry__period').textContent = experience.period;
  article.querySelector('.cv-entry__summary').textContent = experience.summary;
  experienceList.append(article);
});

const selectedProjectIds = ['vamonos', 'fast-sport-timing', 'multi-platform-pr', 'vig-mortgage', 'vale-pintos', 'brytiago', 'pixeo'];
const projectList = document.querySelector('[data-cv-projects]');
cases.filter((project) => selectedProjectIds.includes(project.id)).forEach((project) => {
  const article = document.createElement('article');
  article.className = 'cv-project';
  const title = document.createElement('h3');
  title.textContent = project.name;
  const summary = document.createElement('p');
  summary.textContent = project.summary;
  const tech = document.createElement('p');
  tech.className = 'cv-project__tech';
  tech.textContent = project.stack.slice(0, 5).join(' · ');
  article.append(title, summary, tech);
  projectList.append(article);
});

const skills = document.querySelector('[data-cv-skills]');
profile.skillGroups.forEach((group) => {
  const section = document.createElement('section');
  section.className = 'cv-skill-group';
  const title = document.createElement('h3');
  title.textContent = group.title;
  const body = document.createElement('p');
  body.textContent = group.items.join(' · ');
  section.append(title, body);
  skills.append(section);
});

const education = document.querySelector('[data-cv-education]');
profile.education.forEach((item) => {
  const entry = document.createElement('article');
  entry.className = 'cv-education';
  const title = document.createElement('h3');
  title.textContent = item.institution;
  const body = document.createElement('p');
  body.textContent = `${item.degree} · ${item.period}`;
  entry.append(title, body);
  education.append(entry);
});

document.querySelector('[data-cv-languages]').textContent = profile.languages.join(' · ');
document.querySelector('[data-cv-courses]').textContent = profile.courses.join(' · ');
