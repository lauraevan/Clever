/**
 * Artwork specs for the portal's application icons.
 *
 * `slug` entries pull the official brand mark and official brand hex straight
 * out of the `simple-icons` package, so those tiles use real logo geometry.
 *
 * Everything else is drawn as a wordmark or monogram on a brand-coloured
 * ground — the form most real ed-tech app icons actually take (IXL's icon is
 * literally "IXL" reversed out of green). `simple-icons` carries almost no K-12
 * education products, and this environment cannot reach vendor asset hosts, so
 * the grounds below are close approximations of each product's brand colour
 * rather than sampled values. They are all in one place here and easy to
 * correct against a real portal.
 */

/**
 * @typedef {object} IconSpec
 * @property {string} id                 file name, without extension
 * @property {string} [slug]             simple-icons slug, for real brand marks
 * @property {"clever"} [style]          special-cased artwork
 * @property {string[]} [lines]          wordmark text, one entry per line
 * @property {string} [label]            accessible label, if not the lines
 * @property {string} [bg]               ground colour, or "brand"
 * @property {string} [fg]               mark/text colour, or "brand"
 * @property {number} [scale]            brand marks: share of the canvas filled
 * @property {number} [textSize]         override the auto-fitted type size
 * @property {number} [tracking]         letter-spacing, in px
 * @property {number} [weight]           font weight
 */

/** @type {IconSpec[]} */
export const iconSpecs = [
  // ===================================================================
  // Official brand marks from simple-icons
  // ===================================================================
  { id: "google-classroom", slug: "googleclassroom", bg: "brand", fg: "#ffffff", scale: 0.56 },
  { id: "google-drive", slug: "googledrive", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-docs", slug: "googledocs", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-slides", slug: "googleslides", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-sheets", slug: "googlesheets", bg: "#ffffff", fg: "brand", scale: 0.72 },
  { id: "google-forms", slug: "googleforms", bg: "#ffffff", fg: "brand", scale: 0.72 },
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
  { id: "screencastify", slug: "screencastify", bg: "brand", fg: "#ffffff", scale: 0.58 },

  // ===================================================================
  // Clever's own products
  // ===================================================================
  { id: "clever-badges", style: "clever", label: "Clever Badges" },
  { id: "clever-goals", style: "clever", bg: "#2146bd", label: "Clever Goals" },

  // ===================================================================
  // Reading and language arts
  // ===================================================================
  { id: "capti-voice", lines: ["Capti"], bg: "#1b9ed9", fg: "#ffffff" },
  { id: "lexia-core5", lines: ["Lexia", "Core5"], bg: "#0e7c86", fg: "#ffffff" },
  { id: "raz-kids", lines: ["Raz", "Kids"], bg: "#6dbe45", fg: "#ffffff" },
  { id: "reading-a-z", lines: ["Reading", "A-Z"], bg: "#0072bc", fg: "#ffffff" },
  { id: "myon", lines: ["myON"], bg: "#00a3e0", fg: "#ffffff" },
  { id: "epic-books", lines: ["Epic!"], bg: "#e5342a", fg: "#ffffff" },
  { id: "newsela", lines: ["newsela"], bg: "#1d2e4e", fg: "#ffffff" },
  { id: "commonlit", lines: ["Common", "Lit"], bg: "#0f7b6c", fg: "#ffffff" },
  { id: "readworks", lines: ["Read", "Works"], bg: "#e03c31", fg: "#ffffff" },
  { id: "flocabulary", lines: ["Floca", "bulary"], bg: "#f5a623", fg: "#20232a" },
  { id: "achieve3000", lines: ["Achieve", "3000"], bg: "#00539b", fg: "#ffffff" },
  { id: "starfall", lines: ["Starfall"], bg: "#e4002b", fg: "#ffffff" },
  { id: "storyline-online", lines: ["Storyline"], bg: "#1b4f9c", fg: "#ffffff" },
  { id: "accelerated-reader", lines: ["AR"], bg: "#00539b", fg: "#ffffff", textSize: 50 },
  { id: "wonders", lines: ["Wonders"], bg: "#c8102e", fg: "#ffffff" },
  { id: "scholastic", lines: ["Scholastic"], bg: "#e1251b", fg: "#ffffff" },
  { id: "pebblego", lines: ["Pebble", "Go"], bg: "#00a3ad", fg: "#ffffff" },
  { id: "sora", lines: ["Sora"], bg: "#c8102e", fg: "#ffffff" },
  { id: "destiny-discover", lines: ["Destiny"], bg: "#005eb8", fg: "#ffffff" },

  // ===================================================================
  // Mathematics
  // ===================================================================
  { id: "ixl", lines: ["IXL"], bg: "#1d9e4b", fg: "#ffffff", textSize: 44, tracking: 1 },
  { id: "i-ready", lines: ["i-Ready"], bg: "#00a44b", fg: "#ffffff" },
  { id: "zearn", lines: ["Zearn"], bg: "#1c7ed6", fg: "#ffffff" },
  { id: "prodigy", lines: ["Prodigy"], bg: "#00b894", fg: "#ffffff" },
  { id: "dreambox", lines: ["Dream", "Box"], bg: "#f7941e", fg: "#ffffff" },
  { id: "st-math", lines: ["ST", "Math"], bg: "#00539f", fg: "#ffffff" },
  { id: "freckle", lines: ["Freckle"], bg: "#6c4bb6", fg: "#ffffff" },
  { id: "reflex-math", lines: ["Reflex"], bg: "#e8552d", fg: "#ffffff" },
  { id: "xtramath", lines: ["Xtra", "Math"], bg: "#2f80b7", fg: "#ffffff" },
  { id: "first-in-math", lines: ["First in", "Math"], bg: "#0b5fa5", fg: "#ffffff" },
  { id: "sumdog", lines: ["Sumdog"], bg: "#f26522", fg: "#ffffff" },
  { id: "happy-numbers", lines: ["Happy", "Numbers"], bg: "#29b6b0", fg: "#ffffff" },
  { id: "math-playground", lines: ["Math", "Playground"], bg: "#2e7d32", fg: "#ffffff" },
  { id: "desmos", lines: ["Desmos"], bg: "#1a73e8", fg: "#ffffff" },
  { id: "greg-tang-math", lines: ["Greg", "Tang"], bg: "#00558c", fg: "#ffffff" },

  // ===================================================================
  // Science and social studies
  // ===================================================================
  { id: "mystery-science", lines: ["Mystery", "Science"], bg: "#1a8fe3", fg: "#ffffff" },
  { id: "generation-genius", lines: ["Gen", "Genius"], bg: "#1b9aaa", fg: "#ffffff" },
  { id: "brainpop", lines: ["Brain", "POP"], bg: "#f7941e", fg: "#20232a" },
  { id: "legends-of-learning", lines: ["Legends"], bg: "#2d3a8c", fg: "#ffffff" },
  { id: "gizmos", lines: ["Gizmos"], bg: "#007dba", fg: "#ffffff" },
  { id: "discovery-education", lines: ["Discovery"], bg: "#0a5a9c", fg: "#ffffff" },
  { id: "natgeo-kids", lines: ["Nat Geo", "Kids"], bg: "#ffcc00", fg: "#20232a" },
  { id: "studies-weekly", lines: ["Studies", "Weekly"], bg: "#f58220", fg: "#ffffff" },
  { id: "scholastic-news", lines: ["Scholastic", "News"], bg: "#e1251b", fg: "#ffffff" },
  { id: "wonderopolis", lines: ["Wonder", "opolis"], bg: "#7b4397", fg: "#ffffff" },

  // ===================================================================
  // Classroom tools
  // ===================================================================
  { id: "seesaw", lines: ["Seesaw"], bg: "#00c18a", fg: "#ffffff" },
  { id: "classdojo", lines: ["Class", "Dojo"], bg: "#6c63ff", fg: "#ffffff" },
  { id: "nearpod", lines: ["Nearpod"], bg: "#6a2ea0", fg: "#ffffff" },
  { id: "pear-deck", lines: ["Pear", "Deck"], bg: "#4caf50", fg: "#ffffff" },
  { id: "quizizz", lines: ["Quizizz"], bg: "#8854c0", fg: "#ffffff" },
  { id: "blooket", lines: ["Blooket"], bg: "#4b69c6", fg: "#ffffff" },
  { id: "gimkit", lines: ["Gimkit"], bg: "#2c8cca", fg: "#ffffff" },
  { id: "edpuzzle", lines: ["Ed", "puzzle"], bg: "#0096d8", fg: "#ffffff" },
  { id: "wakelet", lines: ["Wakelet"], bg: "#f0466f", fg: "#ffffff" },
  { id: "book-creator", lines: ["Book", "Creator"], bg: "#f05a28", fg: "#ffffff" },
  { id: "wevideo", lines: ["WeVideo"], bg: "#00a3e0", fg: "#ffffff" },
  { id: "canva", lines: ["Canva"], bg: "#00c4cc", fg: "#ffffff" },
  { id: "flip", lines: ["Flip"], bg: "#7b1fa2", fg: "#ffffff", textSize: 42 },
  { id: "formative", lines: ["Formative"], bg: "#0b7285", fg: "#ffffff" },

  // ===================================================================
  // Computing and keyboarding
  // ===================================================================
  { id: "code-org", lines: ["Code", ".org"], bg: "#283c50", fg: "#ffffff" },
  { id: "tynker", lines: ["Tynker"], bg: "#f5a623", fg: "#20232a" },
  { id: "typing-club", lines: ["Typing", "Club"], bg: "#2f6fb0", fg: "#ffffff" },
  { id: "typing-com", lines: ["Typing", ".com"], bg: "#00a0b0", fg: "#ffffff" },

  // ===================================================================
  // Accessibility and learning support
  // ===================================================================
  { id: "read-write", lines: ["Read", "&Write"], bg: "#6c2e85", fg: "#ffffff" },
  { id: "snap-read", lines: ["Snap", "&Read"], bg: "#e87722", fg: "#ffffff" },
  { id: "bookshare", lines: ["Book", "share"], bg: "#005a9c", fg: "#ffffff" },
  { id: "learning-ally", lines: ["Learning", "Ally"], bg: "#00539b", fg: "#ffffff" },
  { id: "immersive-reader", lines: ["Immersive", "Reader"], bg: "#2b579a", fg: "#ffffff" },

  // ===================================================================
  // World languages and early learning
  // ===================================================================
  { id: "rosetta-stone", lines: ["Rosetta"], bg: "#ffd100", fg: "#002b49" },
  { id: "imagine-learning", lines: ["Imagine"], bg: "#0072ce", fg: "#ffffff" },
  { id: "abcmouse", lines: ["ABC", "mouse"], bg: "#c8102e", fg: "#ffffff" },
  { id: "adventure-academy", lines: ["Adventure", "Academy"], bg: "#2d3a8c", fg: "#ffffff" },

  // ===================================================================
  // Wellbeing and specials
  // ===================================================================
  { id: "gonoodle", lines: ["Go", "Noodle"], bg: "#00b5e2", fg: "#ffffff" },
  { id: "second-step", lines: ["Second", "Step"], bg: "#0075be", fg: "#ffffff" },
  { id: "quaver-music", lines: ["Quaver"], bg: "#7b2d8e", fg: "#ffffff" },
  { id: "artsonia", lines: ["Artsonia"], bg: "#d6336c", fg: "#ffffff" },
  { id: "open-phys-ed", lines: ["OPEN", "Phys Ed"], bg: "#1f7a4d", fg: "#ffffff" },

  // ===================================================================
  // Assessment and student information
  // ===================================================================
  { id: "map-growth", lines: ["MAP", "Growth"], bg: "#00558c", fg: "#ffffff" },
  { id: "star-360", lines: ["Star", "360"], bg: "#00539b", fg: "#ffffff" },
  { id: "powerschool", lines: ["Power", "School"], bg: "#0c6ba9", fg: "#ffffff" },
  { id: "edulastic", lines: ["Edulastic"], bg: "#1a7f8e", fg: "#ffffff" },

  // ===================================================================
  // School and district links
  // ===================================================================
  { id: "library-catalog", lines: ["Library"], bg: "#8a5a3c", fg: "#ffffff" },
  { id: "student-handbook", lines: ["Student", "Handbook"], bg: "#474c5e", fg: "#ffffff" },
  { id: "lunch-menu", lines: ["Lunch", "Menu"], bg: "#e8912d", fg: "#ffffff" },
  { id: "bus-routes", lines: ["Bus", "Routes"], bg: "#c6212e", fg: "#ffffff" },
  { id: "counseling", lines: ["Counseling"], bg: "#29c6c1", fg: "#ffffff" },
  { id: "tech-helpdesk", lines: ["Help", "Desk"], bg: "#686f88", fg: "#ffffff" },
  { id: "district-calendar", lines: ["Calendar"], bg: "#3158d7", fg: "#ffffff" },
  { id: "yearbook", lines: ["Yearbook"], bg: "#9c6644", fg: "#ffffff" },
  { id: "family-portal", lines: ["Family", "Portal"], bg: "#32315b", fg: "#ffffff" },
  { id: "acceptable-use", lines: ["Acceptable", "Use"], bg: "#5c677d", fg: "#ffffff" },
];
