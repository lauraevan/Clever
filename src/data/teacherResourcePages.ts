import type { ResourcePageContent } from "./types";

/**
 * Pages a teacher wrote themselves and published through their Teacher Page —
 * the class schedule, the spelling list, the concert songs. They render through
 * the same page component as the district's pages.
 */
export const teacherResourcePages: ResourcePageContent[] = [
  {
    id: "mangan-schedule",
    title: "Daily Schedule",
    subtitle: "Room 12 · 5th Grade",
    owner: "Ms. Mangan",
    blocks: [
      {
        kind: "lead",
        text: "Our day, start to finish. Specials change by the day, so check the second table before you pack up.",
      },
      {
        kind: "table",
        head: ["Time", "What we're doing"],
        rows: [
          ["8:20", "Unpack, morning work, attendance"],
          ["8:40", "Morning meeting"],
          ["9:00", "Reading workshop"],
          ["10:05", "Snack and recess"],
          ["10:25", "Writing workshop"],
          ["11:10", "Math workshop"],
          ["11:55", "Lunch and recess"],
          ["12:40", "Read aloud"],
          ["1:00", "Specials"],
          ["1:50", "Science or social studies"],
          ["2:35", "Clean up, pack up, dismissal"],
        ],
      },
      { kind: "heading", text: "Specials" },
      {
        kind: "table",
        head: ["Day", "Special", "What to bring"],
        rows: [
          ["Monday", "Music with Mr. Delgado", "Recorder"],
          ["Tuesday", "PE with Coach Reyes", "Sneakers"],
          ["Wednesday", "Music with Mr. Delgado", "Recorder"],
          ["Thursday", "Library with Mrs. Whitfield", "Books to return"],
          ["Friday", "PE with Coach Reyes", "Sneakers"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "On early release Wednesdays we skip science and dismiss at 1:20.",
      },
    ],
  },
  {
    id: "mangan-spelling",
    title: "Spelling List",
    subtitle: "Unit 24 · Greek and Latin roots",
    owner: "Ms. Mangan",
    blocks: [
      {
        kind: "lead",
        text: "Twenty words this week, all built from roots we have studied. The test is Friday morning.",
      },
      { kind: "heading", text: "This week's words" },
      {
        kind: "table",
        head: ["Word", "Root", "What the root means"],
        rows: [
          ["telescope", "tele", "far off"],
          ["telegraph", "tele + graph", "far off + write"],
          ["microscope", "micro + scope", "small + look at"],
          ["biography", "bio + graph", "life + write"],
          ["autograph", "auto + graph", "self + write"],
          ["photograph", "photo + graph", "light + write"],
          ["geology", "geo + logy", "earth + study of"],
          ["geography", "geo + graph", "earth + write"],
          ["thermometer", "thermo + meter", "heat + measure"],
          ["barometer", "baro + meter", "weight + measure"],
          ["aquarium", "aqua", "water"],
          ["aquatic", "aqua", "water"],
          ["transport", "trans + port", "across + carry"],
          ["export", "ex + port", "out + carry"],
          ["import", "im + port", "in + carry"],
          ["predict", "pre + dict", "before + say"],
          ["dictate", "dict", "say"],
          ["spectator", "spect", "look"],
          ["inspect", "in + spect", "into + look"],
          ["respect", "re + spect", "again + look"],
        ],
      },
      { kind: "heading", text: "How to practice" },
      {
        kind: "list",
        items: [
          "Monday: copy each word and underline the root.",
          "Tuesday: sort the words by root in your notebook.",
          "Wednesday: write five sentences using words from three different roots.",
          "Thursday: practice on Quizlet, then have someone at home quiz you.",
        ],
      },
      {
        kind: "links",
        items: [
          { label: "Quizlet set for Unit 24", href: "https://quizlet.com", note: "Flashcards and a practice test" },
        ],
      },
    ],
  },
  {
    id: "mangan-jobs",
    title: "Classroom Jobs",
    subtitle: "March rotation",
    owner: "Ms. Mangan",
    blocks: [
      {
        kind: "lead",
        text: "Everyone has a job for the month. We rotate on the first Monday, and I post the new list here.",
      },
      {
        kind: "table",
        head: ["Job", "What it involves", "Who has it"],
        rows: [
          ["Line leader", "Lead the line to specials, lunch, and recess", "Priya"],
          ["Door holder", "Hold the door and count the class through", "Marcus"],
          ["Librarian", "Shelve books and run the Thursday return bin", "Evan"],
          ["Tech helper", "Hand out and plug in Chromebooks", "Sofia"],
          ["Board cleaner", "Wipe the whiteboard at the end of the day", "Jonah"],
          ["Plant keeper", "Water the windowsill plants on Monday and Thursday", "Amara"],
          ["Recess equipment", "Carry the ball bag out and back", "Theo"],
          ["Messenger", "Take notes and attendance to the office", "Lucia"],
          ["Table captains", "Collect and hand back work for your table", "One per table"],
          ["Substitute", "Cover any job when someone is absent", "Nadia"],
        ],
      },
      { kind: "heading", text: "If you want to switch" },
      {
        kind: "paragraph",
        text: "Write your name and the job you want on the sign-up sheet by the sink. If two people want the same job, we draw for it at morning meeting.",
      },
    ],
  },
  {
    id: "mangan-birthdays",
    title: "Birthday Calendar",
    subtitle: "Room 12",
    owner: "Ms. Mangan",
    blocks: [
      {
        kind: "lead",
        text: "We sing at morning meeting on the day, or on the Monday after if it falls on a weekend. Summer birthdays get a half-birthday in the winter.",
      },
      {
        kind: "table",
        head: ["Month", "Birthdays"],
        rows: [
          ["September", "Marcus (4), Lucia (19)"],
          ["October", "Theo (2), Priya (28)"],
          ["November", "Jonah (11)"],
          ["December", "Amara (7), Nadia (30)"],
          ["January", "Sofia (15)"],
          ["February", "Evan (9)"],
          ["March", "Oliver (3), Maya (22)"],
          ["April", "Isabel (18)"],
          ["May", "Dev (6), Harper (27)"],
          ["June to August", "Half-birthdays in January: Leo, Zara, Caleb"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Please do not bring food to share. We have two families with severe nut allergies. Stickers, pencils, or a book donated to our shelf are all welcome.",
      },
    ],
  },
  {
    id: "library-citation",
    title: "How to Cite a Source",
    subtitle: "5th grade research guide",
    owner: "Mrs. Whitfield · Library Media Center",
    blocks: [
      {
        kind: "lead",
        text: "When you use somebody else's words, pictures, or ideas, you say where you got them. That is a citation, and it is how you give credit.",
      },
      { kind: "heading", text: "What every citation needs" },
      {
        kind: "definitions",
        items: [
          { term: "Who", description: "The author's name, last name first. If there is no author, start with the title." },
          { term: "What", description: "The title of the book, article, or page." },
          { term: "Where", description: "The publisher or the website name, and the web address for online sources." },
          { term: "When", description: "The year it was published, and the date you looked at it for a website." },
        ],
      },
      { kind: "heading", text: "Patterns to copy" },
      {
        kind: "table",
        head: ["Kind of source", "Pattern"],
        rows: [
          ["Book", "Last, First. Title of Book. Publisher, Year."],
          ["Article in a database", "Last, First. “Title of Article.” Database Name, Year, web address."],
          ["Website", "Last, First. “Title of Page.” Website Name, Year, web address. Accessed Day Month Year."],
          ["Video", "“Title of Video.” Channel or Site, Year, web address."],
        ],
      },
      { kind: "heading", text: "Worked example" },
      {
        kind: "paragraph",
        text: "Paulsen, Gary. Hatchet. Simon & Schuster, 1987. That is a whole citation: who wrote it, what it is called, who published it, and when.",
      },
      { kind: "heading", text: "Common mistakes" },
      {
        kind: "list",
        items: [
          "Copying sentences straight from a source without quotation marks. Put it in your own words, or quote it and cite it.",
          "Citing the search engine instead of the page you actually read.",
          "Forgetting the date you visited a website. Websites change.",
        ],
      },
      {
        kind: "links",
        items: [
          { label: "PebbleGo", href: "https://pebblego.com", note: "Builds the citation for you at the bottom of each article" },
          { label: "Destiny Discover", href: "https://www.destinydiscover.com", note: "Citation button on every catalog record" },
        ],
      },
    ],
  },
  {
    id: "music-recorder",
    title: "Recorder Fingering Chart",
    subtitle: "Soprano recorder, baroque fingering",
    owner: "Mr. Delgado · Music",
    blocks: [
      {
        kind: "lead",
        text: "Left hand on top, thumb on the back hole. A filled circle means cover the hole; an open circle means leave it open.",
      },
      {
        kind: "table",
        head: ["Note", "Thumb", "Left hand", "Right hand"],
        rows: [
          ["B", "●", "● ○ ○", "○ ○ ○ ○"],
          ["A", "●", "● ● ○", "○ ○ ○ ○"],
          ["G", "●", "● ● ●", "○ ○ ○ ○"],
          ["High C", "●", "○ ● ●", "○ ○ ○ ○"],
          ["High D", "○", "○ ● ●", "○ ○ ○ ○"],
          ["E", "●", "● ● ●", "● ● ○ ○"],
          ["D", "●", "● ● ●", "● ● ● ○"],
          ["C", "●", "● ● ●", "● ● ● ●"],
          ["F", "●", "● ● ●", "● ○ ● ●"],
        ],
      },
      { kind: "heading", text: "Getting a clean sound" },
      {
        kind: "list",
        items: [
          "Blow gently and steadily. Hard air makes the note squeak up an octave.",
          "Start each note with a soft “doo” from your tongue, not a puff from your chest.",
          "Cover each hole with the flat pad of your finger, not the tip.",
          "Check for leaks: if a note squeals, one of your fingers is not sealing.",
        ],
      },
      { kind: "heading", text: "Care" },
      {
        kind: "paragraph",
        text: "Swab the inside with the cleaning rod after you play, and let it air dry before it goes back in the bag. Take the recorder apart at the joints, never by twisting the middle.",
      },
    ],
  },
  {
    id: "music-concert",
    title: "Spring Concert Songs",
    subtitle: "Thursday, May 14 · 6:30 p.m. in the gym",
    owner: "Mr. Delgado · Music",
    blocks: [
      {
        kind: "lead",
        text: "The 5th grade sings four songs and plays two on recorder. Call time is 6:00 p.m. in Room 12.",
      },
      {
        kind: "table",
        head: ["#", "Song", "What you're doing"],
        rows: [
          ["1", "This Little Light of Mine", "All grades, two parts"],
          ["2", "Sing a Rainbow", "5th grade, three-part round"],
          ["3", "Ode to Joy", "Recorder, melody and harmony"],
          ["4", "Hot Cross Buns variations", "Recorder, small groups"],
          ["5", "Lean on Me", "5th grade, with solos"],
          ["6", "Seasons of Love", "All grades, finale"],
        ],
      },
      { kind: "heading", text: "What to wear" },
      {
        kind: "list",
        items: [
          "A white top and dark trousers or a dark skirt.",
          "Dark shoes you can stand still in for half an hour.",
          "No hats, no gum, and nothing that jingles.",
        ],
      },
      { kind: "heading", text: "Practice at home" },
      {
        kind: "paragraph",
        text: "Recordings of all six songs, split into parts, are on QuaverMusic under Spring Concert. Aim for ten minutes a night rather than an hour the day before.",
      },
      {
        kind: "links",
        items: [
          { label: "QuaverMusic", href: "https://www.quavered.com", note: "Part recordings and lyrics" },
        ],
      },
    ],
  },
  {
    id: "pe-fitness",
    title: "Fitness Log",
    subtitle: "Spring unit · 5th grade",
    owner: "Coach Reyes · Physical Education",
    blocks: [
      {
        kind: "lead",
        text: "Log twenty minutes of activity on at least four days a week. Anything that gets you breathing hard counts, including walking the dog and riding a bike.",
      },
      { kind: "heading", text: "This week" },
      {
        kind: "table",
        head: ["Day", "Activity", "Minutes"],
        rows: [
          ["Monday", "PE class · relay races", "45"],
          ["Tuesday", "Bike to the park", "30"],
          ["Wednesday", "Recess soccer", "20"],
          ["Thursday", "Rest day", "—"],
          ["Friday", "PE class · fitness circuit", "45"],
          ["Saturday", "Family walk", "40"],
          ["Sunday", "Not logged yet", "—"],
        ],
      },
      { kind: "heading", text: "The five fitness areas we test" },
      {
        kind: "definitions",
        items: [
          { term: "Heart and lung endurance", description: "The PACER run. We test in September, January, and May." },
          { term: "Muscle strength", description: "Push-ups, held at a steady count." },
          { term: "Muscle endurance", description: "Curl-ups, also on a count." },
          { term: "Flexibility", description: "Sit and reach, both sides." },
          { term: "Body composition", description: "Height and weight, recorded privately and never shared with the class." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "You are competing with your own last score, not with anybody else's. Improving your own number is what counts.",
      },
    ],
  },
  {
    id: "tech-chromebook",
    title: "Chromebook Care",
    subtitle: "Taking a district device home",
    owner: "Mr. Patel · Instructional Technology",
    blocks: [
      {
        kind: "lead",
        text: "Your Chromebook belongs to the district and goes home with you for the year. Look after it and it will last.",
      },
      { kind: "heading", text: "Every day" },
      {
        kind: "list",
        items: [
          "Charge it overnight at home and bring it to school charged.",
          "Carry it closed, with two hands, and put it in your backpack in the padded sleeve.",
          "Keep food and drinks away from it. Water is the fastest way to kill a keyboard.",
          "Shut the lid gently, and never leave a pencil or earbuds on the keyboard.",
        ],
      },
      { kind: "heading", text: "Never" },
      {
        kind: "list",
        items: [
          "Peel off the district asset tag or add stickers to the lid.",
          "Lend it to a sibling or a friend. It is signed out to you.",
          "Leave it in a car, on a bus, or anywhere it could freeze or overheat.",
          "Try to open the case or fix a cracked screen yourself.",
        ],
      },
      { kind: "heading", text: "If something breaks" },
      {
        kind: "paragraph",
        text: "Tell your teacher the same day and open a ticket with the help desk. Accidents happen, and reporting them straight away is never the thing that gets you in trouble. Loaner devices are available from the library while yours is repaired.",
      },
      {
        kind: "table",
        head: ["What happened", "What to expect"],
        rows: [
          ["Won't charge", "Swap the charger at the library window first"],
          ["Cracked screen", "Repair takes two to three school days"],
          ["Liquid spill", "Power it off, do not charge it, bring it in immediately"],
          ["Lost or stolen", "Report it the same day so the device can be locked remotely"],
        ],
      },
      {
        kind: "links",
        items: [
          { label: "Technology Help Desk", note: "Open a ticket" },
          { label: "Acceptable Use Policy", note: "What you agreed to at the start of the year" },
        ],
      },
    ],
  },
];
