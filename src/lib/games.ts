/**
 * The Study Hall game catalog, imported from lauraevan/greatestgreatest-revive
 * by `npm run import:games`.
 *
 * The catalog is about 1.6 MB, so it is loaded on demand rather than bundled
 * into the portal's main chunk. Icons and launcher pages are served from the
 * source repository through jsDelivr.
 */
export interface Game {
  id: string;
  title: string;
  /** Upstream collection the game came from. */
  source: string;
  url: string;
  icon: string | null;
}

export interface GameCatalog {
  repository: string;
  /** Images come from jsDelivr; game pages need a host that serves HTML. */
  iconCdn: string;
  pageCdn: string;
  /** Date the catalog was imported, as YYYY-MM-DD. */
  importedAt: string;
  sources: string[];
  games: Game[];
}

let pending: Promise<GameCatalog> | null = null;

export function loadGames(): Promise<GameCatalog> {
  pending ??= import("../data/games.json").then(
    (module) => module.default as unknown as GameCatalog,
  );
  return pending;
}

/** Sources are free text, so they need escaping before use as an element id. */
export function sourceSectionId(source: string): string {
  return `source-${source.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
