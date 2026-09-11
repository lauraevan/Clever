/**
 * Writes square app-icon artwork into public/app-icons/.
 *
 * Clever's ResourceTile takes icons as plain image sources and rounds them with
 * `border-radius: 10%` in CSS, so the generated art is full-bleed square with no
 * rounding baked in.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as simpleIcons from "simple-icons";
import { iconSpecs } from "./appIconSpecs.mjs";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "app-icons");
const SIZE = 128;

const slugToExport = (slug) => "si" + slug.charAt(0).toUpperCase() + slug.slice(1);

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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

function renderLetterIcon(spec) {
  const size = spec.letterSize ?? 64;
  const tracking = spec.letterSpacing ?? 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(spec.id)}">
  <title>${escapeXml(spec.id)}</title>
  <rect width="${SIZE}" height="${SIZE}" fill="${spec.bg}"/>
  <text x="50%" y="50%" fill="${spec.fg}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" letter-spacing="${tracking}" text-anchor="middle" dominant-baseline="central">${escapeXml(spec.letter)}</text>
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });

let written = 0;
for (const spec of iconSpecs) {
  const svg = spec.slug ? renderBrandIcon(spec) : renderLetterIcon(spec);
  writeFileSync(resolve(OUT_DIR, `${spec.id}.svg`), svg, "utf8");
  written += 1;
}

console.log(`Wrote ${written} app icons to public/app-icons/`);
