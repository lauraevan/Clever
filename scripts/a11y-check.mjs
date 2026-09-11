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

// --- Log out reaches the sign-in screen, which asks for no credentials ---
await page.getByRole("button", { name: /Account menu/ }).click();
await page.getByRole("button", { name: "Log out" }).click();
await page.waitForSelector(".sign-in__provider");
check(
  "sign-in collects no credentials",
  (await page.locator("input").count()) === 0,
);
await page.getByRole("button", { name: /Log in with Clever Badges/ }).click();
await page.waitForSelector(".dashboard");
check("signing in reaches the portal", (await page.locator(".dashboard").count()) === 1);

// --- Portal-hosted pages are reachable and structured ---
for (const [pageId, heading] of [
  ["clever-badges", "Clever Badge"],
  ["student-handbook", "Student Handbook"],
  ["lunch-menu", "Lunch Menu"],
  ["tech-helpdesk", "Technology Help Desk"],
  ["mangan-schedule", "Daily Schedule"],
]) {
  await page.goto(`${URL}#/page/${pageId}`, { waitUntil: "networkidle" });
  await page.waitForSelector(".resource-page__title");
  const title = await page.locator(".resource-page__title").textContent();
  check(`page ${pageId} renders`, title?.trim() === heading, title ?? "");
}

// --- The help desk ticket form works ---
await page.goto(`${URL}#/page/tech-helpdesk`, { waitUntil: "networkidle" });
await page.locator(".ticket-form__textarea").fill("Screen flickers when I open the lid.");
await page.locator(".ticket-form__submit").click();
await page.waitForSelector(".ticket-form__receipt");
check("ticket form confirms a reference", /LUSD-\d{4}/.test(
  (await page.locator(".ticket-form__receipt-title").textContent()) ?? "",
));

// --- Clever Library filters ---
await page.goto(`${URL}#/library`, { waitUntil: "networkidle" });
await page.waitForSelector(".library__chip");
const allCount = await page.locator("#root .resource-tile").count();
await page.locator(".library__chip", { hasText: /^Math$/ }).click();
await page.waitForTimeout(200);
const mathCount = await page.locator("#root .resource-tile").count();
check("library filters by subject", mathCount > 0 && mathCount < allCount, `${mathCount} of ${allCount}`);

// --- Notifications page ---
await page.goto(`${URL}#/notifications`, { waitUntil: "networkidle" });
await page.waitForSelector(".notifications-page__item");
await page.locator(".notifications-page__mark").click();
await page.waitForTimeout(150);
check(
  "marking all read clears the unread group",
  (await page.locator(".notifications-page__item--unread").count()) === 0,
);

// --- Account settings changes the icon size the portal draws ---
await page.goto(`${URL}#/account`, { waitUntil: "networkidle" });
await page.waitForSelector(".account__choice");
await page.locator(".account__choice", { hasText: /^Small/ }).click();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");
const iconWidth = await page
  .locator(".resource-tile__icon-container")
  .first()
  .evaluate((el) => el.getBoundingClientRect().width);
check("icon size setting applies to the portal", Math.abs(iconWidth - 80) < 0.5, `${iconWidth}px`);
await page.goto(`${URL}#/account`, { waitUntil: "networkidle" });
await page.locator(".account__choice", { hasText: /^Large/ }).click();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");

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
