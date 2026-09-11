/** Captures the portal's interactive surfaces for visual review. */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://127.0.0.1:5173/";

/** Set CHROMIUM_PATH when Playwright should use a browser it did not download itself. */
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;
const OUT = process.env.SHOT_DIR ?? "screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.setDefaultTimeout(15000);

const shot = (name, clip) => page.screenshot({ path: `${OUT}/${name}.png`, clip });

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");

// --- Search ---------------------------------------------------------------
await page.getByRole("button", { name: "Search" }).click();
await page.keyboard.type("capti");
await page.waitForSelector(".search-control__result");
await shot("search-open", { x: 600, y: 0, width: 840, height: 500 });
const resultCount = await page.locator(".search-control__result").count();
await page.keyboard.press("ArrowDown");
await shot("search-arrow", { x: 600, y: 0, width: 840, height: 500 });
await page.keyboard.press("Escape");
const searchClosed = (await page.locator(".search-control__field").count()) === 0;

// --- Notifications --------------------------------------------------------
await page.getByRole("button", { name: /Notifications/ }).click();
await page.waitForSelector(".notifications__list");
await shot("notifications", { x: 900, y: 0, width: 540, height: 520 });
await page.keyboard.press("Escape");

// --- Profile --------------------------------------------------------------
await page.getByRole("button", { name: /Account menu/ }).click();
await page.waitForSelector(".profile-menu__identity");
await shot("profile", { x: 1000, y: 0, width: 440, height: 420 });
await page.keyboard.press("Escape");

// --- Favourite toggling ---------------------------------------------------
await page.locator(".resource-tile").first().hover();
await shot("tile-hover", { x: 225, y: 120, width: 700, height: 280 });

const classroom = page.locator(".resource-tile", { hasText: "Google Classroom" }).first();
await classroom.scrollIntoViewIfNeeded();
await classroom.getByRole("button", { name: /Add .* to favorites/ }).click();
const khan = page.locator(".resource-tile", { hasText: "IXL" }).first();
await khan.scrollIntoViewIfNeeded();
await khan.getByRole("button", { name: /Add .* to favorites/ }).click();
await page.evaluate(() => window.scrollTo({ top: 0 }));
await page.waitForTimeout(300);
await shot("favorites-filled", { x: 0, y: 0, width: 1440, height: 700 });

const storedFavorites = await page.evaluate(() =>
  window.localStorage.getItem("clever-replica.favorites"),
);

// Favourites must survive a reload.
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector("#favorites .resource-tile");
const favoritesAfterReload = await page.locator("#favorites .resource-tile").count();

// --- Left nav scrolls to a section ---------------------------------------
await page.getByRole("button", { name: "District Resources" }).click();
await page.waitForTimeout(700);
await shot("nav-district", { x: 0, y: 0, width: 1440, height: 700 });

// --- Teacher Page ---------------------------------------------------------
await page.evaluate(() => window.scrollTo({ top: 0 }));
await page.locator(".resource-tile", { hasText: "Ms. Mangan's Class" }).first().click();
await page.waitForSelector(".teacher-page__title");
await shot("teacher-page", { x: 0, y: 0, width: 1440, height: 800 });

// --- Mock app launch ------------------------------------------------------
await page.getByRole("button", { name: /Back to portal/ }).click();
await page.waitForSelector(".dashboard");
await page.locator(".resource-tile", { hasText: "Capti Voice" }).first().click();
await page.waitForSelector(".app-view__title");
await shot("app-view", { x: 0, y: 0, width: 1440, height: 700 });

// --- Unavailable app ------------------------------------------------------
await page.goto(`${URL}#/app/canvas`, { waitUntil: "networkidle" });
await page.waitForSelector(".app-view__notice--warning");
await shot("app-unavailable", { x: 0, y: 0, width: 1440, height: 700 });

// --- Demo landing ---------------------------------------------------------
await page.goto(`${URL}#/login`, { waitUntil: "networkidle" });
await page.waitForSelector(".demo-login__button");
await shot("demo-login", { x: 0, y: 0, width: 1440, height: 760 });

// --- Mobile nav -----------------------------------------------------------
await page.goto(URL, { waitUntil: "networkidle" });
await page.setViewportSize({ width: 414, height: 896 });
await page.getByRole("button", { name: "Open navigation" }).click();
await page.waitForTimeout(350);
await shot("mobile-nav");

console.log(
  JSON.stringify(
    { resultCount, searchClosed, storedFavorites, favoritesAfterReload },
    null,
    2,
  ),
);

await browser.close();
