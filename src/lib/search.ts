import { resources } from "../data/apps";
import { teacherPages } from "../data/teacherPages";
import { sectionTitles } from "../data/navigation";
import type { ResourceTarget } from "../data/types";

export type SearchResultKind = "resource" | "teacher-page" | "link";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  /** Where the item lives, shown as the result's second line. */
  context: string;
  icon?: string;
  /** Monogram fallback for teacher pages, which have no icon artwork. */
  initials?: string;
  color?: string;
  target: ResourceTarget | { kind: "teacher-page"; pageId: string };
}

/** Every searchable thing in the portal, flattened once at module load. */
const index: SearchResult[] = [
  ...resources.map<SearchResult>((resource) => ({
    id: `resource:${resource.id}`,
    kind: "resource",
    title: resource.title,
    context: sectionTitles[resource.section],
    icon: resource.icon,
    target: resource.target,
  })),
  ...teacherPages.map<SearchResult>((page) => ({
    id: `teacher-page:${page.id}`,
    kind: "teacher-page",
    title: page.title,
    context: `Teacher Page · ${page.subtitle}`,
    initials: page.initials,
    color: page.color,
    target: { kind: "teacher-page", pageId: page.id },
  })),
  ...teacherPages.flatMap<SearchResult>((page) =>
    page.sections.flatMap((section) =>
      section.resources.map((resource) => ({
        id: `link:${page.id}:${resource.id}`,
        kind: "link" as const,
        title: resource.title,
        context: `${page.title} · ${section.title}`,
        icon: resource.icon,
        target: resource.target,
      })),
    ),
  ),
];

/**
 * Matches on word starts first, then on any substring, so typing "goo" surfaces
 * "Google Drive" ahead of "Kahoot!".
 */
export function searchPortal(query: string, limit = 12): SearchResult[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const scored: Array<{ result: SearchResult; score: number }> = [];

  for (const result of index) {
    const title = result.title.toLowerCase();
    let score = -1;

    if (title === needle) score = 0;
    else if (title.startsWith(needle)) score = 1;
    else if (title.split(/[\s·:!.-]+/).some((word) => word.startsWith(needle))) score = 2;
    else if (title.includes(needle)) score = 3;
    else if (result.context.toLowerCase().includes(needle)) score = 4;

    if (score >= 0) scored.push({ result, score });
  }

  scored.sort((a, b) => a.score - b.score || a.result.title.localeCompare(b.result.title));
  return scored.slice(0, limit).map((entry) => entry.result);
}
