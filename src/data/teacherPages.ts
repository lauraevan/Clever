import type { TeacherPage } from "./types";

/**
 * Teacher Pages are teacher-curated collections of links. They are listed in
 * their own portal section and open onto a dedicated page.
 *
 * Ms. Mangan is the homeroom teacher, so her page carries the day-to-day work;
 * the rest are the specials teachers a 5th grader also sees.
 */
export const teacherPages: TeacherPage[] = [
  {
    id: "mangan",
    title: "Ms. Mangan's Class",
    teacher: "Ms. Mangan",
    subtitle: "5th Grade · Room 12",
    initials: "M",
    color: "#436cf2",
    sections: [
      {
        id: "morning-work",
        title: "Morning Work",
        resources: [
          {
            id: "mangan-classroom",
            title: "Google Classroom",
            icon: "/app-icons/google-classroom.svg",
            target: { kind: "external", href: "https://classroom.google.com" },
            notes: "Check the stream first",
          },
          {
            id: "mangan-ixl",
            title: "IXL Skill Plan",
            icon: "/app-icons/ixl.svg",
            target: { kind: "external", href: "https://www.ixl.com" },
            notes: "20 minutes daily",
          },
          {
            id: "mangan-lexia",
            title: "Lexia Core5",
            icon: "/app-icons/lexia-core5.svg",
            target: { kind: "external", href: "https://www.lexialearning.com/core5" },
            notes: "Finish your level",
          },
          {
            id: "mangan-xtramath",
            title: "XtraMath",
            icon: "/app-icons/xtramath.svg",
            target: { kind: "external", href: "https://xtramath.org" },
          },
        ],
      },
      {
        id: "reading",
        title: "Reading Block",
        resources: [
          {
            id: "mangan-raz",
            title: "Raz-Kids",
            icon: "/app-icons/raz-kids.svg",
            target: { kind: "external", href: "https://www.raz-kids.com" },
          },
          {
            id: "mangan-epic",
            title: "Epic!",
            icon: "/app-icons/epic-books.svg",
            target: { kind: "external", href: "https://www.getepic.com" },
          },
          {
            id: "mangan-newsela",
            title: "Newsela Article of the Week",
            icon: "/app-icons/newsela.svg",
            target: { kind: "external", href: "https://newsela.com" },
          },
          {
            id: "mangan-capti",
            title: "Capti Voice",
            icon: "/app-icons/capti-voice.svg",
            target: { kind: "external", href: "https://www.captivoice.com" },
            notes: "Listen along",
          },
          {
            id: "mangan-readworks",
            title: "ReadWorks",
            icon: "/app-icons/readworks.svg",
            target: { kind: "external", href: "https://www.readworks.org" },
          },
        ],
      },
      {
        id: "math-block",
        title: "Math Block",
        resources: [
          {
            id: "mangan-zearn",
            title: "Zearn Math",
            icon: "/app-icons/zearn.svg",
            target: { kind: "external", href: "https://www.zearn.org" },
          },
          {
            id: "mangan-iready",
            title: "i-Ready Math",
            icon: "/app-icons/i-ready.svg",
            target: { kind: "external", href: "https://login.i-ready.com" },
          },
          {
            id: "mangan-prodigy",
            title: "Prodigy Math",
            icon: "/app-icons/prodigy.svg",
            target: { kind: "external", href: "https://www.prodigygame.com" },
          },
          {
            id: "mangan-stmath",
            title: "ST Math",
            icon: "/app-icons/st-math.svg",
            target: { kind: "external", href: "https://web.stmath.com" },
          },
        ],
      },
      {
        id: "science-unit",
        title: "Science: Ecosystems",
        resources: [
          {
            id: "mangan-mystery",
            title: "Mystery Science",
            icon: "/app-icons/mystery-science.svg",
            target: { kind: "external", href: "https://mysteryscience.com" },
          },
          {
            id: "mangan-gengenius",
            title: "Generation Genius",
            icon: "/app-icons/generation-genius.svg",
            target: { kind: "external", href: "https://www.generationgenius.com" },
          },
          {
            id: "mangan-brainpop",
            title: "BrainPOP: Food Chains",
            icon: "/app-icons/brainpop.svg",
            target: { kind: "external", href: "https://www.brainpop.com" },
          },
          {
            id: "mangan-lab",
            title: "Lab Notebook",
            icon: "/app-icons/google-docs.svg",
            target: { kind: "external", href: "https://docs.google.com" },
          },
        ],
      },
      {
        id: "class-links",
        title: "Class Links",
        resources: [
          {
            id: "mangan-schedule",
            title: "Daily Schedule",
            target: { kind: "page" },
          },
          {
            id: "mangan-spelling",
            title: "Spelling List",
            target: { kind: "page" },
          },
          {
            id: "mangan-jobs",
            title: "Classroom Jobs",
            target: { kind: "page" },
          },
          {
            id: "mangan-birthdays",
            title: "Birthday Calendar",
            target: { kind: "page" },
          },
        ],
      },
    ],
  },
  {
    id: "library",
    title: "Library Media Center",
    teacher: "Mrs. Whitfield",
    subtitle: "Library · Thursdays",
    initials: "W",
    color: "#8a5a3c",
    sections: [
      {
        id: "find-a-book",
        title: "Find a Book",
        resources: [
          {
            id: "library-destiny",
            title: "Destiny Discover",
            icon: "/app-icons/destiny-discover.svg",
            target: { kind: "external", href: "https://www.destinydiscover.com" },
          },
          {
            id: "library-sora",
            title: "Sora",
            icon: "/app-icons/sora.svg",
            target: { kind: "external", href: "https://soraapp.com" },
          },
          {
            id: "library-pebblego",
            title: "PebbleGo",
            icon: "/app-icons/pebblego.svg",
            target: { kind: "external", href: "https://pebblego.com" },
          },
          {
            id: "library-storyline",
            title: "Storyline Online",
            icon: "/app-icons/storyline-online.svg",
            target: { kind: "external", href: "https://storylineonline.net" },
          },
        ],
      },
      {
        id: "research",
        title: "Research Help",
        resources: [
          {
            id: "library-natgeo",
            title: "Nat Geo Kids",
            icon: "/app-icons/natgeo-kids.svg",
            target: { kind: "external", href: "https://kids.nationalgeographic.com" },
          },
          {
            id: "library-wonderopolis",
            title: "Wonderopolis",
            icon: "/app-icons/wonderopolis.svg",
            target: { kind: "external", href: "https://wonderopolis.org" },
          },
          {
            id: "library-citation",
            title: "How to Cite a Source",
            target: { kind: "page" },
          },
        ],
      },
    ],
  },
  {
    id: "music",
    title: "Music with Mr. Delgado",
    teacher: "Mr. Delgado",
    subtitle: "Music · Mondays and Wednesdays",
    initials: "D",
    color: "#7b2d8e",
    sections: [
      {
        id: "this-quarter",
        title: "This Quarter",
        resources: [
          {
            id: "music-quaver",
            title: "QuaverMusic",
            icon: "/app-icons/quaver-music.svg",
            target: { kind: "external", href: "https://www.quavered.com" },
          },
          {
            id: "music-recorder",
            title: "Recorder Fingering Chart",
            target: { kind: "page" },
          },
          {
            id: "music-concert",
            title: "Spring Concert Songs",
            target: { kind: "page" },
          },
        ],
      },
    ],
  },
  {
    id: "pe-health",
    title: "PE and Health",
    teacher: "Coach Reyes",
    subtitle: "Physical Education · Tuesdays and Fridays",
    initials: "R",
    color: "#1f7a4d",
    sections: [
      {
        id: "warm-ups",
        title: "Warm-Ups and Activities",
        resources: [
          {
            id: "pe-gonoodle",
            title: "GoNoodle",
            icon: "/app-icons/gonoodle.svg",
            target: { kind: "external", href: "https://www.gonoodle.com" },
          },
          {
            id: "pe-open",
            title: "OPEN Phys Ed",
            icon: "/app-icons/open-phys-ed.svg",
            target: { kind: "external", href: "https://openphysed.org" },
          },
          {
            id: "pe-fitness",
            title: "Fitness Log",
            target: { kind: "page" },
          },
        ],
      },
    ],
  },
  {
    id: "technology",
    title: "Technology Resources",
    teacher: "Mr. Patel",
    subtitle: "Instructional Technology",
    initials: "P",
    color: "#2f6fb0",
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        resources: [
          {
            id: "tech-typing",
            title: "TypingClub",
            icon: "/app-icons/typing-club.svg",
            target: { kind: "external", href: "https://www.typingclub.com" },
          },
          {
            id: "tech-badges",
            pageId: "clever-badges",
            title: "My Clever Badge",
            icon: "/app-icons/clever-badges.svg",
            target: { kind: "page" },
          },
          {
            id: "tech-helpdesk",
            title: "Technology Help Desk",
            icon: "/app-icons/tech-helpdesk.svg",
            target: { kind: "page" },
          },
          {
            id: "tech-chromebook",
            title: "Chromebook Care",
            target: { kind: "page" },
          },
        ],
      },
      {
        id: "digital-citizenship",
        title: "Digital Citizenship",
        resources: [
          {
            id: "tech-code",
            title: "Code.org",
            icon: "/app-icons/code-org.svg",
            target: { kind: "external", href: "https://code.org" },
          },
          {
            id: "tech-scratch",
            title: "Scratch",
            icon: "/app-icons/scratch.svg",
            target: { kind: "external", href: "https://scratch.mit.edu" },
          },
          {
            id: "tech-policy",
            pageId: "acceptable-use",
            title: "Acceptable Use Policy",
            icon: "/app-icons/acceptable-use.svg",
            target: { kind: "page" },
          },
        ],
      },
    ],
  },
];

export const teacherPagesById = new Map(teacherPages.map((page) => [page.id, page]));
