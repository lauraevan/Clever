import type { ResourcePageContent } from "./types";
import { student } from "./student";
import { teacherResourcePages } from "./teacherResourcePages";

/**
 * Pages the portal hosts itself.
 *
 * In a real deployment these are the links a school or district publishes
 * through Clever rather than a vendor product: the handbook, the lunch menu, bus
 * routes, the help desk, and Clever's own badge and goals pages. They are real
 * pages with real content, not placeholders.
 */
export const resourcePages: ResourcePageContent[] = [
  {
    id: "clever-badges",
    title: "Clever Badge",
    subtitle: "Log in without typing a password",
    owner: student.district,
    blocks: [
      {
        kind: "lead",
        text: "Your Clever Badge is a personal QR code. Hold it up to the camera on a school device and you are signed in to your portal and all of your apps.",
      },
      { kind: "badge" },
      { kind: "heading", text: "How to use your badge" },
      {
        kind: "ordered",
        items: [
          "Open the Clever login page on a school device and choose Log in with Clever Badges.",
          "Hold your badge up so the whole square fits inside the camera frame.",
          "Wait for the green check. Your portal opens automatically.",
        ],
      },
      { kind: "heading", text: "Taking care of your badge" },
      {
        kind: "list",
        items: [
          "Keep your badge somewhere safe. Anyone holding it can open your account.",
          "Do not photograph or post your badge, and do not share it with other students.",
          "Tell Ms. Mangan or the front office right away if you lose it, and a new one will be printed. The old badge stops working as soon as the new one is made.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "Badges are usually used in Kindergarten through 5th grade. From 6th grade on, most students sign in with their district Google account instead.",
      },
    ],
  },
  {
    id: "clever-goals",
    title: "Clever Goals",
    subtitle: "Weekly targets set by Ms. Mangan",
    owner: "Ms. Mangan · 5th Grade",
    blocks: [
      {
        kind: "lead",
        text: "Goals track the minutes and skills your teacher asked for each week. They reset every Monday morning.",
      },
      { kind: "goals" },
      { kind: "heading", text: "How goals are counted" },
      {
        kind: "list",
        items: [
          "Time only counts while you are actively working in the app, not while a tab sits open.",
          "Skills count once you finish a whole practice set, not for each question.",
          "Ms. Mangan can see the same numbers you can, and adjusts targets if a week runs short.",
        ],
      },
    ],
  },
  {
    id: "study-hall",
    title: "Study Hall",
    subtitle: "Free choice time",
    owner: `${student.school} · Room 12`,
    blocks: [
      {
        kind: "lead",
        text: "Study Hall is for when your work is finished. Enter the access code Ms. Mangan gave the class to see what is available.",
      },
      { kind: "study-hall" },
    ],
  },
  {
    id: "student-handbook",
    title: "Student Handbook",
    subtitle: "2025–2026 school year",
    owner: student.district,
    blocks: [
      {
        kind: "lead",
        text: "The handbook covers what students and families can expect at school, and what the school expects in return. Families are asked to review it together at the start of each year.",
      },
      { kind: "heading", text: "The school day" },
      {
        kind: "table",
        head: ["", "Time"],
        rows: [
          ["Supervision begins", "8:05 a.m."],
          ["First bell", "8:20 a.m."],
          ["Instruction begins", "8:25 a.m."],
          ["5th grade lunch and recess", "11:55 a.m. – 12:40 p.m."],
          ["Dismissal", "2:50 p.m."],
          ["Early release Wednesdays", "1:20 p.m."],
        ],
      },
      { kind: "heading", text: "Attendance" },
      {
        kind: "paragraph",
        text: "Call the front office before 9:00 a.m. if a student will be absent or late. Absences reported within 48 hours can be excused; after that they are recorded as unexcused. Five or more unexcused absences trigger a letter home and a meeting with the attendance clerk.",
      },
      { kind: "heading", text: "What to bring, and what to leave at home" },
      {
        kind: "list",
        items: [
          "A charged district Chromebook, a water bottle, and a snack.",
          "Phones and smart watches stay in backpacks, powered off, from the first bell to dismissal.",
          "No food to share with the class without checking allergies with the teacher first.",
        ],
      },
      { kind: "heading", text: "Behavior expectations" },
      {
        kind: "definitions",
        items: [
          {
            term: "Be safe",
            description: "Walk indoors, keep hands and feet to yourself, and stay where an adult can see you.",
          },
          {
            term: "Be respectful",
            description: "Speak to classmates and adults the way you would want to be spoken to, in person and online.",
          },
          {
            term: "Be responsible",
            description: "Look after your own work, your device, and the shared spaces you use.",
          },
        ],
      },
      { kind: "heading", text: "Dress code" },
      {
        kind: "paragraph",
        text: "Clothing should cover the torso and allow safe movement at recess and in PE. Closed-toe shoes are required on the climbing structure. Hats are for outdoors. Clothing with language or images about alcohol, tobacco, weapons, or hate is not permitted.",
      },
    ],
  },
  {
    id: "lunch-menu",
    title: "Lunch Menu",
    subtitle: "Week of March 16",
    owner: `${student.school} · Nutrition Services`,
    blocks: [
      {
        kind: "lead",
        text: "Breakfast and lunch are served at no charge to every student. A vegetarian entrée, fresh fruit, a vegetable, and milk are offered every day.",
      },
      {
        kind: "table",
        head: ["Day", "Main", "Vegetarian", "Sides"],
        rows: [
          ["Monday", "Cheese pizza", "Cheese pizza", "Garden salad · Orange wedges"],
          ["Tuesday", "Chicken teriyaki bowl", "Tofu teriyaki bowl", "Steamed rice · Broccoli · Pineapple"],
          ["Wednesday", "Turkey and cheese sub", "Hummus and veggie wrap", "Carrot sticks · Apple slices"],
          ["Thursday", "Beef taco boat", "Black bean taco boat", "Corn · Salsa · Watermelon"],
          ["Friday", "Baked mac and cheese", "Baked mac and cheese", "Green beans · Roll · Pear cup"],
        ],
      },
      { kind: "heading", text: "Allergies and special diets" },
      {
        kind: "paragraph",
        text: "Nutrition Services keeps a copy of every medical diet form on file. If your family needs one, ask the front office and return it signed by a doctor. Kitchen staff receive an updated list each Monday.",
      },
      {
        kind: "callout",
        tone: "info",
        text: "Menus can change when a delivery is short. The kitchen posts substitutions on the whiteboard outside the cafeteria each morning.",
      },
    ],
  },
  {
    id: "bus-routes",
    title: "Bus Routes",
    subtitle: "Spring schedule",
    owner: `${student.district} · Transportation`,
    blocks: [
      {
        kind: "lead",
        text: "Buses arrive at stops within five minutes of the times below. Students should be waiting at the stop five minutes early.",
      },
      {
        kind: "table",
        head: ["Route", "Stop", "Morning pickup", "Afternoon drop-off"],
        rows: [
          ["12", "Maple St & 4th Ave", "7:38 a.m.", "3:12 p.m."],
          ["12", "Maple St & 9th Ave", "7:44 a.m.", "3:19 p.m."],
          ["12", "Cedar Park entrance", "7:51 a.m.", "3:26 p.m."],
          ["17", "Birchwood Apartments", "7:35 a.m.", "3:10 p.m."],
          ["17", "Riverside Dr & Oak St", "7:43 a.m.", "3:18 p.m."],
          ["17", "Hillcrest Community Center", "7:52 a.m.", "3:27 p.m."],
          ["23", "Willow Creek Rd", "7:40 a.m.", "3:14 p.m."],
          ["23", "Sunnyside Market", "7:47 a.m.", "3:22 p.m."],
        ],
      },
      { kind: "heading", text: "Riding a different bus" },
      {
        kind: "paragraph",
        text: "A student may ride a bus other than their assigned route only with a note from a parent or guardian, signed at the front office before lunch. Notes cannot be accepted by phone or email.",
      },
      {
        kind: "callout",
        tone: "warning",
        text: "On snow days and early releases, afternoon routes run on the same order but about 90 minutes earlier. Families are notified by phone and text.",
      },
    ],
  },
  {
    id: "district-calendar",
    title: "District Calendar",
    subtitle: "2025–2026",
    owner: student.district,
    blocks: [
      { kind: "lead", text: "Non-student days, holidays, and grading periods for the current school year." },
      {
        kind: "table",
        head: ["Date", "", ""],
        rows: [
          ["March 20", "End of third quarter", "Grading period"],
          ["March 23 – 27", "Spring break", "No school"],
          ["April 3", "Staff development day", "No school for students"],
          ["April 14 – 24", "State testing window", "5th grade ELA and math"],
          ["May 1", "Open house", "5:30 – 7:00 p.m."],
          ["May 25", "Memorial Day", "No school"],
          ["June 4", "5th grade promotion", "9:30 a.m."],
          ["June 5", "Last day of school", "Early release"],
        ],
      },
    ],
  },
  {
    id: "counseling",
    title: "Counseling Center",
    subtitle: "Support for students and families",
    owner: `${student.school} · Student Services`,
    blocks: [
      {
        kind: "lead",
        text: "The counseling office is open every school day. You can stop by during recess or lunch, or ask your teacher for a pass.",
      },
      { kind: "heading", text: "What counselors help with" },
      {
        kind: "list",
        items: [
          "Friendship problems, conflict, and anything that feels like bullying",
          "Worry about schoolwork, tests, or big changes at home",
          "Grief, family illness, and other hard news",
          "Planning ahead for middle school",
        ],
      },
      { kind: "heading", text: "Talk to someone" },
      {
        kind: "links",
        items: [
          { label: "Request time with a counselor", note: "Form on the office door, or ask your teacher" },
          { label: "Report a concern about a student", note: "Anonymous, checked each morning" },
          { label: "988 Suicide and Crisis Lifeline", href: "https://988lifeline.org", note: "Call or text 988, any time" },
          { label: "Crisis Text Line", href: "https://www.crisistextline.org", note: "Text HOME to 741741" },
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        text: "If you or someone you know is in immediate danger, tell an adult at school right away or call 911. Do not wait for a reply to a form.",
      },
    ],
  },
  {
    id: "tech-helpdesk",
    title: "Technology Help Desk",
    subtitle: "Chromebooks, logins, and apps",
    owner: `${student.district} · Technology`,
    blocks: [
      {
        kind: "lead",
        text: "Open a ticket and the technology team will reply through your school email, usually within one school day.",
      },
      { kind: "heading", text: "Try this first" },
      {
        kind: "definitions",
        items: [
          {
            term: "An app will not open",
            description: "Sign out of your portal, close every tab, then sign back in. This refreshes the connection between Clever and the app.",
          },
          {
            term: "The screen is frozen",
            description: "Hold the power button for ten seconds, wait, then turn the Chromebook back on.",
          },
          {
            term: "No sound",
            description: "Check the volume in the bottom-right corner, then unplug and replug your headphones.",
          },
          {
            term: "Wi-Fi will not connect",
            description: "Choose the LUSD-Student network. If it asks for a password, bring the device to the library.",
          },
        ],
      },
      { kind: "heading", text: "Open a ticket" },
      { kind: "ticket-form" },
      { kind: "heading", text: "In person" },
      {
        kind: "paragraph",
        text: "The device window in the library is open before school from 8:05 to 8:20 a.m. and at 5th grade lunch. Bring your Chromebook and charger.",
      },
    ],
  },
  {
    id: "library-catalog",
    title: "Library Catalog",
    subtitle: "Search the Lincoln Elementary collection",
    owner: `${student.school} · Library Media Center`,
    blocks: [
      {
        kind: "lead",
        text: "Search the shelves, see what is checked out, and place a hold. Holds are pulled each morning and sent to your classroom.",
      },
      { kind: "heading", text: "Checked out to you" },
      {
        kind: "table",
        head: ["Title", "Author", "Due"],
        rows: [
          ["Hatchet", "Gary Paulsen", "Thursday, March 19"],
          ["The Wild Robot", "Peter Brown", "Thursday, March 19"],
        ],
      },
      { kind: "heading", text: "Popular in 5th grade this month" },
      {
        kind: "table",
        head: ["Title", "Author", "Status"],
        rows: [
          ["Wonder", "R. J. Palacio", "3 of 6 available"],
          ["Holes", "Louis Sachar", "1 of 4 available"],
          ["The One and Only Ivan", "Katherine Applegate", "All copies out · 2 holds"],
          ["New Kid", "Jerry Craft", "2 of 3 available"],
          ["Front Desk", "Kelly Yang", "4 of 4 available"],
          ["Percy Jackson and the Lightning Thief", "Rick Riordan", "All copies out · 5 holds"],
        ],
      },
      { kind: "heading", text: "Borrowing rules" },
      {
        kind: "list",
        items: [
          "5th graders may borrow three books at a time for two weeks.",
          "Renew once online, or twice by asking Mrs. Whitfield.",
          "There are no late fines. Books just need to come back so someone else can read them.",
        ],
      },
      {
        kind: "links",
        items: [
          { label: "Destiny Discover", href: "https://www.destinydiscover.com", note: "Full catalog and holds" },
          { label: "Sora", href: "https://soraapp.com", note: "Ebooks and audiobooks" },
        ],
      },
    ],
  },
  {
    id: "yearbook",
    title: "Yearbook",
    subtitle: "2025–2026",
    owner: `${student.school} · Yearbook Club`,
    blocks: [
      {
        kind: "lead",
        text: "This year's book is 48 pages, full colour, and covers every class, every special, and both field trips.",
      },
      { kind: "heading", text: "Important dates" },
      {
        kind: "table",
        head: ["Date", ""],
        rows: [
          ["March 27", "Last day to submit photos"],
          ["April 10", "Orders close"],
          ["May 22", "Books arrive and are handed out in class"],
          ["May 29", "Signing party at afternoon recess"],
        ],
      },
      { kind: "heading", text: "Send in a photo" },
      {
        kind: "paragraph",
        text: "Yearbook Club is looking for photos from field trips, spirit days, and classroom projects. Photos need to be in focus, taken this school year, and show students who have a photo release on file. Hand them to Mr. Delgado on a flash drive or share them from your school account.",
      },
      {
        kind: "callout",
        tone: "info",
        text: "Every 5th grader gets a free copy this year, paid for by the spring fundraiser. Extra copies are $15.",
      },
    ],
  },
  {
    id: "family-portal",
    title: "Family Portal",
    subtitle: "For parents and guardians",
    owner: student.district,
    blocks: [
      {
        kind: "lead",
        text: "Families use the portal to follow along with attendance, report cards, and messages from teachers. Students do not sign in here — this page explains how to get a family account set up.",
      },
      { kind: "heading", text: "What families can see" },
      {
        kind: "list",
        items: [
          "Attendance and tardies, updated each afternoon",
          "Report cards and progress reports as soon as they are published",
          "Messages from Ms. Mangan and from the school office",
          "Forms that need a signature, including field trip permission",
        ],
      },
      { kind: "heading", text: "Getting an account" },
      {
        kind: "ordered",
        items: [
          "Ask the front office for an access code. Codes are given only to the guardians listed on a student's enrolment.",
          "Go to the Family Portal sign-up page and enter the code with an email address.",
          "Add each child using their own access code so all of them appear in one account.",
        ],
      },
      {
        kind: "links",
        items: [
          { label: "PowerSchool", href: "https://www.powerschool.com", note: "Where family accounts live" },
          { label: "Clever for Families", href: "https://clever.com/about/families", note: "How Clever works with schools" },
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    subtitle: "Technology agreement for students",
    owner: student.district,
    blocks: [
      {
        kind: "lead",
        text: "Every student and guardian signs this agreement before taking a district Chromebook home. The short version: school devices and accounts are for school work, and an adult can see what you do on them.",
      },
      { kind: "heading", text: "What you agree to" },
      {
        kind: "list",
        items: [
          "Use your own account, and never sign in as somebody else or share your password.",
          "Keep your Clever Badge and passwords private.",
          "Use school devices and accounts for schoolwork.",
          "Treat people online the way you would face to face.",
          "Tell an adult if you see something upsetting, mean, or unsafe, instead of passing it on.",
          "Look after your device, keep food and drink away from it, and bring it charged.",
        ],
      },
      { kind: "heading", text: "What is not allowed" },
      {
        kind: "list",
        items: [
          "Getting around the district content filter, or trying to.",
          "Installing extensions or apps that have not been approved.",
          "Recording or photographing anyone without their permission.",
          "Looking through another student's files or messages.",
        ],
      },
      { kind: "heading", text: "Privacy on school devices" },
      {
        kind: "paragraph",
        text: "District accounts and devices are filtered and monitored, as the Children's Internet Protection Act requires. Nothing on a school account is private from the district. Files are kept until the summer after a student leaves the district, then deleted.",
      },
      { kind: "heading", text: "If the agreement is broken" },
      {
        kind: "paragraph",
        text: "Most first problems are handled by a conversation with the teacher and a note home. Repeated or serious problems can mean losing the right to take a device home, and anything unsafe or unlawful is referred to the principal.",
      },
      {
        kind: "links",
        items: [
          { label: "Technology Help Desk", note: "Questions about this policy" },
          { label: "Student Handbook", note: "Full behavior expectations" },
        ],
      },
    ],
  },
];

/** District and school pages plus the ones teachers publish themselves. */
export const allResourcePages: ResourcePageContent[] = [...resourcePages, ...teacherResourcePages];

export const resourcePagesById = new Map(allResourcePages.map((page) => [page.id, page]));
