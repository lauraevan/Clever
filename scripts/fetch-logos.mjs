/**
 * Downloads each application's real logo into assets/app-icons/, where the icon
 * generator picks it up as an override.
 *
 * Run this on a machine with ordinary internet access:
 *
 *   npm run fetch:logos
 *   npm run generate:app-icons
 *
 * After that the portal serves real logos from local files with no requests to
 * any logo service at runtime.
 *
 * For each app it tries, in order:
 *   1. the site's own apple-touch-icon (usually 180px and the nicest artwork)
 *   2. any <link rel="icon"> the page declares
 *   3. /favicon.ico
 *   4. Google's favicon service at 256px
 *
 * Options:
 *   --only=ixl,capti-voice   just these ids
 *   --force                  re-download ids that already have a file
 *   --skip-real              leave apps that already ship a genuine brand mark
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resources } from "../src/data/apps.ts";
import realIcons from "../src/data/realIcons.json" with { type: "json" };

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "assets", "app-icons");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) =>
  args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;

const only = value("only")?.split(",").map((entry) => entry.trim()).filter(Boolean) ?? null;
const force = flag("force");
const skipReal = flag("skip-real");

const REAL = new Set(realIcons.ids);
const TYPES = {
  "image/png": ".png",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/gif": ".gif",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

mkdirSync(OUT_DIR, { recursive: true });

const existing = new Set(
  readdirSync(OUT_DIR)
    .filter((file) => Object.values(TYPES).includes(extname(file).toLowerCase()))
    .map((file) => file.slice(0, -extname(file).length)),
);

async function get(url, accept = "*/*") {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": UA, accept },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

/** Icon URLs the site's own HTML declares, largest first. */
async function declaredIcons(origin) {
  const html = await (await get(origin, "text/html")).text();
  const head = html.slice(0, 200000);
  const found = [];

  const linkPattern = /<link\b[^>]*>/gi;
  for (const match of head.match(linkPattern) ?? []) {
    const rel = /rel=["']?([^"'>]+)/i.exec(match)?.[1]?.toLowerCase() ?? "";
    if (!/\b(apple-touch-icon|icon|shortcut)\b/.test(rel)) continue;
    const href = /href=["']?([^"'\s>]+)/i.exec(match)?.[1];
    if (!href) continue;

    const sizes = /sizes=["']?(\d+)/i.exec(match)?.[1];
    found.push({
      url: new URL(href, origin).href,
      // Apple touch icons are the largest artwork most sites publish.
      rank: (rel.includes("apple-touch-icon") ? 1000 : 0) + Number(sizes ?? 0),
    });
  }

  return found.sort((a, b) => b.rank - a.rank).map((entry) => entry.url);
}

async function download(url) {
  const response = await get(url, "image/*");
  const type = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  const extension = TYPES[type];
  if (!extension) throw new Error(`unsupported type ${type || "unknown"}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  // Anything this small is a tracking pixel or an error page, not a logo.
  if (bytes.byteLength < 300) throw new Error(`too small (${bytes.byteLength} bytes)`);
  return { bytes, extension };
}

const targets = resources.filter((resource) => {
  if (only) return only.includes(resource.id);
  if (!resource.domain) return false;
  if (skipReal && REAL.has(resource.id)) return false;
  if (!force && existing.has(resource.id)) return false;
  return true;
});

console.log(`Fetching logos for ${targets.length} apps into assets/app-icons/\n`);

let saved = 0;
const failures = [];

for (const resource of targets) {
  const origin = `https://${resource.domain}`;
  const candidates = [];

  try {
    candidates.push(...(await declaredIcons(origin)));
  } catch {
    // A site that won't serve its HTML can still have a favicon.
  }
  candidates.push(`${origin}/favicon.ico`);
  candidates.push(
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(resource.domain)}&sz=256`,
  );

  let done = false;
  for (const candidate of candidates) {
    try {
      const { bytes, extension } = await download(candidate);
      writeFileSync(resolve(OUT_DIR, `${resource.id}${extension}`), bytes);
      console.log(
        `  ok    ${resource.id.padEnd(22)} ${(bytes.byteLength / 1024).toFixed(0).padStart(4)} KB  ${candidate.slice(0, 70)}`,
      );
      saved += 1;
      done = true;
      break;
    } catch {
      // Try the next candidate.
    }
  }

  if (!done) {
    console.log(`  miss  ${resource.id.padEnd(22)} nothing usable at ${resource.domain}`);
    failures.push(resource.id);
  }
}

console.log(`\nSaved ${saved} logos.`);
if (failures.length) {
  console.log(`No logo found for: ${failures.join(", ")}`);
  console.log("Those keep their generated tile. You can drop files in by hand.");
}
if (saved > 0) console.log("\nNow run: npm run generate:app-icons");
