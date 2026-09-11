/** Shared shapes for the portal's content. */

/** Which portal section a resource is filed under. */
export type SectionId =
  | "teacher-pages"
  | "favorites"
  | "classroom-resources"
  | "school-resources"
  | "district-resources"
  | "clever-library";

/** Sections that hold applications rather than Teacher Pages or favourites. */
export type ResourceSectionId = Exclude<SectionId, "favorites" | "teacher-pages">;

/** How a resource behaves when a student clicks it. */
export type ResourceTarget =
  /** Opens a mock single-sign-on screen inside the replica. */
  | { kind: "demo" }
  /** Opens a real public site in a new tab. */
  | { kind: "external"; href: string }
  /** Shows Clever's "not available" treatment. */
  | { kind: "unavailable"; reason: string };

export interface Resource {
  id: string;
  title: string;
  /** Path to square icon artwork under public/app-icons/. */
  icon: string;
  section: ResourceSectionId;
  target: ResourceTarget;
  /** Optional metadata line Clever shows beneath a tile's title. */
  notes?: string;
  /** Shows Clever's red notification dot on the tile. */
  notify?: boolean;
}

export interface TeacherPageResource {
  id: string;
  title: string;
  /** Either a bundled app icon or a plain link rendered with a link glyph. */
  icon?: string;
  target: ResourceTarget;
  notes?: string;
}

export interface TeacherPageSection {
  id: string;
  title: string;
  resources: TeacherPageResource[];
}

export interface TeacherPage {
  id: string;
  /** Display name, e.g. "Ms. Mangan's Class". */
  title: string;
  /** Teacher's name as shown beneath the tile and on the page. */
  teacher: string;
  subtitle: string;
  /** Monogram used for the avatar. */
  initials: string;
  /** Avatar background, drawn from Clever's accent palette. */
  color: string;
  sections: TeacherPageSection[];
}

export interface PortalNotification {
  id: string;
  title: string;
  body: string;
  /** Human-readable relative timestamp, e.g. "2 days ago". */
  timestamp: string;
  unread: boolean;
}
