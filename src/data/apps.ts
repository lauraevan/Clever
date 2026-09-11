import type { Resource, ResourceSectionId, ResourceTarget } from "./types";

/**
 * The portal's applications.
 *
 * Sections mirror how a real Clever student portal is organised: the apps the
 * homeroom teacher assigned, then the school's shared apps, then the district's,
 * then the wider Clever Library. Icon artwork is generated into public/app-icons
 * by `npm run generate:app-icons`.
 */

const demo: ResourceTarget = { kind: "demo" };
const link = (href: string): ResourceTarget => ({ kind: "external", href });

/** Terser than repeating the shared fields on eighty-odd entries. */
function app(
  section: ResourceSectionId,
  id: string,
  title: string,
  target: ResourceTarget = demo,
  extra: Partial<Pick<Resource, "notes" | "notify" | "icon">> = {},
): Resource {
  return {
    id,
    title,
    icon: extra.icon ?? `/app-icons/${id}.svg`,
    section,
    target,
    notes: extra.notes,
    notify: extra.notify,
  };
}

// ===================================================================
// Classroom Resources — assigned to Ms. Mangan's 5th grade class
// ===================================================================
const classroom: Resource[] = [
  app("classroom-resources", "google-classroom", "Google Classroom", link("https://classroom.google.com"), { notify: true }),
  app("classroom-resources", "seesaw", "Seesaw"),
  app("classroom-resources", "ixl", "IXL", demo, { notes: "20 min daily" }),
  app("classroom-resources", "i-ready", "i-Ready"),
  app("classroom-resources", "lexia-core5", "Lexia Core5 Reading"),
  app("classroom-resources", "capti-voice", "Capti Voice"),
  app("classroom-resources", "zearn", "Zearn Math"),
  app("classroom-resources", "raz-kids", "Raz-Kids"),
  app("classroom-resources", "epic-books", "Epic!"),
  app("classroom-resources", "newsela", "Newsela"),
  app("classroom-resources", "mystery-science", "Mystery Science"),
  app("classroom-resources", "prodigy", "Prodigy Math"),
  app("classroom-resources", "xtramath", "XtraMath"),
  app("classroom-resources", "st-math", "ST Math"),
  app("classroom-resources", "nearpod", "Nearpod"),
  app("classroom-resources", "pear-deck", "Pear Deck"),
  app("classroom-resources", "google-docs", "Google Docs", link("https://docs.google.com")),
  app("classroom-resources", "google-slides", "Google Slides", link("https://slides.google.com")),
  app("classroom-resources", "google-drive", "Google Drive", link("https://drive.google.com")),
  app("classroom-resources", "clever-goals", "Clever Goals"),
];

// ===================================================================
// School Resources — shared across Lincoln Elementary
// ===================================================================
const school: Resource[] = [
  app("school-resources", "destiny-discover", "Destiny Discover"),
  app("school-resources", "sora", "Sora"),
  app("school-resources", "pebblego", "PebbleGo"),
  app("school-resources", "storyline-online", "Storyline Online"),
  app("school-resources", "scholastic-news", "Scholastic News"),
  app("school-resources", "studies-weekly", "Studies Weekly"),
  app("school-resources", "brainpop", "BrainPOP"),
  app("school-resources", "generation-genius", "Generation Genius"),
  app("school-resources", "gonoodle", "GoNoodle"),
  app("school-resources", "second-step", "Second Step"),
  app("school-resources", "quaver-music", "QuaverMusic"),
  app("school-resources", "open-phys-ed", "OPEN Phys Ed"),
  app("school-resources", "artsonia", "Artsonia"),
  app("school-resources", "accelerated-reader", "Accelerated Reader"),
  app("school-resources", "star-360", "Star 360"),
  app("school-resources", "lunch-menu", "Lunch Menu"),
  app("school-resources", "yearbook", "Yearbook"),
  app("school-resources", "library-catalog", "Library Catalog"),
];

// ===================================================================
// District Resources — Lincoln Unified
// ===================================================================
const district: Resource[] = [
  app("district-resources", "clever-badges", "Clever Badges"),
  app("district-resources", "powerschool", "PowerSchool"),
  app("district-resources", "map-growth", "MAP Growth"),
  app("district-resources", "edulastic", "Edulastic"),
  app("district-resources", "google-meet", "Google Meet", link("https://meet.google.com")),
  app("district-resources", "gmail", "Gmail", link("https://mail.google.com")),
  app("district-resources", "zoom", "Zoom", link("https://zoom.us")),
  app("district-resources", "student-handbook", "Student Handbook"),
  app("district-resources", "district-calendar", "District Calendar"),
  app("district-resources", "bus-routes", "Bus Routes"),
  app("district-resources", "counseling", "Counseling Center"),
  app("district-resources", "tech-helpdesk", "Technology Help Desk"),
  app("district-resources", "family-portal", "Family Portal"),
  app("district-resources", "acceptable-use", "Acceptable Use Policy"),
  app("district-resources", "immersive-reader", "Immersive Reader"),
  app("district-resources", "read-write", "Read&Write"),
  app("district-resources", "snap-read", "Snap&Read"),
  app("district-resources", "bookshare", "Bookshare"),
  app("district-resources", "learning-ally", "Learning Ally"),
];

// ===================================================================
// Clever Library — the wider catalog a student can open
// ===================================================================
const library: Resource[] = [
  // Reading and language arts
  app("clever-library", "reading-a-z", "Reading A-Z"),
  app("clever-library", "myon", "myON"),
  app("clever-library", "commonlit", "CommonLit"),
  app("clever-library", "readworks", "ReadWorks"),
  app("clever-library", "flocabulary", "Flocabulary"),
  app("clever-library", "achieve3000", "Achieve3000"),
  app("clever-library", "starfall", "Starfall"),
  app("clever-library", "wonders", "Wonders"),
  app("clever-library", "scholastic", "Scholastic"),
  app("clever-library", "freckle", "Freckle"),

  // Mathematics
  app("clever-library", "khan-academy", "Khan Academy", link("https://www.khanacademy.org")),
  app("clever-library", "dreambox", "DreamBox Learning"),
  app("clever-library", "reflex-math", "Reflex Math"),
  app("clever-library", "first-in-math", "First In Math"),
  app("clever-library", "sumdog", "Sumdog"),
  app("clever-library", "happy-numbers", "Happy Numbers"),
  app("clever-library", "math-playground", "Math Playground"),
  app("clever-library", "greg-tang-math", "Greg Tang Math"),
  app("clever-library", "desmos", "Desmos", link("https://www.desmos.com/calculator")),

  // Science and social studies
  app("clever-library", "legends-of-learning", "Legends of Learning"),
  app("clever-library", "gizmos", "Gizmos"),
  app("clever-library", "discovery-education", "Discovery Education"),
  app("clever-library", "natgeo-kids", "Nat Geo Kids"),
  app("clever-library", "wonderopolis", "Wonderopolis"),
  app("clever-library", "google-earth", "Google Earth", link("https://earth.google.com")),

  // Create and present
  app("clever-library", "canva", "Canva for Education"),
  app("clever-library", "book-creator", "Book Creator"),
  app("clever-library", "wevideo", "WeVideo"),
  app("clever-library", "flip", "Flip"),
  app("clever-library", "padlet", "Padlet"),
  app("clever-library", "wakelet", "Wakelet"),
  app("clever-library", "screencastify", "Screencastify"),
  app("clever-library", "google-sheets", "Google Sheets", link("https://sheets.google.com")),
  app("clever-library", "google-forms", "Google Forms", link("https://forms.google.com")),

  // Practice and review
  app("clever-library", "quizlet", "Quizlet", link("https://quizlet.com")),
  app("clever-library", "kahoot", "Kahoot!", link("https://kahoot.com")),
  app("clever-library", "quizizz", "Quizizz"),
  app("clever-library", "blooket", "Blooket"),
  app("clever-library", "gimkit", "Gimkit"),
  app("clever-library", "edpuzzle", "Edpuzzle"),
  app("clever-library", "formative", "Formative"),
  app("clever-library", "classdojo", "ClassDojo"),

  // Computing and keyboarding
  app("clever-library", "code-org", "Code.org", link("https://code.org")),
  app("clever-library", "scratch", "Scratch", link("https://scratch.mit.edu")),
  app("clever-library", "tynker", "Tynker"),
  app("clever-library", "typing-club", "TypingClub"),
  app("clever-library", "typing-com", "Typing.com"),

  // World languages and early learning
  app("clever-library", "duolingo", "Duolingo", link("https://www.duolingo.com")),
  app("clever-library", "rosetta-stone", "Rosetta Stone"),
  app("clever-library", "imagine-learning", "Imagine Learning"),
  app("clever-library", "abcmouse", "ABCmouse"),
  app("clever-library", "adventure-academy", "Adventure Academy"),

  // Reference
  app("clever-library", "wikipedia", "Wikipedia", link("https://www.wikipedia.org")),
  app("clever-library", "youtube", "YouTube", link("https://www.youtube.com")),
  app(
    "clever-library",
    "canvas",
    "Canvas",
    { kind: "unavailable", reason: "Your school has not set up this app yet." },
  ),
];

export const resources: Resource[] = [...classroom, ...school, ...district, ...library];

export const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
