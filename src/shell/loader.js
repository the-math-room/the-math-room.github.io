/**
 * Executes an HTTP fetch request to load the portfolio database.
 */
export async function fetchPortfolioConfig(url) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load resource: ${response.status} ${response.statusText}`);
  }

  return response.json();
}