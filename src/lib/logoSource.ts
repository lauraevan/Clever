import realIcons from "../data/realIcons.json";

/**
 * Where the portal gets an application's real logo.
 *
 * Most of the products in a school portal are K-12 education vendors, and their
 * logos are not redistributable through any package: `simple-icons` and the SVG
 * Logos collection are both developer-tool oriented and carry almost none of
 * them. So for those apps the portal asks the web for the logo the vendor
 * actually publishes, and falls back to the bundled tile if that fails.
 *
 * Three ways to change this, in `LOGO_SERVICE` below:
 *
 *   "google"      Google's favicon service. Best coverage and the largest
 *                 renditions, so it is the default. Sends one request per app
 *                 to google.com.
 *   "duckduckgo"  DuckDuckGo's icon service. No Google requests; renditions are
 *                 usually smaller.
 *   "off"         No outside requests at all. Every tile uses bundled artwork.
 *
 * To bake real logos in permanently instead — no runtime requests, and the
 * files committed to the repository — run `npm run fetch:logos`, which writes
 * them into assets/app-icons/ for the icon generator to pick up. After that the
 * service is only a fallback for anything it could not download.
 */
export type LogoService = "google" | "duckduckgo" | "off";

export const LOGO_SERVICE: LogoService = "google";

const REAL_ARTWORK = new Set<string>(realIcons.ids);

/** True when the bundled tile is already the genuine mark. */
export function hasBundledLogo(id: string): boolean {
  return REAL_ARTWORK.has(id);
}

/** Reduces a product URL to the host a logo service expects. */
export function domainFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * URL for a product's published logo, or null when the portal should just use
 * the bundled tile.
 */
export function logoUrl(domain: string | null | undefined, size = 128): string | null {
  if (!domain || LOGO_SERVICE === "off") return null;

  if (LOGO_SERVICE === "duckduckgo") {
    return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
  }

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
}
