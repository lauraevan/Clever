/**
 * Artwork specs for the demo portal's application icons.
 *
 * `slug` entries pull the official brand mark and official brand hex straight
 * out of the `simple-icons` package, so those tiles use real logo geometry.
 * `letter` entries cover products simple-icons does not carry; they are drawn
 * as brand-coloured letterform tiles in the same square app-icon idiom Clever
 * shows in the portal, rather than as stand-in placeholder boxes.
 */

/** @typedef {{id: string, slug?: string, letter?: string, bg?: string, fg?: string, scale?: number, letterSize?: number, letterSpacing?: number}} IconSpec */

/** @type {IconSpec[]} */
export const iconSpecs = [
  // --- Real brand marks from simple-icons -------------------------------
  { id: "google-drive", slug: "googledrive", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-classroom", slug: "googleclassroom", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "google-docs", slug: "googledocs", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-slides", slug: "googleslides", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "gmail", slug: "gmail", bg: "#ffffff", fg: "brand", scale: 0.68 },
  { id: "google-meet", slug: "googlemeet", bg: "#ffffff", fg: "brand", scale: 0.68 },
  { id: "google-earth", slug: "googleearth", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "khan-academy", slug: "khanacademy", bg: "brand", fg: "#ffffff", scale: 0.58 },
  { id: "quizlet", slug: "quizlet", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "canvas", slug: "instructure", bg: "brand", fg: "#ffffff", scale: 0.58 },
  { id: "scratch", slug: "scratch", bg: "brand", fg: "#ffffff", scale: 0.58 },
  { id: "kahoot", slug: "kahoot", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "duolingo", slug: "duolingo", bg: "brand", fg: "#ffffff", scale: 0.6 },
  { id: "padlet", slug: "padlet", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "wikipedia", slug: "wikipedia", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "youtube", slug: "youtube", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "zoom", slug: "zoom", bg: "brand", fg: "#ffffff", scale: 0.58 },
  { id: "pearson", slug: "pearson", bg: "#ffffff", fg: "brand", scale: 0.72 },

  // --- Letterform tiles for products simple-icons does not carry --------
  { id: "schoology", letter: "S", bg: "#4a90c4", fg: "#ffffff", letterSize: 72 },
  { id: "ixl", letter: "IXL", bg: "#1e9e4a", fg: "#ffffff", letterSize: 38, letterSpacing: 1 },
  { id: "i-ready", letter: "iR", bg: "#00a44b", fg: "#ffffff", letterSize: 54 },
  { id: "newsela", letter: "n", bg: "#0c2340", fg: "#ffffff", letterSize: 78 },
  { id: "nearpod", letter: "N", bg: "#6a2ea0", fg: "#ffffff", letterSize: 70 },
  { id: "seesaw", letter: "S", bg: "#00c18a", fg: "#ffffff", letterSize: 72 },
  { id: "brainpop", letter: "BP", bg: "#f7941e", fg: "#ffffff", letterSize: 50 },
  { id: "typing-club", letter: "TC", bg: "#2f6fb0", fg: "#ffffff", letterSize: 50 },
  { id: "epic-books", letter: "E", bg: "#e5342a", fg: "#ffffff", letterSize: 74 },
  { id: "desmos", letter: "y=", bg: "#1a73e8", fg: "#ffffff", letterSize: 50 },
  { id: "code-org", letter: "{ }", bg: "#283c50", fg: "#ffffff", letterSize: 42 },
  { id: "library-catalog", letter: "LC", bg: "#8a5a3c", fg: "#ffffff", letterSize: 50 },
  { id: "student-handbook", letter: "SH", bg: "#474c5e", fg: "#ffffff", letterSize: 50 },
  { id: "lunch-menu", letter: "LM", bg: "#e8912d", fg: "#ffffff", letterSize: 50 },
  { id: "bus-routes", letter: "BR", bg: "#c6212e", fg: "#ffffff", letterSize: 50 },
  { id: "counseling", letter: "C", bg: "#29c6c1", fg: "#ffffff", letterSize: 74 },
  { id: "tech-helpdesk", letter: "?", bg: "#686f88", fg: "#ffffff", letterSize: 74 },
];
