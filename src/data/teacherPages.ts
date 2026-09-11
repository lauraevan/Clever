import type { TeacherPage } from "./types";

/**
 * Teacher Pages are teacher-curated collections of links. They are listed in
 * their own portal section and open onto a dedicated page.
 */
export const teacherPages: TeacherPage[] = [
  {
    id: "johnson",
    title: "Mrs. Johnson's Page",
    teacher: "Mrs. Johnson",
    subtitle: "English Language Arts · Period 2",
    initials: "MJ",
    color: "#436cf2",
    sections: [
      {
        id: "this-week",
        title: "This Week",
        resources: [
          {
            id: "johnson-novel",
            title: "Novel Study: The Giver",
            icon: "/app-icons/newsela.svg",
            target: { kind: "demo" },
            notes: "Chapters 9–12 due Friday",
          },
          {
            id: "johnson-vocab",
            title: "Vocabulary Set",
            icon: "/app-icons/quizlet.svg",
            target: { kind: "external", href: "https://quizlet.com" },
          },
          {
            id: "johnson-journal",
            title: "Writing Journal",
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
            id: "johnson-classroom",
            title: "Google Classroom",
            icon: "/app-icons/google-classroom.svg",
            target: { kind: "external", href: "https://classroom.google.com" },
          },
          {
            id: "johnson-syllabus",
            title: "Course Syllabus",
            target: { kind: "demo" },
          },
          {
            id: "johnson-rubric",
            title: "Essay Rubric",
            target: { kind: "demo" },
          },
        ],
      },
    ],
  },
  {
    id: "anderson",
    title: "Mr. Anderson's Math",
    teacher: "Mr. Anderson",
    subtitle: "Pre-Algebra · Periods 3 and 5",
    initials: "MA",
    color: "#1da978",
    sections: [
      {
        id: "practice",
        title: "Daily Practice",
        resources: [
          {
            id: "anderson-ixl",
            title: "IXL Skill Plan",
            icon: "/app-icons/ixl.svg",
            target: { kind: "demo" },
          },
          {
            id: "anderson-khan",
            title: "Khan Academy",
            icon: "/app-icons/khan-academy.svg",
            target: { kind: "external", href: "https://www.khanacademy.org" },
          },
          {
            id: "anderson-desmos",
            title: "Desmos Graphing Calculator",
            icon: "/app-icons/desmos.svg",
            target: { kind: "external", href: "https://www.desmos.com/calculator" },
          },
        ],
      },
      {
        id: "reference",
        title: "Reference",
        resources: [
          {
            id: "anderson-formula",
            title: "Formula Sheet",
            target: { kind: "demo" },
          },
          {
            id: "anderson-calendar",
            title: "Unit Calendar",
            target: { kind: "demo" },
          },
        ],
      },
    ],
  },
  {
    id: "rivera",
    title: "Ms. Rivera's Science",
    teacher: "Ms. Rivera",
    subtitle: "Life Science · Period 4",
    initials: "MR",
    color: "#29c6c1",
    sections: [
      {
        id: "unit",
        title: "Current Unit: Ecosystems",
        resources: [
          {
            id: "rivera-brainpop",
            title: "BrainPOP: Food Chains",
            icon: "/app-icons/brainpop.svg",
            target: { kind: "demo" },
          },
          {
            id: "rivera-earth",
            title: "Google Earth Field Trip",
            icon: "/app-icons/google-earth.svg",
            target: { kind: "external", href: "https://earth.google.com" },
          },
          {
            id: "rivera-lab",
            title: "Lab Report Template",
            icon: "/app-icons/google-docs.svg",
            target: { kind: "external", href: "https://docs.google.com" },
          },
        ],
      },
      {
        id: "extras",
        title: "Extra Credit",
        resources: [
          {
            id: "rivera-scratch",
            title: "Build an Ecosystem Model",
            icon: "/app-icons/scratch.svg",
            target: { kind: "external", href: "https://scratch.mit.edu" },
          },
          {
            id: "rivera-wiki",
            title: "Research Starting Points",
            icon: "/app-icons/wikipedia.svg",
            target: { kind: "external", href: "https://www.wikipedia.org" },
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
    initials: "TR",
    color: "#7e1dff",
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        resources: [
          {
            id: "tech-typing",
            title: "TypingClub",
            icon: "/app-icons/typing-club.svg",
            target: { kind: "demo" },
          },
          {
            id: "tech-helpdesk",
            title: "Technology Help Desk",
            icon: "/app-icons/tech-helpdesk.svg",
            target: { kind: "demo" },
          },
          {
            id: "tech-handbook",
            title: "Device Handbook",
            icon: "/app-icons/student-handbook.svg",
            target: { kind: "demo" },
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
            id: "tech-policy",
            title: "Acceptable Use Policy",
            target: { kind: "demo" },
          },
        ],
      },
    ],
  },
];

export const teacherPagesById = new Map(teacherPages.map((page) => [page.id, page]));
