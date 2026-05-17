// Automatically derives the root path relative to where this file lives.
// If file is at: http://localhost:5500/src/shell/ui/global-nav.js
// This pops back three folders to get: http://localhost:5500/
const baseUrl = new URL('../../../', import.meta.url).href;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* ... styles stay exactly the same ... */
  </style>
  <a href="${baseUrl}" class="back-link">
    <span class="arrow">←</span>
    <span>Back to Projects</span>
  </a>
`;

class PortfolioNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('portfolio-nav', PortfolioNav);