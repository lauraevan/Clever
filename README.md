# Clever Student Portal — UI replica

A local, demo-only recreation of the Clever student portal interface, built with
Vite + React + TypeScript.

> This is a UI reproduction for demonstration purposes. It is **not** affiliated
> with, endorsed by, or connected to Clever Inc. It talks to no Clever service,
> has no account behind it, and never asks for, stores, or transmits credentials.
> All student, school, and district data in it is fictional.

```bash
npm install
npm run dev          # http://localhost:5173
```

---

## What the reproduction was measured against

No reference screenshots were supplied with this task, and this environment's
network policy blocks `clever.com` and every Clever asset host, so the portal
could not be captured or inspected directly.

Rather than estimate the design, the replica is built against Clever's own
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
so it cannot be redistributed here. The replica keeps Clever's stack and inserts
one locally bundled fallback after it — **Figtree**, a humanist geometric sans with
a comparable x-height and width — so it renders close to the real portal on machines
without Proxima Nova while still preferring the genuine face where it is installed.
This is the one substitution in the project that is a judgement call rather than a
transcription.

## Iconography

Clever's component library depends on `react-fontawesome@^1.6.1`, so its UI icons
are Font Awesome 4. `npm run generate:icons` extracts the outlines straight from
the Font Awesome 4.7.0 SVG font into `src/lib/icons.tsx`, which keeps the search,
bell, heart, chevron and grid glyphs identical to the ones the real portal draws.
No second icon set is mixed in and no emoji are used.

## Application artwork

`npm run generate:app-icons` writes square artwork into `public/app-icons/`:

- Products carried by [`simple-icons`](https://simpleicons.org) (Google Classroom,
  Google Drive, Khan Academy, Quizlet, Canvas, Scratch, Kahoot!, Duolingo and
  others) use the **official brand mark and official brand hex** from that package.
- Products it does not carry (Schoology, IXL, i-Ready, Newsela, Nearpod, Seesaw
  and the district links) are drawn as brand-coloured letterform tiles in the same
  square app-icon idiom — real tiles, not lettered placeholders.

Artwork is full-bleed square with no rounding baked in, because Clever rounds icons
in CSS at `border-radius: 10%`.

## Structure

```
src/
  components/   CleverHeader, CleverSidebar, NavItem, TopBarButton, SearchControl,
                NotificationsMenu, ProfileMenu, Menu, Section, ResourceGrid,
                ResourceTile, TeacherPageTile, CleverLogo, Toast
  pages/        Dashboard, TeacherPage, AppView, DemoLogin
  data/         apps.ts, teacherPages.ts, navigation.ts, notifications.ts, student.ts
  lib/          icons.tsx (generated), router.ts, search.ts, useFavorites.ts
  styles/       tokens.css, base.css
scripts/        generators and the verification scripts
```

Routing is four hash routes handled in `src/lib/router.ts` rather than a routing
dependency.

## Behaviour

- **Search** lives in the blue bar: the control becomes an inline field with a
  results list beneath it, covering applications, links, Teacher Pages, and the
  resources inside them. Typing filters, arrow keys move, Enter opens, Escape
  closes. It is deliberately not a command palette and carries no ⌘K affordance.
- **Notifications** and the **profile menu** open Clever-chrome dropdowns; both
  close on Escape or an outside click.
- **Favorites** toggle from a small outline heart on each tile, move the app into
  the Favorites section, and persist to `localStorage`.
- **Left nav** scrolls to a section and tracks the one on screen as you scroll.
- **Teacher Pages** open onto their own page, keeping the bar and nav, with a Back
  control and the teacher's own resource sections.
- **Tiles** open external sites in a new tab, internal apps onto a local screen,
  and unavailable apps onto Clever's not-set-up state.
- **Log out** returns to a local demo landing screen with a single
  "Continue to demo" control and no credential fields anywhere.

Hover is a single soft shadow fading in over 200ms — the same `::after` technique
Clever uses, because `box-shadow` animates poorly. Nothing scales, bounces, or glows.

## Verification

```bash
npm run dev      # in one shell
npm run check    # typecheck, lint, geometry, accessibility, nav tracking
```

- `check:geometry` also screenshots 1440×900, 1920×1080, 1536×864, 1366×768,
  1024×768, 820×1180 and 414×896, and fails on any horizontal overflow.
- `check:a11y` covers landmarks, headings, decorative artwork, toggle state,
  keyboard operation of search and menus, Escape handling, a visible focus ring,
  and that the demo landing screen collects no credentials.
- `node scripts/interactions.mjs` captures the dropdowns, hover, Teacher Page,
  favourites and mobile nav for visual review.

Screenshots land in `screenshots/` (gitignored); set `SHOT_DIR` to redirect them
and `CHROMIUM_PATH` to point Playwright at an existing browser.

## Deviations from the original, and why

Three, all deliberate:

1. **Font** — Proxima Nova is licensed and cannot be shipped; Figtree stands in
   behind it (above).
2. **Focus rings** — Clever's `.button--reset` clears the outline on `:focus`
   outright, which predates `:focus-visible` and leaves keyboard users with no
   indicator. The clearing is scoped to `:focus:not(:focus-visible)` so pointer
   interaction looks the same while keyboard focus stays visible. Clever's reset
   also transitions `all`, which would animate the ring in; outline is excluded
   from that transition so the ring appears immediately.
3. **Page composition** — the component library supplies the parts and their exact
   measurements but not the portal's page assembly, and no reference screenshot was
   available. Which sections appear, and in what order, follows the structure given
   in the task brief. Every visual value used to build them is still Clever's own.

## Licences

Font Awesome 4.7.0 icons are SIL OFL 1.1 / CC BY 4.0. Brand marks from
`simple-icons` remain the property of their respective owners and are used here to
represent those products. The Clever wordmark is the property of Clever Inc. and
appears only to reproduce the interface being studied.
