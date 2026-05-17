import { escapeHtml, sanitizeUrl } from '../../core/security.js';

function renderTag(tag) {
  return `<span class="project-tag">${escapeHtml(tag)}</span>`;
}

function renderTags(tags = []) {
  if (tags.length === 0) return "";

  return `
    <div class="project-tags">
      ${tags.map(renderTag).join("")}
    </div>
  `;
}

export function renderProjectCard(project) {
  const safeUrl = escapeHtml(sanitizeUrl(project.url));
  
  return `
    <li class="project-card-wrapper">
      <article class="project-card">
        <div class="project-card__body">
          <h2 class="project-card__title">
            <a class="project-card__link" href="${safeUrl}">${escapeHtml(project.title)}</a>
          </h2>
          <p class="project-card__description">${escapeHtml(project.description)}</p>
          ${renderTags(project.tags)}
        </div>
        <div class="project-card__footer" aria-hidden="true">
          <span>Open project</span>
          <span class="project-card__arrow">→</span>
        </div>
      </article>
    </li>
  `;
}