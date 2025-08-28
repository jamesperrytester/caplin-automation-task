import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 constituents by % change", async ({ page }) => {
  await page.goto("https://www.londonstockexchange.com");

  // Wait for and click the consent button if it appears
  // Dismiss cookie consent dialog if present
  // Use specific ID selector for OneTrust consent button
  const consentButton = page.locator("#onetrust-accept-btn-handler");
  if (await consentButton.isVisible()) {
    await consentButton.waitFor({ state: "visible" });
    await consentButton.click();
    // Wait for overlay to disappear
    await page
      .waitForSelector("#onetrust-consent-sdk", { state: "hidden" })
      .catch(() => {});
    await page
      .waitForSelector(".onetrust-pc-dark-filter", { state: "hidden" })
      .catch(() => {});
  }
  // Force-remove or hide all OneTrust overlays and policy elements before clicking
  await page.evaluate(() => {
    const ids = ['onetrust-consent-sdk', 'onetrust-policy-text'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      }
    });
    const classes = ['onetrust-pc-dark-filter'];
    classes.forEach(cls => {
      document.querySelectorAll('.' + cls).forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      });
    });
  });
  // Re-hide overlays immediately before clicking
  await page.evaluate(() => {
    const ids = ['onetrust-consent-sdk', 'onetrust-policy-text'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      }
    });
    const classes = ['onetrust-pc-dark-filter'];
    classes.forEach(cls => {
      document.querySelectorAll('.' + cls).forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      });
    });
  });
  // Click View FTSE button and wait for the page to render (force bypass)
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "View FTSE" }).click({ force: true });
  await page.waitForLoadState();
  const popup = await popupPromise;
  await popup.waitForLoadState();

  await expect(popup).toHaveURL(/indices\/ftse-100\/constituents\/table/);
});
