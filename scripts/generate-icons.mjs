/**
 * Generates src/lib/icons.tsx from the real Font Awesome 4.7 glyph outlines.
 *
 * Clever's component library renders its UI icons with `react-fontawesome`
 * (see the dependency list in clever-components' package.json), which is a
 * wrapper around Font Awesome 4. Extracting the outlines from the 4.7.0 SVG
 * font keeps the replica's search / bell / heart / chevron glyphs identical to
 * the ones the real portal draws, instead of substituting another icon set.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONT = resolve(ROOT, "node_modules/font-awesome/fonts/fontawesome-webfont.svg");
const OUT = resolve(ROOT, "src/lib/icons.tsx");

// FontForge metrics declared in the font-face element of the SVG font.
const UNITS_PER_EM = 1792;
const ASCENT = 1536;

/** glyph-name in the FA4 SVG font -> exported React component name.
 *
 * The 4.7.0 SVG font still carries Font Awesome 3 era glyph names (`remove`
 * rather than `times`, `group` rather than `users`, and so on), so the keys
 * below are the names as they actually appear in the font file.
 */
const WANTED = {
  search: "SearchIcon",
  bell: "BellIcon",
  bell_alt: "BellAltIcon",
  heart: "HeartIcon",
  heart_empty: "HeartOutlineIcon",
  chevron_down: "ChevronDownIcon",
  chevron_up: "ChevronUpIcon",
  chevron_left: "ChevronLeftIcon",
  chevron_right: "ChevronRightIcon",
  angle_right: "AngleRightIcon",
  angle_down: "AngleDownIcon",
  th: "GridIcon",
  th_large: "GridLargeIcon",
  remove: "CloseIcon",
  group: "UsersIcon",
  book: "BookIcon",
  building: "BuildingIcon",
  question_sign: "QuestionCircleIcon",
  user: "UserIcon",
  ellipsis_vertical: "EllipsisVerticalIcon",
  signout: "SignOutIcon",
  key: "KeyIcon",
  lock: "LockIcon",
  external_link: "ExternalLinkIcon",
  link: "LinkIcon",
  reorder: "BarsIcon",
  arrow_left: "ArrowLeftIcon",
  long_arrow_left: "LongArrowLeftIcon",
  star: "StarIcon",
  star_empty: "StarOutlineIcon",
  cog: "CogIcon",
  info_sign: "InfoCircleIcon",
  ok: "CheckIcon",
  folder_open_alt: "FolderOpenIcon",
  warning_sign: "WarningIcon",
  qrcode: "CleverBadgeIcon",
};

const source = readFileSync(FONT, "utf8");

/**
 * Glyph names in the font use "_o" rather than "-o" for outline variants in a
 * few cases; try both spellings.
 */
function findGlyph(name) {
  for (const candidate of [name, name.replace(/_/g, "-"), name.replace(/-/g, "_")]) {
    const pattern = new RegExp(
      `<glyph glyph-name="${candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"([\\s\\S]*?)/>`,
    );
    const match = source.match(pattern);
    if (match) return match[1];
  }
  return null;
}

const components = [];
const missing = [];

for (const [glyphName, componentName] of Object.entries(WANTED)) {
  const attrs = findGlyph(glyphName);
  if (!attrs) {
    missing.push(glyphName);
    continue;
  }

  const advance = Number(/horiz-adv-x="([\d.]+)"/.exec(attrs)?.[1] ?? UNITS_PER_EM);
  const path = /\sd="([^"]+)"/.exec(attrs)?.[1];
  if (!path) {
    missing.push(glyphName);
    continue;
  }

  components.push(
    `export function ${componentName}(props: IconProps) {\n` +
      `  return (\n` +
      `    <Glyph {...props} advance={${advance}} name="${glyphName.replace(/_/g, "-")}">\n` +
      `      <path d="${path}" />\n` +
      `    </Glyph>\n` +
      `  );\n` +
      `}`,
  );
}

if (missing.length) {
  throw new Error(`Missing glyphs in the Font Awesome 4.7 SVG font: ${missing.join(", ")}`);
}

const header = `/**
 * ==== Auto-generated file. Do NOT edit directly. ====
 * ==== Run \`npm run generate:icons\` instead.      ====
 *
 * Outlines extracted from Font Awesome 4.7.0, the icon set Clever's own
 * component library draws with (it depends on react-fontawesome ^1.6.1).
 * Font Awesome 4.7.0 icons are licensed under SIL OFL 1.1 / CC BY 4.0.
 */
import type { ReactNode, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Rendered edge length. Icons are square and scale with the em box. */
  size?: number | string;
  /** Accessible label. Omit to mark the icon decorative (the default). */
  title?: string;
}

interface GlyphProps extends IconProps {
  advance: number;
  name: string;
  children: ReactNode;
}

/**
 * Font Awesome's SVG font is authored y-up on a ${UNITS_PER_EM}-unit em box with an
 * ascent of ${ASCENT}, so each outline is flipped back into SVG's y-down space.
 */
function Glyph({ advance, name, children, size = "1em", title, ...props }: GlyphProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={\`0 0 \${advance} ${UNITS_PER_EM}\`}
      width={size}
      height={size}
      fill="currentColor"
      focusable="false"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-icon={name}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(0 ${ASCENT}) scale(1 -1)">{children}</g>
    </svg>
  );
}
`;

writeFileSync(OUT, `${header}\n${components.join("\n\n")}\n`, "utf8");
console.log(`Wrote ${components.length} icons to src/lib/icons.tsx`);
