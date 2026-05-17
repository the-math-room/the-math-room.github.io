import { fetchPortfolioConfig } from './loader.js';
import { validatePortfolioData } from '../core/validation.js';
import { renderProjectCard } from './ui/templates.js';
import { escapeHtml } from '../core/security.js';

function setDOMText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setDOMHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = value;
  }
}

async function boot() {
  try {
    const rawData = await fetchPortfolioConfig("./projects.json");
    validatePortfolioData(rawData);

    setDOMText("#site-title", rawData.title);
    setDOMText("#site-subtitle", rawData.subtitle);
    if (rawData.pageTitle) {
      document.title = rawData.pageTitle;
    }

    const cardElementsLayout = rawData.projects.map(renderProjectCard).join("");
    setDOMHtml("#project-grid", cardElementsLayout);
    
    setDOMText("#status", "");
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    setDOMHtml(
      "#status", 
      `<strong>Could not load portfolio directory.</strong><br>${escapeHtml(errorMessage)}`
    );
  }
}

window.addEventListener("DOMContentLoaded", boot);