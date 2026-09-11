/**
 * Measures the rendered portal and checks it against the numbers taken from
 * Clever's own component library, then writes screenshots for visual review.
 *
 * Usage: node scripts/measure.mjs [url]
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://127.0.0.1:5173/";

/** Set CHROMIUM_PATH when Playwright should use a browser it did not download itself. */
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;
const OUT = process.env.SHOT_DIR ?? "screenshots";
mkdirSync(OUT, { recursive: true });

/** [label, expected, tolerance in px] */
const EXPECTED = {
  headerHeight: [60, 0.5, "TopBar @topBarHeight 3.75rem"],
  headerBg: ["rgb(67, 108, 242)", 0, "TopBar background-color #436cf2"],
  topBarButtonHeight: [52, 0.5, "TopBarButton @topBarHeight - @size_xs"],
  logoHeight: [28, 0.5, "TopBar--logo font-size 1.75rem, image height 1em"],
  logoWidth: [100.8, 1, "198/55 aspect ratio at 28px tall"],
  logoLeft: [20, 0.5, "TopBar padding-x 4px + logoLink padding-x 16px"],
  titleFontSize: [16, 0.5, "TopBar--title .text--medium"],
  sidebarWidth: [225, 0.5, "LeftNav @paneWidth"],
  sidebarBg: ["rgb(250, 251, 252)", 0, "LeftNav @neutral_off_white"],
  navItemHeight: [56, 0.5, "NavLink padding-y 16px + 24px line"],
  navItemPaddingLeft: [16, 0.5, "NavLink @linkPaddingLeft"],
  navItemColor: ["rgb(33, 70, 189)", 0, "LeftNav @primary_blue_shade_2"],
  tileWidth: [160, 0.5, "128px icon + 16px padding each side"],
  tileIconBox: [128, 0.5, "ResourceTile @iconSizeLarge 8rem"],
  tileTitleFontSize: [16, 0.5, "ResourceTile @fontSizeLarge"],
  tileGapX: [8, 0.5, "ResourceTile margin-right @size_xs"],
  tileRadius: [8, 0.5, "ResourceTile .borderRadius--xl"],
  sectionTitleFontSize: [18, 0.5, "@type_medium_large"],
};

const page = await (await chromium.launch(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {})).newPage();
page.setDefaultTimeout(15000);

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");
await page.evaluate(() => document.fonts.ready);

const measured = await page.evaluate(() => {
  const rect = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.getBoundingClientRect().toJSON() : null;
  };
  const style = (selector, prop) => {
    const el = document.querySelector(selector);
    return el ? getComputedStyle(el)[prop] : null;
  };

  const header = rect(".clever-header");
  const logo = rect(".clever-logo__image");
  const sidebar = rect(".clever-sidebar");
  const navItem = rect(".nav-item");
  const tiles = Array.from(document.querySelectorAll(".resource-tile")).map((el) =>
    el.getBoundingClientRect(),
  );
  const iconBox = rect(".resource-tile__icon-container");
  const firstIcon = rect(".resource-tile__icon-container img, .resource-tile__icon-container span");
  const sectionTitle = rect(".section__title");
  const dashboard = rect(".dashboard");

  return {
    headerHeight: header?.height,
    headerBg: style(".clever-header", "backgroundColor"),
    headerShadow: style(".clever-header", "boxShadow"),
    topBarButtonHeight: rect(".clever-header__logo-link")?.height,
    logoHeight: logo?.height,
    logoWidth: logo?.width,
    logoLeft: logo?.left,
    titleFontSize: parseFloat(style(".clever-header__title", "fontSize")),
    titleWeight: style(".clever-header__title", "fontWeight"),
    sidebarWidth: sidebar?.width,
    sidebarBg: style(".clever-sidebar", "backgroundColor"),
    sidebarTop: sidebar?.top,
    navItemHeight: navItem?.height,
    navItemPaddingLeft: parseFloat(style(".nav-item", "paddingLeft")),
    navItemColor: style(".nav-item", "color"),
    tileWidth: tiles[0]?.width,
    tileIconBox: iconBox?.width,
    tileIconRendered: firstIcon ? { w: firstIcon.width, h: firstIcon.height } : null,
    tileTitleFontSize: parseFloat(style(".resource-tile__title-and-notes", "fontSize")),
    tileGapX: tiles.length > 1 ? Math.round((tiles[1].left - tiles[0].right) * 100) / 100 : null,
    tileRadius: parseFloat(style(".resource-tile", "borderRadius")),
    tileRowPitch:
      tiles.length > 1
        ? Math.round((tiles[1].left - tiles[0].left) * 100) / 100
        : null,
    sectionTitleFontSize: parseFloat(style(".section__title", "fontSize")),
    sectionTitleX: sectionTitle?.left,
    contentX: dashboard?.left,
    contentY: dashboard?.top,
    firstTileIconX: iconBox?.left,
    fontFamily: style("body", "fontFamily"),
    documentScrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  };
});

let failures = 0;
console.log("\n  metric                     measured     expected    source");
console.log("  " + "-".repeat(82));
for (const [key, [expected, tolerance, source]] of Object.entries(EXPECTED)) {
  const actual = measured[key];
  const ok =
    typeof expected === "number"
      ? typeof actual === "number" && Math.abs(actual - expected) <= tolerance
      : actual === expected;
  if (!ok) failures += 1;
  const fmt = (v) => (typeof v === "number" ? v.toFixed(2) : String(v));
  console.log(
    `  ${ok ? "PASS" : "FAIL"} ${key.padEnd(22)} ${fmt(actual).padStart(11)} ${fmt(expected).padStart(11)}    ${source}`,
  );
}

console.log("\n  Other measurements:");
for (const [key, value] of Object.entries(measured)) {
  if (key in EXPECTED) continue;
  console.log(`    ${key.padEnd(24)} ${JSON.stringify(value)}`);
}

const VIEWPORTS = [
  [1440, 900],
  [1920, 1080],
  [1536, 864],
  [1366, 768],
  [1024, 768],
  [820, 1180],
  [414, 896],
];

for (const [width, height] of VIEWPORTS) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(250);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 0) {
    failures += 1;
    console.log(`\n  FAIL horizontal overflow of ${overflow}px at ${width}x${height}`);
  }
  await page.screenshot({ path: `${OUT}/portal-${width}x${height}.png` });
  if (width === 1440) {
    await page.screenshot({ path: `${OUT}/portal-full-page.png`, fullPage: true });
  }
}

console.log(`\n  Screenshots in ${OUT}`);
console.log(failures === 0 ? "\n  All geometry checks passed.\n" : `\n  ${failures} check(s) failed.\n`);

await page.context().browser()?.close();
process.exit(failures === 0 ? 0 : 1);
