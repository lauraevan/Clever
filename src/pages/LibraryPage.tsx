import { useMemo, useState } from "react";
import { ResourceGrid } from "../components/ResourceGrid";
import { ResourceTile } from "../components/ResourceTile";
import { CloseIcon, LongArrowLeftIcon, SearchIcon } from "../lib/icons";
import { resources } from "../data/apps";
import type { Resource } from "../data/types";
import type { TileSize } from "../components/ResourceTile";
import "./LibraryPage.css";

interface Props {
  onBack: () => void;
  onOpenResource: (resource: Resource) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  tileSize: TileSize;
}

/** Subject groupings the library filters by, matched against app ids. */
const CATEGORIES: Array<{ id: string; label: string; ids: string[] }> = [
  {
    id: "reading",
    label: "Reading and writing",
    ids: [
      "lexia-core5", "capti-voice", "raz-kids", "reading-a-z", "myon", "epic-books",
      "newsela", "commonlit", "readworks", "flocabulary", "achieve3000", "starfall",
      "storyline-online", "accelerated-reader", "wonders", "scholastic", "freckle",
      "scholastic-news", "sora", "destiny-discover", "pebblego",
    ],
  },
  {
    id: "math",
    label: "Math",
    ids: [
      "ixl", "i-ready", "zearn", "prodigy", "dreambox", "st-math", "reflex-math",
      "xtramath", "first-in-math", "sumdog", "happy-numbers", "math-playground",
      "desmos", "greg-tang-math", "khan-academy",
    ],
  },
  {
    id: "science",
    label: "Science and social studies",
    ids: [
      "mystery-science", "generation-genius", "brainpop", "legends-of-learning",
      "gizmos", "discovery-education", "natgeo-kids", "wonderopolis",
      "studies-weekly", "google-earth",
    ],
  },
  {
    id: "create",
    label: "Create and present",
    ids: [
      "canva", "book-creator", "wevideo", "flip", "padlet", "wakelet",
      "screencastify", "google-docs", "google-slides", "google-sheets",
      "google-forms", "google-keep", "google-drive",
    ],
  },
  {
    id: "practice",
    label: "Practice and review",
    ids: [
      "quizlet", "kahoot", "quizizz", "blooket", "gimkit", "edpuzzle",
      "formative", "classdojo", "nearpod", "pear-deck", "seesaw",
    ],
  },
  {
    id: "computing",
    label: "Computing and keyboarding",
    ids: ["code-org", "scratch", "tynker", "typing-club", "typing-com"],
  },
  {
    id: "languages",
    label: "World languages",
    ids: ["duolingo", "rosetta-stone", "imagine-learning", "abcmouse", "adventure-academy"],
  },
  {
    id: "accessibility",
    label: "Reading support",
    ids: ["immersive-reader", "read-write", "snap-read", "bookshare", "learning-ally"],
  },
];

/**
 * The Clever Library: everything the district has made available, browsable by
 * subject and searchable, rather than only the apps pinned to the portal.
 */
export function LibraryPage({
  onBack,
  onOpenResource,
  isFavorite,
  onToggleFavorite,
  tileSize,
}: Props) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const selected = CATEGORIES.find((entry) => entry.id === category);

    return resources.filter((resource) => {
      if (selected && !selected.ids.includes(resource.id)) return false;
      if (needle && !resource.title.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <main className="library" tabIndex={-1}>
      <button type="button" className="button-reset library__back" onClick={onBack}>
        <LongArrowLeftIcon size="0.875rem" />
        Back to portal
      </button>

      <header className="library__header">
        <h1 className="library__title">Clever Library</h1>
        <p className="library__subtitle">
          Every app Lincoln Unified has made available to 5th grade. Select the heart on any app to
          keep it in your Favorites.
        </p>
      </header>

      <div className="library__controls">
        <div className="library__search">
          <SearchIcon size="0.875rem" className="library__search-icon" />
          <input
            type="search"
            className="library__search-input"
            placeholder="Search the library"
            aria-label="Search the library"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              className="button-reset library__search-clear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <CloseIcon size="0.75rem" />
            </button>
          ) : null}
        </div>

        <div className="library__categories" role="group" aria-label="Filter by subject">
          <button
            type="button"
            className={
              category === null ? "library__chip library__chip--selected" : "library__chip"
            }
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
          >
            All apps
          </button>
          {CATEGORIES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={
                category === entry.id ? "library__chip library__chip--selected" : "library__chip"
              }
              aria-pressed={category === entry.id}
              onClick={() => setCategory(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      <p className="library__count" role="status">
        {visible.length} {visible.length === 1 ? "app" : "apps"}
      </p>

      <ResourceGrid
        isEmpty={visible.length === 0}
        empty={`Nothing in the library matches “${query.trim()}”.`}
      >
        {visible.map((resource) => (
          <ResourceTile
            key={resource.id}
            title={resource.title}
            icon={resource.icon}
            size={tileSize}
            target={resource.target}
            onActivate={() => onOpenResource(resource)}
            favorite={isFavorite(resource.id)}
            onToggleFavorite={() => onToggleFavorite(resource.id)}
          />
        ))}
      </ResourceGrid>
    </main>
  );
}
