document.documentElement.classList.add('js');

const externalIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
    <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </svg>`;

export function initSite() {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      links.toggleAttribute('data-open', !isOpen);
    });

    links.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.removeAttribute('data-open');
      }
    });
  }

  if ('serviceWorker' in navigator && ['https:', 'http:'].includes(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // El sitio sigue funcionando sin modo offline.
      });
    });
  }
}

export function createCaseCard(project, { compact = false } = {}) {
  const article = document.createElement('article');
  article.className = `project-card${compact ? ' project-card--compact' : ''}`;
  article.dataset.categories = project.categories.join(' ');
  article.dataset.projectId = project.id;

  const media = document.createElement('div');
  media.className = 'project-card__media';

  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.imageCaption || (project.imageType === 'cover' ? `Portada ilustrativa de ${project.name}` : `Interfaz del proyecto ${project.name}`);
    image.width = 1440;
    image.height = 900;
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
    if (project.imageCaption) {
      const caption = document.createElement('p');
      caption.className = 'project-card__caption';
      caption.textContent = project.imageCaption;
      media.append(caption);
    }
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = `project-visual project-visual--${project.visual || 'default'}`;
    placeholder.setAttribute('aria-label', `Portada gráfica de ${project.name}`);

    const initials = document.createElement('span');
    initials.className = 'project-visual__mark';
    initials.textContent = project.name
      .split(/\s+/)
      .slice(0, 3)
      .map((word) => word[0])
      .join('');

    const label = document.createElement('span');
    label.className = 'project-visual__label';
    label.textContent = project.kicker;
    placeholder.append(initials, label);
    media.append(placeholder);
    if (project.imageCaption) {
      const caption = document.createElement('p');
      caption.className = 'project-card__caption';
      caption.textContent = project.imageCaption;
      media.append(caption);
    }
  }

  const status = document.createElement('span');
  status.className = 'status-chip';
  status.textContent = project.status;
  media.append(status);

  const body = document.createElement('div');
  body.className = 'project-card__body';

  const kicker = document.createElement('p');
  kicker.className = 'eyebrow eyebrow--small';
  kicker.textContent = project.kicker;

  const title = document.createElement('h3');
  title.textContent = project.name;

  const summary = document.createElement('p');
  summary.className = 'project-card__summary';
  summary.textContent = project.summary;

  const role = document.createElement('p');
  role.className = 'project-card__role';
  role.innerHTML = '<strong>Rol:</strong> ';
  role.append(document.createTextNode(project.role));

  const tags = document.createElement('ul');
  tags.className = 'tag-list';
  tags.setAttribute('aria-label', `Tecnologías de ${project.name}`);
  project.stack.slice(0, compact ? 4 : 6).forEach((technology) => {
    const item = document.createElement('li');
    item.textContent = technology;
    tags.append(item);
  });

  const footer = document.createElement('div');
  footer.className = 'project-card__footer';

  if (project.url) {
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `${project.url.includes('github.com') ? 'Ver código' : 'Ver proyecto'} ${externalIcon}`;
    footer.append(link);
  } else {
    const privateLabel = document.createElement('span');
    privateLabel.className = 'text-link text-link--muted';
    privateLabel.textContent = 'Caso sin enlace público';
    footer.append(privateLabel);
  }

  if (project.links?.length) {
    project.links.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'text-link text-link--secondary';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.label;
      footer.append(link);
    });
  }

  body.append(kicker, title, summary, role, tags, footer);
  article.append(media, body);
  return article;
}

export function renderCases(container, projects, options) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => fragment.append(createCaseCard(project, options)));
  container.replaceChildren(fragment);
}

export function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
}
