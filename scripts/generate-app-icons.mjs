/**
 * Writes square app-icon artwork into public/app-icons/.
 *
 * Clever's ResourceTile takes icons as plain image sources and rounds them with
 * `border-radius: 10%` in CSS, so the generated art is full-bleed square with no
 * rounding baked in.
 *
 * Four sources, in descending order of fidelity:
 *
 *   logo    the real full-colour brand logo from `@iconify-json/logos`
 *   brand   the official single-colour mark and brand hex from `simple-icons`
 *   text    a wordmark or monogram on a brand-coloured ground, auto-fitted
 *   clever  the Clever "C" from Clever's own logo outline
 *
 * Anything dropped into assets/app-icons/ overrides the generated artwork for
 * that id, so real vendor logos can be supplied without touching this script.
 * See the "Application artwork" section of the README.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as simpleIcons from "simple-icons";
import logoCollection from "@iconify-json/logos/icons.json" with { type: "json" };
import { iconSpecs } from "./appIconSpecs.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "public", "app-icons");
/** Ids whose bundled artwork is a genuine brand mark, not a stand-in. */
const REAL_MANIFEST = resolve(ROOT, "src", "data", "realIcons.json");
/** Real vendor logos dropped in here win over anything generated. */
const OVERRIDE_DIR = resolve(ROOT, "assets", "app-icons");
const SIZE = 128;

/** Horizontal room a wordmark may use, leaving a margin on both sides. */
const TEXT_SAFE_WIDTH = 104;
/** Largest type size per line count, so short names don't balloon. */
const MAX_TEXT_SIZE = { 1: 46, 2: 32, 3: 24 };

/** The "C" subpath of Clever's wordmark (src/Logo/index.tsx upstream). */
const CLEVER_C =
  "M27.02 54.85C11.65 54.85.23 43 .23 28.04v-.15C.23 13.07 11.43.93 27.47.93c9.85 0 15.75 3.28 20.6 8.04l-7.31 8.42c-4.03-3.65-8.14-5.88-13.36-5.88-8.81 0-15.15 7.3-15.15 16.23v.15c0 8.93 6.2 16.38 15.15 16.38 5.97 0 9.62-2.38 13.73-6.1l7.31 7.37c-5.37 5.73-11.34 9.3-21.42 9.3";

const slugToExport = (slug) => "si" + slug.charAt(0).toUpperCase() + slug.slice(1);

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Approximate advance widths for Helvetica/Arial Bold, in em. Good enough to
 * pick a type size that fits without measuring text in a browser.
 */
function advanceEm(char) {
  if (char === " ") return 0.28;
  if (/[A-Z]/.test(char)) return 0.72;
  if (/[0-9]/.test(char)) return 0.56;
  if (/[ijlt.,:;'!|]/.test(char)) return 0.3;
  if (/[mw]/.test(char)) return 0.85;
  if (/[a-z]/.test(char)) return 0.57;
  return 0.4;
}

const estimateEm = (line) =>
  [...line].reduce((total, char) => total + advanceEm(char), 0);

/** Largest type size at which every line still fits the safe width. */
function fitTextSize(lines, override) {
  if (override) return override;
  const widest = Math.max(...lines.map(estimateEm));
  const byWidth = TEXT_SAFE_WIDTH / widest;
  return Math.floor(Math.min(byWidth, MAX_TEXT_SIZE[lines.length] ?? 22));
}

/**
 * The SVG Logos collection ships real multi-colour brand artwork on a 256-unit
 * grid, so these tiles carry the actual logo rather than a single-colour trace.
 */
function renderLogoIcon(spec) {
  const icon = logoCollection.icons[spec.logo];
  if (!icon) throw new Error(`@iconify-json/logos has no entry for "${spec.logo}"`);

  const grid = icon.width ?? logoCollection.width ?? 256;
  const gridHeight = icon.height ?? logoCollection.height ?? grid;
  const scale = spec.scale ?? 0.66;
  const drawn = SIZE * scale;
  const factor = drawn / Math.max(grid, gridHeight);
  const offsetX = (SIZE - grid * factor) / 2;
  const offsetY = (SIZE - gridHeight * factor) / 2;
  const label = spec.label ?? spec.id;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(label)}">
  <title>${escapeXml(label)}</title>
  <rect width="${SIZE}" height="${SIZE}" fill="${spec.bg ?? "#ffffff"}"/>
  <g transform="translate(${offsetX.toFixed(2)} ${offsetY.toFixed(2)}) scale(${factor.toFixed(5)})">
    ${icon.body}
  </g>
</svg>
`;
}

function renderBrandIcon(spec) {
  const icon = simpleIcons[slugToExport(spec.slug)];
  if (!icon) throw new Error(`simple-icons has no entry for "${spec.slug}"`);

  const brand = `#${icon.hex.toLowerCase()}`;
  const bg = spec.bg === "brand" ? brand : spec.bg;
  const fg = spec.fg === "brand" ? brand : spec.fg;
  const scale = spec.scale ?? 0.58;

  // simple-icons paths are authored on a 24x24 grid.
  const drawn = SIZE * scale;
  const factor = drawn / 24;
  const offset = (SIZE - drawn) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(icon.title)}">
  <title>${escapeXml(icon.title)}</title>
  <rect width="${SIZE}" height="${SIZE}" fill="${bg}"/>
  <g transform="translate(${offset.toFixed(2)} ${offset.toFixed(2)}) scale(${factor.toFixed(5)})">
    <path d="${icon.path}" fill="${fg}"/>
  </g>
</svg>
`;
}

function renderTextIcon(spec) {
  const lines = spec.lines ?? [spec.id];
  const size = fitTextSize(lines, spec.textSize);
  const lineHeight = size * 1.08;
  const blockTop = SIZE / 2 - ((lines.length - 1) * lineHeight) / 2;
  const label = spec.label ?? lines.join(" ");

  const tspans = lines
    .map((line, index) => {
      const y = (blockTop + index * lineHeight).toFixed(2);
      return `    <text x="64" y="${y}" fill="${spec.fg}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${spec.weight ?? 700}" letter-spacing="${spec.tracking ?? 0}" text-anchor="middle" dominant-baseline="central">${escapeXml(line)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(label)}">
  <title>${escapeXml(label)}</title>
  <rect width="${SIZE}" height="${SIZE}" fill="${spec.bg}"/>
${tspans}
</svg>
`;
}

function renderCleverIcon(spec) {
  // The "C" outline spans roughly 48.3 x 55.8 units starting at (0.23, 0.93).
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(spec.label ?? "Clever")}">
  <title>${escapeXml(spec.label ?? "Clever")}</title>
  <rect width="${SIZE}" height="${SIZE}" fill="${spec.bg ?? "#436cf2"}"/>
  <svg x="32" y="28" width="64" height="72" viewBox="0 0 48.31 55.78">
    <path transform="translate(-0.23 -0.93)" fill="${spec.fg ?? "#ffffff"}" fill-rule="evenodd" d="${CLEVER_C}"/>
  </svg>
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });

const written = new Set();
/** Tracks which ids ended up with real artwork, for the runtime to consult. */
const realArtwork = new Set();
for (const spec of iconSpecs) {
  if (written.has(spec.id)) throw new Error(`Duplicate icon id "${spec.id}"`);
  if (spec.logo || spec.slug || spec.style === "clever") realArtwork.add(spec.id);
  const svg = spec.logo
    ? renderLogoIcon(spec)
    : spec.slug
      ? renderBrandIcon(spec)
      : spec.style === "clever"
        ? renderCleverIcon(spec)
        : renderTextIcon(spec);
  writeFileSync(resolve(OUT_DIR, `${spec.id}.svg`), svg, "utf8");
  written.add(spec.id);
}

// Real vendor logos supplied by hand replace the generated artwork.
const OVERRIDE_EXTENSIONS = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const overrides = [];
if (existsSync(OVERRIDE_DIR)) {
  for (const file of readdirSync(OVERRIDE_DIR)) {
    const extension = extname(file).toLowerCase();
    if (!OVERRIDE_EXTENSIONS.has(extension)) continue;
    const id = file.slice(0, -extension.length);
    if (!id) continue;
    copyFileSync(resolve(OVERRIDE_DIR, file), resolve(OUT_DIR, file));
    overrides.push(file);
    written.add(id);
    // A hand-supplied file is the real logo by definition.
    realArtwork.add(id);
  }
}

// Guard against an app referencing artwork that was never generated. The data
// modules are imported directly (Node strips the TypeScript) so ids built at
// runtime are covered, not just literal paths.
const referenced = new Set();
const { resources } = await import("../src/data/apps.ts");
const { teacherPages } = await import("../src/data/teacherPages.ts");

const note = (icon) => {
  const match = /\/app-icons\/([\w.-]+)\.svg/.exec(icon ?? "");
  if (match) referenced.add(match[1]);
};

resources.forEach((resource) => note(resource.icon));
teacherPages.forEach((page) =>
  page.sections.forEach((section) => section.resources.forEach((r) => note(r.icon))),
);

const missing = [...referenced].filter((id) => !written.has(id)).sort();
if (missing.length) {
  throw new Error(
    `Referenced but not generated: ${missing.join(", ")}. Add specs to scripts/appIconSpecs.mjs.`,
  );
}

writeFileSync(
  REAL_MANIFEST,
  `${JSON.stringify(
    {
      $comment:
        "Auto-generated by scripts/generate-app-icons.mjs. Ids whose bundled artwork is a real brand mark, so the runtime should not look for a logo elsewhere.",
      ids: [...realArtwork].filter((id) => referenced.has(id)).sort(),
    },
    null,
    0,
  )}\n`,
  "utf8",
);

const unused = [...written].filter((id) => !referenced.has(id)).sort();
console.log(`Wrote ${written.size} app icons to public/app-icons/`);
console.log(`${realArtwork.size} carry real brand artwork.`);
console.log(`${referenced.size} referenced by the portal data.`);
if (overrides.length) {
  console.log(`${overrides.length} replaced from assets/app-icons/: ${overrides.join(", ")}`);
}
if (unused.length) console.log(`Unreferenced (harmless): ${unused.join(", ")}`);
