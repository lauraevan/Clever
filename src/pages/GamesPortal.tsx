import { useEffect, useMemo, useState } from "react";
import { ResourceGrid } from "../components/ResourceGrid";
import { ResourceTile } from "../components/ResourceTile";
import { Section } from "../components/Section";
import { CloseIcon, SearchIcon } from "../lib/icons";
import { loadGames, sourceSectionId, type Game, type GameCatalog } from "../lib/games";
import type { TileSize } from "../components/ResourceTile";
import "./GamesPortal.css";

interface Props {
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onLock: () => void;
  tileSize: TileSize;
  /** Source the left nav last asked us to scroll to. */
  scrollTarget: string | null;
  onScrolled: () => void;
  onVisibleSourceChange: (source: string) => void;
  onSourcesLoaded: (sources: string[]) => void;
}

/** Tiles drawn per source before a "show all" is needed. */
const PAGE_SIZE = 24;

/** Distance below the bar at which a section counts as the current one. */
const HEADER_OFFSET = 72;

export function GamesPortal({
  isFavorite,
  onToggleFavorite,
  onLock,
  tileSize,
  scrollTarget,
  onScrolled,
  onVisibleSourceChange,
  onSourcesLoaded,
}: Props) {
  const [catalog, setCatalog] = useState<GameCatalog | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // The catalog is 1.6 MB, so it is split out of the main bundle.
  useEffect(() => {
    let cancelled = false;
    loadGames().then(
      (loaded) => {
        if (cancelled) return;
        setCatalog(loaded);
        onSourcesLoaded(loaded.sources);
      },
      () => {
        if (!cancelled) setFailed(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [onSourcesLoaded]);

  const bySource = useMemo(() => {
    if (!catalog) return [];
    return catalog.sources.map((source) => ({
      source,
      games: catalog.games.filter((game) => game.source === source),
    }));
  }, [catalog]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle || !catalog) return null;
    return catalog.games
      .filter((game) => game.title.toLowerCase().includes(needle))
      .slice(0, 240);
  }, [catalog, query]);

  useEffect(() => {
    if (!scrollTarget || !catalog) return;
    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    onScrolled();
  }, [scrollTarget, catalog, onScrolled]);

  // Keep the left nav's selected source in step with what's on screen.
  useEffect(() => {
    if (!catalog || matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".games section[id]"));
      const bandBottom = window.innerHeight * 0.4;
      const visible = sections.filter((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top < bandBottom && bottom > HEADER_OFFSET;
      });
      if (visible.length === 0) return;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atBottom ? visible[visible.length - 1] : visible[0];
      onVisibleSourceChange(current.id);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [catalog, matches, onVisibleSourceChange, expanded]);

  const renderTile = (game: Game) => (
    <ResourceTile
      key={game.id}
      title={game.title}
      icon={game.icon ?? "/app-icons/study-hall.svg"}
      iconId="study-hall"
      remoteIcon={game.icon !== null}
      size={tileSize}
      target={{ kind: "external", href: game.url }}
      onActivate={() => window.open(game.url, "_blank", "noopener,noreferrer")}
      favorite={isFavorite(game.id)}
      onToggleFavorite={() => onToggleFavorite(game.id)}
    />
  );

  return (
    <main className="games" tabIndex={-1}>
      <header className="games__header">
        <div>
          <h1 className="games__title">Study Hall</h1>
          <p className="games__subtitle">
            {catalog
              ? `${catalog.games.length.toLocaleString("en-US")} games across ${catalog.sources.length} collections`
              : "Loading the collection…"}
          </p>
        </div>
        <button type="button" className="games__lock" onClick={onLock}>
          Close Study Hall
        </button>
      </header>

      <div className="games__search">
        <SearchIcon size="0.875rem" className="games__search-icon" />
        <input
          type="search"
          className="games__search-input"
          placeholder="Search games"
          aria-label="Search games"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query ? (
          <button
            type="button"
            className="button-reset games__search-clear"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <CloseIcon size="0.75rem" />
          </button>
        ) : null}
      </div>

      {failed ? (
        <p className="games__empty">
          The game collection could not be loaded. Check your connection and reload.
        </p>
      ) : null}

      {!catalog && !failed ? <p className="games__empty">Loading…</p> : null}

      {catalog && matches ? (
        <Section id="search-results" title={`${matches.length} matching games`}>
          <ResourceGrid
            isEmpty={matches.length === 0}
            empty={`No games match “${query.trim()}”.`}
          >
            {matches.map(renderTile)}
          </ResourceGrid>
        </Section>
      ) : null}

      {catalog && !matches
        ? bySource.map(({ source, games }) => {
            const isExpanded = expanded[source];
            const shown = isExpanded ? games : games.slice(0, PAGE_SIZE);

            return (
              <Section
                key={source}
                id={sourceSectionId(source)}
                title={source}
                meta={`${games.length.toLocaleString("en-US")} games`}
                action={
                  games.length > PAGE_SIZE
                    ? {
                        label: isExpanded ? "Show fewer" : `Show all ${games.length}`,
                        onClick: () =>
                          setExpanded((current) => ({ ...current, [source]: !isExpanded })),
                      }
                    : undefined
                }
              >
                <ResourceGrid>{shown.map(renderTile)}</ResourceGrid>
              </Section>
            );
          })
        : null}

      {catalog ? (
        <p className="games__footnote">
          Imported from{" "}
          <a
            className="games__footnote-link"
            href={catalog.repository}
            target="_blank"
            rel="noreferrer"
          >
            lauraevan/greatestgreatest-revive
          </a>{" "}
          · catalog of {catalog.importedAt}
        </p>
      ) : null}
    </main>
  );
}
