/** Shared shapes for the demo portal's content. */

/** Which portal section a resource is filed under. */
export type SectionId =
  | "teacher-pages"
  | "favorites"
  | "classroom-resources"
  | "district-resources"
  | "applications";

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
  section: Exclude<SectionId, "favorites" | "teacher-pages">;
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
  /** Display name, e.g. "Mrs. Johnson's Page". */
  title: string;
  /** Teacher's name as shown on the page itself. */
  teacher: string;
  subtitle: string;
  /** Two-letter monogram used for the avatar. */
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
