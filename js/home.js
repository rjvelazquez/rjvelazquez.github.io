import { cases, profile, repositories } from '../data/portfolio-data.js';
import { initSite, renderCases } from './site.js';

initSite();

document.querySelectorAll('[data-repo-count]').forEach((element) => {
  element.textContent = String(repositories.length);
});

const projectGrid = document.querySelector('[data-featured-projects]');
if (projectGrid) {
  renderCases(projectGrid, cases.filter((project) => project.featured).slice(0, 10), { compact: true });
}

const skillsGrid = document.querySelector('[data-skill-groups]');
if (skillsGrid) {
  const fragment = document.createDocumentFragment();
  profile.skillGroups.forEach((group) => {
    const article = document.createElement('article');
    article.className = 'skill-card';

    const title = document.createElement('h3');
    title.textContent = group.title;

    const list = document.createElement('ul');
    list.className = 'tag-list tag-list--skills';
    group.items.forEach((skill) => {
      const item = document.createElement('li');
      item.textContent = skill;
      list.append(item);
    });

    article.append(title, list);
    fragment.append(article);
  });
  skillsGrid.replaceChildren(fragment);
}

const experienceList = document.querySelector('[data-experience-list]');
if (experienceList) {
  const fragment = document.createDocumentFragment();
  profile.experience.slice(0, 5).forEach((experience) => {
    const article = document.createElement('article');
    article.className = 'timeline-item';

    const period = document.createElement('p');
    period.className = 'timeline-item__period';
    period.textContent = experience.period;

    const content = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = experience.company;
    const role = document.createElement('p');
    role.className = 'timeline-item__role';
    role.textContent = `${experience.role} · ${experience.location}`;
    const summary = document.createElement('p');
    summary.textContent = experience.summary;
    content.append(title, role, summary);

    article.append(period, content);
    fragment.append(article);
  });
  experienceList.replaceChildren(fragment);
}
