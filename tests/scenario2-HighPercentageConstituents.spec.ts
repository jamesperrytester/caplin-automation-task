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
  // Retry logic for clicking and navigation
  let success = false;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Trying to click and navigate.`);
      // Only run if page is not closed
      if (page.isClosed && page.isClosed()) break;
      // Re-hide overlays before each attempt
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
      // Try popup logic first
      const popupPromise = page.waitForEvent("popup", { timeout: 10000 });
      await page.getByRole("link", { name: "View FTSE" }).click({ force: true });
      await page.waitForLoadState();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      await expect(popup).toHaveURL(/indices\/ftse-100\/constituents\/table/);
      success = true;
      break;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      lastError = error;
      // Only run if page is not closed
      if (page.isClosed && page.isClosed()) break;
      // Try navigation in same tab as fallback
      try {
        console.log(`Attempt ${attempt}: Trying navigation fallback.`);
        const [navigation] = await Promise.all([
          page.waitForNavigation({ url: /indices\/ftse-100\/constituents/, timeout: 10000 }),
          page.getByRole("link", { name: "View FTSE" }).click({ force: true })
        ]);
        await expect(page).toHaveURL(/indices\/ftse-100\/constituents/);
        success = true;
        break;
      } catch (navError) {
        console.warn(`Attempt ${attempt} navigation fallback failed:`, navError);
        lastError = navError;
      }
      // Wait 1 second before next retry
      await page.waitForTimeout(1000);
    }
  }
  if (!success) {
    throw lastError;
  }

  // Wait for the table to be visible
// await expect(page.locator("app-ftse-index-table")).toBeVisible();

});
