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
  /** Opens a page inside the portal, for things a school hosts itself. */
  | { kind: "page" }
  /** Opens the product's real site in a new tab. */
  | { kind: "external"; href: string }
  /** Shows Clever's "not available" treatment. */
  | { kind: "unavailable"; reason: string };

/** A block of content on a portal-hosted page. */
export type PageBlock =
  | { kind: "lead"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "ordered"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "links"; items: Array<{ label: string; href?: string; note?: string }> }
  | { kind: "callout"; tone: "info" | "warning"; text: string }
  | { kind: "definitions"; items: Array<{ term: string; description: string }> }
  /** The student's Clever Badge card. */
  | { kind: "badge" }
  /** Progress against the goals a teacher set. */
  | { kind: "goals" }
  /** The help desk's ticket form. */
  | { kind: "ticket-form" }
  /** Study Hall's access code form. */
  | { kind: "study-hall" };

export interface ResourcePageContent {
  /** Matches the resource id whose tile opens this page. */
  id: string;
  title: string;
  subtitle?: string;
  /** Breadcrumb-style label for where the page sits. */
  owner: string;
  blocks: PageBlock[];
}

export interface Resource {
  id: string;
  title: string;
  /** Path to square icon artwork under public/app-icons/. */
  icon: string;
  /** Product host, e.g. "ixl.com", used to load the vendor's published logo. */
  domain?: string;
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
  /** Product host, used to load the vendor's published logo. */
  domain?: string;
  /**
   * Portal page this link opens, when it is not the one named by `id`. Lets a
   * teacher link point at a page the district already publishes.
   */
  pageId?: string;
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
