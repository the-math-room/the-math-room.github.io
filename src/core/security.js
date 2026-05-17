/**
 * Safely escapes harmful characters to block basic HTML element injection.
 */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates links to prevent protocol-level cross-site scripting execution.
 */
export function sanitizeUrl(url) {
  const cleaned = String(url ?? "").trim();
  
  if (/^(javascript:|data:|vbscript:)/i.test(cleaned)) {
    return "#";
  }
  
  return cleaned;
}