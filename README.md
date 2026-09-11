# Clever Student Portal — UI recreation

A working recreation of the Clever student portal, built with Vite + React +
TypeScript. Every page is built out, every control does something, and
application tiles open the real product they name.

> Interface recreation, not affiliated with or endorsed by Clever Inc. It talks
> to no Clever service and has no account behind it. There is no username or
> password field anywhere in the project, and nothing is collected, stored, or
> transmitted. The student, school, and district are sample data.

```bash
npm install
npm run dev          # http://localhost:5173
```

---

## What the reproduction was measured against

No reference screenshots were supplied, and this environment's network policy
blocks `clever.com` and every Clever asset host, so the portal could not be
captured or inspected directly.

Rather than estimate the design, the interface is built against Clever's own
published source of truth: **[`clever-components`](https://www.npmjs.com/package/clever-components)**
(`github.com/Clever/components`), the React component library Clever publishes to
npm and maintains under `@clever.com` accounts. It contains the portal's actual
building blocks — `TopBar`, `LeftNav`, `ResourceTile`, `Menu`, `Logo` — along with
the generated colour, sizing, radius and shadow tokens behind them.

Every number in `src/styles/tokens.css` is transcribed from that package, with the
originating file noted inline. The values that shape the layout:

| Element | Value | Source |
| --- | --- | --- |
| Bar height | `3.75rem` (60px) | `src/TopBar/common.less` |
| Bar ground | `#436cf2` | `src/TopBar/index.less` |
| Bar shadow | `0 1px 6px 2px rgba(33, 70, 189, 0.25)` | `src/TopBar/index.less` |
| Bar control height | 52px (bar less `@size_xs`) | `src/TopBar/TopBarButton.less` |
| Bar control hover | `rgba(0, 0, 0, 0.15)` | `src/TopBar/TopBarButton.less` |
| Active indicator | 3px white bar, inset 12px, `opacity: 0.8` | `src/TopBar/TopBarButton.less` |
| Logo | 198:55 viewBox, `height: 1em` at `font-size: 1.75rem` | `src/Logo/index.tsx` |
| Sidebar width | 225px | `src/LeftNav/sizing.less` (computed, see below) |
| Sidebar ground | `#fafbfc` | `src/LeftNav/LeftNav.less` |
| Sidebar text | `#2146bd` | `src/LeftNav/LeftNav.less` |
| Nav row | 16px padding-y around a 24px line = 56px | `src/LeftNav/NavLink.less` |
| Nav selected rule | `inset 3px 0 #436cf2` | `src/LeftNav/NavLink.less` |
| Tile icon | 80 / 104 / 128px (small / medium / large) | `src/ResourceTile/ResourceTile.less` |
| Tile padding | 12 / 14 / 16px | `src/ResourceTile/ResourceTile.less` |
| Tile title | 12 / 14 / 16px, centred, `break-word` | `src/ResourceTile/ResourceTile.less` |
| Icon rounding | `border-radius: 10%` | `src/ResourceTile/ResourceTile.less` |
| Tile hover | `0 3px 3px 1px rgba(71, 76, 94, 0.2)`, 200ms linear | `src/less/animations.less` |
| Menu dropdown | 1px `#e3e6eb`, 3px radius, `0 2px 4px rgba(21, 19, 28, 0.1)` | `src/Menu/Menu.less` |
| Field chrome | 1px `#e3e6eb`, 4px radius, 8px padding-x | `src/TextInput2/TextInput2.less` |
| Focus ring | `0 0 0 4px #809dff80` plus a 1px blue border | `src/TextInput2/TextInput2.less` |

The sidebar width is not a round number in the original — it is summed from parts:
`16 (padding) + 24 (icon) + 12 (gap) + 140 (label) + 8 + 16 + 8 (arrow) + 1 (border) = 225px`.
It is reproduced at 225px rather than rounded to a grid value.

`npm run check:geometry` renders the app and asserts 18 of these measurements
against the DOM, so drift is caught rather than eyeballed.

## Typography

Clever's stack, verbatim from `src/less/fonts.less`:

```css
font-family: "Proxima Nova", "Helvetica Neue", Arial, Helvetica, sans-serif;
```

Proxima Nova is licensed and self-hosted by Clever at `assets.clever.com/fonts/`,
so it cannot be redistributed here. The stack above is kept as-is with one locally
bundled fallback inserted after it — **Figtree**, a humanist geometric sans with a
comparable x-height and width — so it renders close to the real portal on machines
without Proxima Nova while still preferring the genuine face where it is installed.

## Iconography

Clever's component library depends on `react-fontawesome@^1.6.1`, so its UI icons
are Font Awesome 4. `npm run generate:icons` extracts the outlines straight from
the Font Awesome 4.7.0 SVG font into `src/lib/icons.tsx`, which keeps the search,
bell, heart, chevron and grid glyphs identical to the ones the real portal draws.
No second icon set is mixed in and no emoji are used.

## Application artwork

`npm run generate:app-icons` writes 117 square icons into `public/app-icons/` from
three sources, in descending order of fidelity:

1. **Real full-colour vendor logos** from [`@iconify-json/logos`](https://www.npmjs.com/package/@iconify-json/logos)
   (the SVG Logos collection): Google Drive, Gmail, Google Meet, Google Calendar,
   Google Keep, Khan Academy, YouTube, Zoom, Microsoft Teams, OneDrive.
2. **Official single-colour marks and brand hexes** from
   [`simple-icons`](https://simpleicons.org): Google Classroom, Docs, Slides,
   Sheets, Forms, Earth, Quizlet, Instructure, Scratch, Kahoot!, Duolingo, Padlet,
   Screencastify, Wikipedia. Clever Badges and Clever Goals use the "C" from
   Clever's own logo outline.
3. **Wordmark and monogram tiles** for everything else, auto-fitted to the tile.
   That is the form most real ed-tech app icons take — IXL's icon is literally
   "IXL" reversed out of green.

### Real logos

Most of the products in a school portal are K-12 education vendors, and their
logos are not redistributable through any package — `simple-icons` and the SVG
Logos collection are both developer-tool oriented and carry almost none of them.
So for those apps the portal asks the web for the logo the vendor actually
publishes, and the generated tile becomes the fallback.

Two ways it works, and you can use either or both:

**Runtime, no setup.** Out of the box, a tile whose bundled artwork is a
stand-in loads the vendor's published logo through a favicon service and falls
back to the tile if that does not load. `src/lib/logoSource.ts` has one constant
to change:

| `LOGO_SERVICE` | Behaviour |
| --- | --- |
| `"google"` (default) | Google's favicon service. Best coverage and the largest renditions. One request per app to google.com. |
| `"duckduckgo"` | DuckDuckGo's icon service. No Google requests; smaller renditions. |
| `"off"` | No outside requests. Every tile uses bundled artwork. |

**Baked in, permanent.** Better result and no runtime requests:

```bash
npm run fetch:logos          # downloads real logos into assets/app-icons/
npm run generate:app-icons   # bakes them into public/app-icons/
```

`fetch:logos` reads each app's real domain and tries, in order, the site's own
apple-touch-icon (usually 180px and the nicest artwork), any declared
`<link rel="icon">`, `/favicon.ico`, then the favicon service. Flags:
`--only=ixl,capti-voice`, `--force`, `--skip-real`. Anything it cannot find keeps
its generated tile and is listed at the end.

You can also just drop files in by hand: `assets/app-icons/<app-id>.svg` or
`.png` replaces the artwork for that id, and the id is the file name the tile
already asks for — `/app-icons/ixl.svg` means `assets/app-icons/ixl.svg`.

The fallback chain is: vendor logo → bundled tile → a coloured monogram plate, so
a tile is never a broken image.

## Study Hall

`Study Hall` sits in School Resources. It opens a page with an access code
field; entering **1212** replaces the portal's apps with a game catalog imported
from [lauraevan/greatestgreatest-revive](https://github.com/lauraevan/greatestgreatest-revive) —
6,082 games across 12 collections. The left nav switches to the collections, the
games have their own search, each collection shows 24 tiles with a "show all",
and *Close Study Hall* puts the school portal back. The state persists in
`localStorage`.

The code is checked in the browser, so it keeps the portal tidy rather than
keeping anybody out — anyone reading the page source can find it. It is a
switch, not a lock. Change it in `src/lib/useGamesMode.ts`.

```bash
npm run import:games         # re-imports the catalog from GitHub
```

The catalog lands in `src/data/games.json` (1.6 MB) and is loaded on demand, so
it is a separate chunk and never touches the portal's main bundle. Icons and
launcher pages are served from the source repositories through jsDelivr rather
than copied here — the two directories come to about 150 MB, and pointing at the
source means the catalog updates when it does. 1,802 of the games already launch
from their own hosts.

## Pages## Pages

| Route | Page |
| --- | --- |
| `#/` | The portal: Teacher Pages, Favorites, Classroom, School and District Resources, Clever Library |
| `#/teacher/:id` | A Teacher Page — Ms. Mangan's class, the library, music, PE, technology |
| `#/library` | Clever Library, searchable and filtered by subject |
| `#/notifications` | Every notification, grouped unread and earlier |
| `#/account` | Account settings: identity, how you log in, icon size, saved data |
| `#/page/:id` | A page the school or district hosts (21 of them, below) |
| `#/app/:id` | An app the district has not finished setting up |
| `#/login` | The district sign-in screen |

With Study Hall open, `#/` shows the game catalog instead of the portal's apps.

Application tiles open the product's real site, the way single sign-on would land
you there. Tiles for things a school hosts itself open a page inside the portal,
because that is where they live in a real deployment too:

- **Clever's own** — Clever Badge (with a badge card), Clever Goals (weekly
  targets with progress)
- **District** — Student Handbook, District Calendar, Bus Routes, Counseling
  Center, Technology Help Desk (with a working ticket form), Family Portal,
  Acceptable Use Policy
- **School** — Lunch Menu, Library Catalog, Yearbook, Study Hall
- **Teacher-written** — Daily Schedule, Spelling List, Classroom Jobs, Birthday
  Calendar, How to Cite a Source, Recorder Fingering Chart, Spring Concert Songs,
  Fitness Log, Chromebook Care

Each carries real content — schedules, menus, route tables, borrowing rules,
fingering charts — rather than placeholder text.

## Sample data

- **Student** — Evan, 5th Grade
- **Homeroom** — Ms. Mangan, Room 12, whose Teacher Page carries the day-to-day
  work (Morning Work, Reading Block, Math Block, a science unit, class links)
- **Specials** — Library Media Center, Music, PE and Health, Technology Resources
- **117 applications** including IXL, Capti Voice, Lexia Core5, i-Ready, Zearn,
  Raz-Kids, Epic!, Newsela, Mystery Science, Prodigy, ST Math, XtraMath, Seesaw,
  Nearpod, Pear Deck, PebbleGo, Sora, Destiny Discover, BrainPOP, Generation
  Genius, GoNoodle, Second Step, QuaverMusic, Star 360, MAP Growth, PowerSchool,
  Read&Write, Snap&Read, Bookshare, Learning Ally and the Clever Library catalog

School and district names are placeholders — `Lincoln Elementary School` and
`Lincoln Unified School District`. Both, with the student's name, grade and
homeroom, are in `src/data/student.ts` and can be changed in one place.

## Structure

```
src/
  components/   CleverHeader, CleverSidebar, NavItem, TopBarButton, SearchControl,
                NotificationsMenu, ProfileMenu, Menu, Section, ResourceGrid,
                ResourceTile, AppIcon, TeacherPageTile, CleverLogo,
                CleverBadgeCard, GoalsList, TicketForm, StudyHallGate
  pages/        Dashboard, GamesPortal, TeacherPage, ResourcePage, LibraryPage,
                NotificationsPage, AccountSettings, AppView, SignIn
  data/         apps.ts, teacherPages.ts, resourcePages.ts,
                teacherResourcePages.ts, navigation.ts, notifications.ts,
                goals.ts, student.ts, types.ts,
                games.json + realIcons.json (generated)
  lib/          icons.tsx (generated), router.ts, search.ts, games.ts,
                logoSource.ts, useFavorites.ts, useGamesMode.ts,
                useStoredValue.ts
  styles/       tokens.css, base.css
scripts/        generators and the verification scripts
assets/         drop-in overrides for real vendor logos
```

Portal-hosted pages are written as structured content blocks (`lead`, `heading`,
`table`, `definitions`, `links`, `callout`, `badge`, `goals`, `ticket-form`) in
`src/data/types.ts` and rendered by one `ResourcePage` component, so adding a page
is a data change.

Routing is eight hash routes handled in `src/lib/router.ts` rather than a routing
dependency.

## Behaviour

- **Search** lives in the blue bar: the control becomes an inline field with a
  results list beneath it, covering applications, links, Teacher Pages, and the
  resources inside them. Typing filters, arrow keys move, Enter opens, Escape
  closes. It is deliberately not a command palette and carries no ⌘K affordance.
- **Notifications** open a dropdown with the four most recent and a link to the
  full page, where they can be marked read individually or all at once.
- **The profile menu** reaches account settings, the Clever Badge, goals,
  notifications, and log out.
- **Favorites** toggle from a small outline heart on each tile, move the app into
  the Favorites section, and persist to `localStorage`.
- **Icon size** is a real setting: choosing small, medium or large in account
  settings redraws every tile at Clever's 80, 104 or 128px, and persists.
- **Left nav** covers all six sections; it scrolls to a section and tracks the one
  on screen, including at the bottom of the page where the last section can no
  longer reach the top.
- **The help desk ticket form** validates, submits, and returns a reference.
- **Sign-in** is a set of single-sign-on choices, as Clever's real login page is.

Hover is a single soft shadow fading in over 200ms — the same `::after` technique
Clever uses, because `box-shadow` animates poorly. Nothing scales, bounces, or glows.

## Verification

```bash
npm run dev      # in one shell
npm run check    # typecheck, lint, geometry, accessibility, nav tracking
```

- `check:geometry` asserts 18 measurements against the DOM, and screenshots
  1440×900, 1920×1080, 1536×864, 1366×768, 1024×768, 820×1180 and 414×896, failing
  on any horizontal overflow.
- `check:a11y` runs 30 checks: landmarks, headings, decorative artwork, toggle
  state, keyboard operation of search and menus, Escape handling, a visible focus
  ring, that sign-in has no input fields at all, that five portal pages render,
  that the ticket form returns a reference, that the library filters, that marking
  all notifications read works, that the icon-size setting reaches the portal, and
  that Study Hall rejects a wrong code, opens on 1212, swaps the left nav,
  filters, survives a reload, and restores the school portal when closed.
- `node scripts/interactions.mjs` captures every page and dropdown for review.

Screenshots land in `screenshots/` (gitignored); set `SHOT_DIR` to redirect them
and `CHROMIUM_PATH` to point Playwright at an existing browser.

## Deviations from the original, and why

1. **App logos are loaded, not bundled.** No package carries K-12 education
   logos, and vendor hosts are unreachable from the environment this was built
   in, so the generated tiles are stand-ins that a vendor's published logo
   replaces at runtime. `npm run fetch:logos` makes that permanent. The runtime
   path could not be tested from here — the sandbox blocks the favicon services
   too — so it is written to fall back cleanly rather than break.
2. **Font** — Proxima Nova is licensed and cannot be shipped; Figtree stands in
   behind it.
3. **Focus rings** — Clever's `.button--reset` clears the outline on `:focus`
   outright, which predates `:focus-visible` and leaves keyboard users with no
   indicator. The clearing is scoped to `:focus:not(:focus-visible)` so pointer
   interaction looks the same while keyboard focus stays visible. Clever's reset
   also transitions `all`, which would animate the ring in; outline is excluded
   from that transition so the ring appears immediately.
4. **No authentication.** The sign-in screen reproduces the shape of Clever's real
   login page — single-sign-on choices rather than a password box — and stops
   there. It has no fields, no provider integration, and no account behind it.
5. **Page composition and content** — the component library supplies the parts and
   their exact measurements but not the portal's page assembly, and no reference
   screenshot was available. Which sections appear, the app catalog, the page set,
   and the school and district names are all sample content. Every visual value
   used to build them is Clever's own.

## Licences

Font Awesome 4.7.0 icons are SIL OFL 1.1 / CC BY 4.0. Brand marks from
`simple-icons` and the SVG Logos collection remain the property of their
respective owners and are used here to represent those products. The Clever
wordmark is the property of Clever Inc. and appears only to reproduce the
interface being studied.
