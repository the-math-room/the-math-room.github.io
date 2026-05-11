async function loadProjects() {
  const response = await fetch("./projects.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load projects.json: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTags(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return "";
  }

  return `
    <div class="project-tags">
      ${tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
}

function renderProject(project) {
  return `
    <a class="project-card" href="${escapeHtml(project.url)}">
      <div>
        <h2 class="project-card__title">${escapeHtml(project.title)}</h2>
        <p class="project-card__description">${escapeHtml(project.description)}</p>
        ${renderTags(project.tags)}
      </div>
      <div class="project-card__footer">Open →</div>
    </a>
  `;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = value;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.innerHTML = value;
}

function validateProjects(data) {
  if (!data || typeof data !== "object") {
    throw new Error("projects.json must contain an object.");
  }

  if (!Array.isArray(data.projects)) {
    throw new Error("projects.json must contain a projects array.");
  }
}

async function boot() {
  try {
    const data = await loadProjects();
    validateProjects(data);

    setText("#site-title", data.title || "Projects");
    setText("#site-subtitle", data.subtitle || "A collection of web projects.");
    document.title = data.pageTitle || data.title || "Projects";

    setHtml("#project-grid", data.projects.map(renderProject).join(""));
    setText("#status", "");
  } catch (error) {
    console.error(error);
    setHtml("#status", `<strong>Could not load projects.</strong><br>${escapeHtml(error.message)}`);
  }
}

boot();