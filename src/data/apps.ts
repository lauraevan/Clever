import type { Resource } from "./types";

/**
 * The demo portal's applications, split across the three resource sections the
 * student portal shows. Icon artwork is generated into public/app-icons by
 * `npm run generate:icons`.
 */
export const resources: Resource[] = [
  // ---- Classroom Resources -------------------------------------------
  {
    id: "google-classroom",
    title: "Google Classroom",
    icon: "/app-icons/google-classroom.svg",
    section: "classroom-resources",
    target: { kind: "external", href: "https://classroom.google.com" },
    notify: true,
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/app-icons/google-drive.svg",
    section: "classroom-resources",
    target: { kind: "external", href: "https://drive.google.com" },
  },
  {
    id: "google-docs",
    title: "Google Docs",
    icon: "/app-icons/google-docs.svg",
    section: "classroom-resources",
    target: { kind: "external", href: "https://docs.google.com" },
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/app-icons/google-slides.svg",
    section: "classroom-resources",
    target: { kind: "external", href: "https://slides.google.com" },
  },
  {
    id: "schoology",
    title: "Schoology",
    icon: "/app-icons/schoology.svg",
    section: "classroom-resources",
    target: { kind: "demo" },
  },
  {
    id: "canvas",
    title: "Canvas",
    icon: "/app-icons/canvas.svg",
    section: "classroom-resources",
    target: { kind: "demo" },
  },
  {
    id: "nearpod",
    title: "Nearpod",
    icon: "/app-icons/nearpod.svg",
    section: "classroom-resources",
    target: { kind: "demo" },
  },
  {
    id: "seesaw",
    title: "Seesaw",
    icon: "/app-icons/seesaw.svg",
    section: "classroom-resources",
    target: { kind: "demo" },
  },

  // ---- Applications ---------------------------------------------------
  {
    id: "khan-academy",
    title: "Khan Academy",
    icon: "/app-icons/khan-academy.svg",
    section: "applications",
    target: { kind: "external", href: "https://www.khanacademy.org" },
  },
  {
    id: "ixl",
    title: "IXL",
    icon: "/app-icons/ixl.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "i-ready",
    title: "i-Ready",
    icon: "/app-icons/i-ready.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "newsela",
    title: "Newsela",
    icon: "/app-icons/newsela.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "quizlet",
    title: "Quizlet",
    icon: "/app-icons/quizlet.svg",
    section: "applications",
    target: { kind: "external", href: "https://quizlet.com" },
  },
  {
    id: "scratch",
    title: "Scratch",
    icon: "/app-icons/scratch.svg",
    section: "applications",
    target: { kind: "external", href: "https://scratch.mit.edu" },
  },
  {
    id: "code-org",
    title: "Code.org",
    icon: "/app-icons/code-org.svg",
    section: "applications",
    target: { kind: "external", href: "https://code.org" },
  },
  {
    id: "desmos",
    title: "Desmos Graphing Calculator",
    icon: "/app-icons/desmos.svg",
    section: "applications",
    target: { kind: "external", href: "https://www.desmos.com/calculator" },
  },
  {
    id: "brainpop",
    title: "BrainPOP",
    icon: "/app-icons/brainpop.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "epic-books",
    title: "Epic! Books for Kids",
    icon: "/app-icons/epic-books.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "typing-club",
    title: "TypingClub",
    icon: "/app-icons/typing-club.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "kahoot",
    title: "Kahoot!",
    icon: "/app-icons/kahoot.svg",
    section: "applications",
    target: { kind: "external", href: "https://kahoot.com" },
  },
  {
    id: "duolingo",
    title: "Duolingo",
    icon: "/app-icons/duolingo.svg",
    section: "applications",
    target: { kind: "external", href: "https://www.duolingo.com" },
  },
  {
    id: "padlet",
    title: "Padlet",
    icon: "/app-icons/padlet.svg",
    section: "applications",
    target: { kind: "demo" },
  },
  {
    id: "pearson",
    title: "Pearson Realize",
    icon: "/app-icons/pearson.svg",
    section: "applications",
    target: { kind: "unavailable", reason: "Your school has not set up this app yet." },
  },

  // ---- District Resources ---------------------------------------------
  {
    id: "library-catalog",
    title: "Library Catalog",
    icon: "/app-icons/library-catalog.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "student-handbook",
    title: "Student Handbook",
    icon: "/app-icons/student-handbook.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "lunch-menu",
    title: "Lunch Menu",
    icon: "/app-icons/lunch-menu.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "bus-routes",
    title: "Bus Routes",
    icon: "/app-icons/bus-routes.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "counseling",
    title: "Counseling Center",
    icon: "/app-icons/counseling.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "tech-helpdesk",
    title: "Technology Help Desk",
    icon: "/app-icons/tech-helpdesk.svg",
    section: "district-resources",
    target: { kind: "demo" },
  },
  {
    id: "google-meet",
    title: "Google Meet",
    icon: "/app-icons/google-meet.svg",
    section: "district-resources",
    target: { kind: "external", href: "https://meet.google.com" },
  },
  {
    id: "zoom",
    title: "Zoom",
    icon: "/app-icons/zoom.svg",
    section: "district-resources",
    target: { kind: "external", href: "https://zoom.us" },
  },
];

export const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
