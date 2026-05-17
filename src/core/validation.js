/**
 * Validates structural integrity of downloaded configuration models.
 */
export function validatePortfolioData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Portfolio configuration data must be an object.");
  }

  // Win: Block missing metadata fields before they leak into the DOM
  if (typeof data.title !== "string" || typeof data.subtitle !== "string") {
    throw new Error("Portfolio configuration is missing a valid title or subtitle string.");
  }

  if (!("projects" in data) || !Array.isArray(data.projects)) {
    throw new Error("Portfolio data is missing a valid 'projects' array.");
  }
}