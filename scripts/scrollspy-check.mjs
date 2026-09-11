/** Confirms the left nav tracks the section actually on screen. */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://127.0.0.1:5173/";

/** Set CHROMIUM_PATH when Playwright should use a browser it did not download itself. */
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".resource-tile");

const selected = () =>
  page.locator(".nav-item--selected .nav-item__label").first().textContent();

const results = [{ where: "top of page", selected: await selected() }];

for (const label of ["District Resources", "Applications", "Classroom Resources"]) {
  await page.getByRole("button", { name: label }).click();
  await page.waitForTimeout(900);
  results.push({ where: `after clicking ${label}`, selected: await selected() });
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
