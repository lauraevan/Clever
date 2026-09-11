/**
 * Resolves a bundled asset path against the app's base URL.
 *
 * Icon paths are written as "/app-icons/x.svg" in the data files, which only
 * works when the app is served from a domain root. The build uses a relative
 * base so it can also be served from a sub-path (githack, GitHub Pages, a
 * folder), and this turns those paths into something that resolves either way.
 * Absolute URLs are passed straight through.
 */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}
