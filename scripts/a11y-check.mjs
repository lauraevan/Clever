/** Keyboard and semantics smoke test. */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://127.0.0.1:5173/";

/** Set CHROMIUM_PATH when Playwright should use a browser it did not download itself. */
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.setDefaultTimeout(15000);
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");

const checks = [];
const check = (name, pass, detail = "") => checks.push({ name, pass, detail });

// --- Landmarks and document structure ---
check("banner landmark", (await page.getByRole("banner").count()) === 1);
check("navigation landmark", (await page.getByRole("navigation").count()) === 1);
check("main landmark", (await page.getByRole("main").count()) === 1);
check("exactly one h1", (await page.locator("h1").count()) === 1);
check(
  "every section is labelled by its heading",
  (await page.locator("section[aria-labelledby]").count()) ===
    (await page.locator("section[id]").count()),
);

// --- Tile artwork is decorative; the visible title carries the name ---
const icons = await page
  .locator(".resource-tile__icon")
  .evaluateAll((nodes) =>
    nodes.map((n) => ({ alt: n.getAttribute("alt"), role: n.getAttribute("role") })),
  );
check(
  "tile artwork is decorative",
  icons.length > 0 && icons.every((i) => i.alt === "" && i.role === "presentation"),
  `${icons.length} icons`,
);

// --- Favourite controls expose toggle state ---
const pressed = await page
  .locator(".resource-tile__favorite")
  .first()
  .getAttribute("aria-pressed");
check("favourite control is a toggle", pressed === "false" || pressed === "true");

// --- Search is operable entirely from the keyboard ---
await page.getByRole("button", { name: "Search" }).focus();
await page.keyboard.press("Enter");
await page.waitForSelector(".search-control__input");
check("search field takes focus on open", await page.locator(".search-control__input").evaluate(
  (el) => el === document.activeElement,
));

await page.keyboard.type("khan");
await page.waitForSelector(".search-control__result");
await page.keyboard.press("ArrowDown");
const activeDescendant = await page
  .locator(".search-control__input")
  .getAttribute("aria-activedescendant");
check("arrow keys move the active option", Boolean(activeDescendant));

await page.keyboard.press("Escape");
check("Escape closes search", (await page.locator(".search-control__input").count()) === 0);

// --- Menus close on Escape and return focus ---
await page.getByRole("button", { name: /Notifications/ }).click();
await page.waitForSelector(".notifications__list");
await page.keyboard.press("Escape");
check("Escape closes notifications", (await page.locator(".notifications__list").count()) === 0);

await page.getByRole("button", { name: /Account menu/ }).click();
await page.waitForSelector(".profile-menu__identity");
check(
  "profile menu is a labelled dialog",
  (await page.getByRole("dialog", { name: /Account menu/ }).count()) === 1,
);
await page.keyboard.press("Escape");

// --- Log out reaches the demo landing screen, which asks for no credentials ---
await page.getByRole("button", { name: /Account menu/ }).click();
await page.getByRole("button", { name: "Log out" }).click();
await page.waitForSelector(".demo-login__button");
check(
  "demo landing collects no credentials",
  (await page.locator("input[type=password], input[type=email], input[name*=user i]").count()) === 0,
);
await page.getByRole("button", { name: "Continue to demo" }).click();
await page.waitForSelector(".dashboard");
check("continue returns to the portal", (await page.locator(".dashboard").count()) === 1);

// --- Focus is always visible ---
await page.keyboard.press("Tab");
const outline = await page.evaluate(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const s = getComputedStyle(el);
  return {
    el: `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 60),
    matchesFocusVisible: el.matches(":focus-visible"),
    outlineWidth: parseFloat(s.outlineWidth),
    outlineStyle: s.outlineStyle,
    boxShadow: s.boxShadow,
  };
});
check(
  "focused control has a visible indicator",
  Boolean(
    outline &&
      ((outline.outlineStyle !== "none" && outline.outlineWidth > 0) ||
        outline.boxShadow !== "none"),
  ),
  JSON.stringify(outline),
);

const failed = checks.filter((c) => !c.pass);
for (const c of checks) {
  console.log(`  ${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.detail ? `  (${c.detail})` : ""}`);
}
console.log(failed.length === 0 ? "\n  All accessibility checks passed.\n" : `\n  ${failed.length} failed.\n`);

await browser.close();
process.exit(failed.length === 0 ? 0 : 1);
