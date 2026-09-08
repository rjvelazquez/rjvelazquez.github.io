import { cases, filters, repositories } from '../data/portfolio-data.js';
import { createCaseCard, initSite, normalizeSearch } from './site.js';

initSite();

const caseGrid = document.querySelector('[data-project-grid]');
const repoGrid = document.querySelector('[data-repository-grid]');
const searchInput = document.querySelector('[data-project-search]');
const filterContainer = document.querySelector('[data-project-filters]');
const resultCount = document.querySelector('[data-result-count]');
const caseCount = document.querySelector('[data-case-count]');
const repoCount = document.querySelector('[data-repo-count]');
const productionCount = document.querySelector('[data-production-count]');
const categoriesByProductId = new Map(cases.map((project) => [project.id, project.categories]));
let activeFilter = 'all';

if (caseCount) caseCount.textContent = String(cases.length);
if (repoCount) repoCount.textContent = String(repositories.length);
if (productionCount) productionCount.textContent = String(cases.filter((project) => project.categories.includes('production')).length);

function repositoryCategories(repository) {
  return categoriesByProductId.get(repository.productId) || [];
}

function createRepositoryCard(repository) {
  const article = document.createElement('article');
  article.className = 'repository-card';
  article.dataset.visibility = repository.visibility;

  const top = document.createElement('div');
  top.className = 'repository-card__top';

  const title = document.createElement('h3');
  title.textContent = repository.name;

  const status = document.createElement('span');
  status.className = `repo-status repo-status--${repository.visibility}`;
  status.textContent = repository.status;
  top.append(title, status);

  const product = document.createElement('p');
  product.className = 'repository-card__product';
  product.textContent = repository.product;

  const summary = document.createElement('p');
  summary.textContent = repository.summary;

  const tags = document.createElement('ul');
  tags.className = 'tag-list tag-list--small';
  repository.tech.slice(0, 5).forEach((technology) => {
    const item = document.createElement('li');
    item.textContent = technology;
    tags.append(item);
  });

  article.append(top, product, summary, tags);

  if (repository.url) {
    const link = document.createElement('a');
    link.className = 'text-link repository-card__link';
    link.href = repository.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Abrir en GitHub ↗';
    article.append(link);
  }

  return article;
}

function matchesCase(project, query) {
  const searchable = normalizeSearch([
    project.name,
    project.kicker,
    project.summary,
    project.role,
    project.status,
    project.stack.join(' '),
    project.categories.join(' ')
  ].join(' '));
  const filterMatches = activeFilter === 'all' || project.categories.includes(activeFilter);
  return filterMatches && searchable.includes(query);
}

function matchesRepository(repository, query) {
  const searchable = normalizeSearch([
    repository.name,
    repository.product,
    repository.summary,
    repository.status,
    repository.tech.join(' '),
    repositoryCategories(repository).join(' ')
  ].join(' '));
  const filterMatches =
    activeFilter === 'all' ||
    (activeFilter === 'private' && repository.visibility === 'private') ||
    (activeFilter === 'production' && repositoryCategories(repository).includes('production')) ||
    repositoryCategories(repository).includes(activeFilter);
  return filterMatches && searchable.includes(query);
}

function render() {
  const query = normalizeSearch(searchInput?.value || '');
  const visibleCases = cases.filter((project) => matchesCase(project, query));
  const visibleRepositories = repositories.filter((repository) => matchesRepository(repository, query));

  const caseFragment = document.createDocumentFragment();
  visibleCases.forEach((project) => caseFragment.append(createCaseCard(project)));
  caseGrid.replaceChildren(caseFragment);

  const repoFragment = document.createDocumentFragment();
  visibleRepositories.forEach((repository) => repoFragment.append(createRepositoryCard(repository)));
  repoGrid.replaceChildren(repoFragment);

  resultCount.textContent = `${visibleCases.length} ${visibleCases.length === 1 ? "caso" : "casos"} · ${visibleRepositories.length} ${visibleRepositories.length === 1 ? "repositorio" : "repositorios"}`;
  document.querySelector('[data-empty-state]').hidden = visibleCases.length + visibleRepositories.length > 0;
}

filters.forEach(([value, label]) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'filter-button';
  button.dataset.filter = value;
  button.setAttribute('aria-pressed', String(value === activeFilter));
  button.textContent = label;
  button.addEventListener('click', () => {
    activeFilter = value;
    filterContainer.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    render();
  });
  filterContainer.append(button);
});

searchInput?.addEventListener('input', render);
render();
