import type { Resource, ResourceSectionId, ResourceTarget } from "./types";

/**
 * The portal's applications.
 *
 * Sections mirror how a real Clever student portal is organised: the apps the
 * homeroom teacher assigned, then the school's shared apps, then the district's,
 * then the wider Clever Library.
 *
 * Application tiles open the product's real site, the way the portal's single
 * sign-on would land you there. Tiles for things a school hosts itself — the
 * handbook, the lunch menu, bus routes, the help desk — open a page inside the
 * portal instead, because that is where they live in a real deployment too.
 */

const page: ResourceTarget = { kind: "page" };
const at = (href: string): ResourceTarget => ({ kind: "external", href });

/** Host a logo service can look the product up by. */
function domainOf(target: ResourceTarget): string | undefined {
  if (target.kind !== "external") return undefined;
  try {
    return new URL(target.href).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Terser than repeating the shared fields on a hundred-odd entries. */
function app(
  section: ResourceSectionId,
  id: string,
  title: string,
  target: ResourceTarget,
  extra: Partial<Pick<Resource, "notes" | "notify" | "icon" | "domain">> = {},
): Resource {
  return {
    id,
    title,
    icon: extra.icon ?? `/app-icons/${id}.svg`,
    // A few products sign in on a sub-domain that has no logo of its own.
    domain: extra.domain ?? domainOf(target),
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
  app("classroom-resources", "google-classroom", "Google Classroom", at("https://classroom.google.com"), { notify: true }),
  app("classroom-resources", "seesaw", "Seesaw", at("https://app.seesaw.me"), { domain: "seesaw.me" }),
  app("classroom-resources", "ixl", "IXL", at("https://www.ixl.com"), { notes: "20 min daily" }),
  app("classroom-resources", "i-ready", "i-Ready", at("https://login.i-ready.com"), { domain: "i-ready.com" }),
  app("classroom-resources", "lexia-core5", "Lexia Core5 Reading", at("https://www.lexialearning.com/core5"), { domain: "lexialearning.com" }),
  app("classroom-resources", "capti-voice", "Capti Voice", at("https://www.captivoice.com")),
  app("classroom-resources", "zearn", "Zearn Math", at("https://www.zearn.org")),
  app("classroom-resources", "raz-kids", "Raz-Kids", at("https://www.raz-kids.com")),
  app("classroom-resources", "epic-books", "Epic!", at("https://www.getepic.com")),
  app("classroom-resources", "newsela", "Newsela", at("https://newsela.com")),
  app("classroom-resources", "mystery-science", "Mystery Science", at("https://mysteryscience.com")),
  app("classroom-resources", "prodigy", "Prodigy Math", at("https://www.prodigygame.com")),
  app("classroom-resources", "xtramath", "XtraMath", at("https://xtramath.org")),
  app("classroom-resources", "st-math", "ST Math", at("https://web.stmath.com"), { domain: "stmath.com" }),
  app("classroom-resources", "nearpod", "Nearpod", at("https://nearpod.com")),
  app("classroom-resources", "pear-deck", "Pear Deck", at("https://www.peardeck.com")),
  app("classroom-resources", "google-docs", "Google Docs", at("https://docs.google.com")),
  app("classroom-resources", "google-slides", "Google Slides", at("https://slides.google.com")),
  app("classroom-resources", "google-drive", "Google Drive", at("https://drive.google.com")),
  app("classroom-resources", "clever-goals", "Clever Goals", page),
];

// ===================================================================
// School Resources — shared across Lincoln Elementary
// ===================================================================
const school: Resource[] = [
  app("school-resources", "destiny-discover", "Destiny Discover", at("https://www.destinydiscover.com")),
  app("school-resources", "sora", "Sora", at("https://soraapp.com")),
  app("school-resources", "pebblego", "PebbleGo", at("https://pebblego.com")),
  app("school-resources", "storyline-online", "Storyline Online", at("https://storylineonline.net")),
  app("school-resources", "scholastic-news", "Scholastic News", at("https://sn56.scholastic.com"), { domain: "scholastic.com" }),
  app("school-resources", "studies-weekly", "Studies Weekly", at("https://www.studiesweekly.com")),
  app("school-resources", "brainpop", "BrainPOP", at("https://www.brainpop.com")),
  app("school-resources", "generation-genius", "Generation Genius", at("https://www.generationgenius.com")),
  app("school-resources", "gonoodle", "GoNoodle", at("https://www.gonoodle.com")),
  app("school-resources", "second-step", "Second Step", at("https://www.secondstep.org")),
  app("school-resources", "quaver-music", "QuaverMusic", at("https://www.quavered.com")),
  app("school-resources", "open-phys-ed", "OPEN Phys Ed", at("https://openphysed.org")),
  app("school-resources", "artsonia", "Artsonia", at("https://www.artsonia.com")),
  app("school-resources", "accelerated-reader", "Accelerated Reader", at("https://www.renaissance.com/products/accelerated-reader"), { domain: "renaissance.com" }),
  app("school-resources", "star-360", "Star 360", at("https://www.renaissance.com/products/star-assessments"), { domain: "renaissance.com" }),
  app("school-resources", "lunch-menu", "Lunch Menu", page),
  app("school-resources", "yearbook", "Yearbook", page),
  app("school-resources", "library-catalog", "Library Catalog", page),
  app("school-resources", "study-hall", "Study Hall", page),
];

// ===================================================================
// District Resources — Lincoln Unified
// ===================================================================
const district: Resource[] = [
  app("district-resources", "clever-badges", "Clever Badges", page),
  app("district-resources", "powerschool", "PowerSchool", at("https://www.powerschool.com")),
  app("district-resources", "map-growth", "MAP Growth", at("https://www.nwea.org/map-growth"), { domain: "nwea.org" }),
  app("district-resources", "edulastic", "Edulastic", at("https://edulastic.com")),
  app("district-resources", "google-meet", "Google Meet", at("https://meet.google.com")),
  app("district-resources", "gmail", "Gmail", at("https://mail.google.com")),
  app("district-resources", "google-calendar", "Google Calendar", at("https://calendar.google.com")),
  app("district-resources", "zoom", "Zoom", at("https://zoom.us")),
  app("district-resources", "microsoft-teams", "Microsoft Teams", at("https://teams.microsoft.com")),
  app("district-resources", "onedrive", "OneDrive", at("https://onedrive.live.com")),
  app("district-resources", "student-handbook", "Student Handbook", page),
  app("district-resources", "district-calendar", "District Calendar", page),
  app("district-resources", "bus-routes", "Bus Routes", page),
  app("district-resources", "counseling", "Counseling Center", page),
  app("district-resources", "tech-helpdesk", "Technology Help Desk", page),
  app("district-resources", "family-portal", "Family Portal", page),
  app("district-resources", "acceptable-use", "Acceptable Use Policy", page),
  app("district-resources", "immersive-reader", "Immersive Reader", at("https://www.microsoft.com/en-us/education/products/learning-tools"), { domain: "microsoft.com" }),
  app("district-resources", "read-write", "Read&Write", at("https://www.texthelp.com/products/read-and-write-education"), { domain: "texthelp.com" }),
  app("district-resources", "snap-read", "Snap&Read", at("https://learningtools.donjohnston.com"), { domain: "donjohnston.com" }),
  app("district-resources", "bookshare", "Bookshare", at("https://www.bookshare.org")),
  app("district-resources", "learning-ally", "Learning Ally", at("https://learningally.org")),
];

// ===================================================================
// Clever Library — the wider catalog a student can open
// ===================================================================
const library: Resource[] = [
  // Reading and language arts
  app("clever-library", "reading-a-z", "Reading A-Z", at("https://www.readinga-z.com")),
  app("clever-library", "myon", "myON", at("https://www.myon.com")),
  app("clever-library", "commonlit", "CommonLit", at("https://www.commonlit.org")),
  app("clever-library", "readworks", "ReadWorks", at("https://www.readworks.org")),
  app("clever-library", "flocabulary", "Flocabulary", at("https://www.flocabulary.com")),
  app("clever-library", "achieve3000", "Achieve3000", at("https://www.achieve3000.com")),
  app("clever-library", "starfall", "Starfall", at("https://www.starfall.com")),
  app("clever-library", "wonders", "Wonders", at("https://www.mheducation.com/prek-12/program/microsites/MKTSP-BBB01M0.html"), { domain: "mheducation.com" }),
  app("clever-library", "scholastic", "Scholastic", at("https://www.scholastic.com")),
  app("clever-library", "freckle", "Freckle", at("https://www.freckle.com")),

  // Mathematics
  app("clever-library", "khan-academy", "Khan Academy", at("https://www.khanacademy.org")),
  app("clever-library", "dreambox", "DreamBox Learning", at("https://www.dreambox.com")),
  app("clever-library", "reflex-math", "Reflex Math", at("https://www.reflexmath.com")),
  app("clever-library", "first-in-math", "First In Math", at("https://www.firstinmath.com")),
  app("clever-library", "sumdog", "Sumdog", at("https://www.sumdog.com")),
  app("clever-library", "happy-numbers", "Happy Numbers", at("https://happynumbers.com")),
  app("clever-library", "math-playground", "Math Playground", at("https://www.mathplayground.com")),
  app("clever-library", "greg-tang-math", "Greg Tang Math", at("https://gregtangmath.com")),
  app("clever-library", "desmos", "Desmos", at("https://www.desmos.com/calculator"), { domain: "desmos.com" }),

  // Science and social studies
  app("clever-library", "legends-of-learning", "Legends of Learning", at("https://www.legendsoflearning.com")),
  app("clever-library", "gizmos", "Gizmos", at("https://gizmos.explorelearning.com")),
  app("clever-library", "discovery-education", "Discovery Education", at("https://www.discoveryeducation.com")),
  app("clever-library", "natgeo-kids", "Nat Geo Kids", at("https://kids.nationalgeographic.com")),
  app("clever-library", "wonderopolis", "Wonderopolis", at("https://wonderopolis.org")),
  app("clever-library", "google-earth", "Google Earth", at("https://earth.google.com")),

  // Create and present
  app("clever-library", "canva", "Canva for Education", at("https://www.canva.com/education"), { domain: "canva.com" }),
  app("clever-library", "book-creator", "Book Creator", at("https://bookcreator.com")),
  app("clever-library", "wevideo", "WeVideo", at("https://www.wevideo.com")),
  app("clever-library", "flip", "Flip", at("https://info.flip.com"), { domain: "flip.com" }),
  app("clever-library", "padlet", "Padlet", at("https://padlet.com")),
  app("clever-library", "wakelet", "Wakelet", at("https://wakelet.com")),
  app("clever-library", "screencastify", "Screencastify", at("https://www.screencastify.com")),
  app("clever-library", "google-sheets", "Google Sheets", at("https://sheets.google.com")),
  app("clever-library", "google-forms", "Google Forms", at("https://forms.google.com")),
  app("clever-library", "google-keep", "Google Keep", at("https://keep.google.com")),

  // Practice and review
  app("clever-library", "quizlet", "Quizlet", at("https://quizlet.com")),
  app("clever-library", "kahoot", "Kahoot!", at("https://kahoot.com")),
  app("clever-library", "quizizz", "Quizizz", at("https://quizizz.com")),
  app("clever-library", "blooket", "Blooket", at("https://www.blooket.com")),
  app("clever-library", "gimkit", "Gimkit", at("https://www.gimkit.com")),
  app("clever-library", "edpuzzle", "Edpuzzle", at("https://edpuzzle.com")),
  app("clever-library", "formative", "Formative", at("https://www.formative.com")),
  app("clever-library", "classdojo", "ClassDojo", at("https://www.classdojo.com")),

  // Computing and keyboarding
  app("clever-library", "code-org", "Code.org", at("https://code.org")),
  app("clever-library", "scratch", "Scratch", at("https://scratch.mit.edu")),
  app("clever-library", "tynker", "Tynker", at("https://www.tynker.com")),
  app("clever-library", "typing-club", "TypingClub", at("https://www.typingclub.com")),
  app("clever-library", "typing-com", "Typing.com", at("https://www.typing.com")),

  // World languages and early learning
  app("clever-library", "duolingo", "Duolingo", at("https://www.duolingo.com")),
  app("clever-library", "rosetta-stone", "Rosetta Stone", at("https://www.rosettastone.com")),
  app("clever-library", "imagine-learning", "Imagine Learning", at("https://www.imaginelearning.com")),
  app("clever-library", "abcmouse", "ABCmouse", at("https://www.abcmouse.com")),
  app("clever-library", "adventure-academy", "Adventure Academy", at("https://www.adventureacademy.com")),

  // Reference
  app("clever-library", "wikipedia", "Wikipedia", at("https://www.wikipedia.org")),
  app("clever-library", "youtube", "YouTube", at("https://www.youtube.com")),
  app("clever-library", "canvas", "Canvas", {
    kind: "unavailable",
    reason: "Lincoln Unified has not finished setting up this app.",
  }),
];

export const resources: Resource[] = [...classroom, ...school, ...district, ...library];

export const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
