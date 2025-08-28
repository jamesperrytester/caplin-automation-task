import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 constituents by % change", async ({ page }) => {
  await page.goto("https://www.londonstockexchange.com");

  // Wait for and click the consent button if it appears

  // Dismiss cookie consent dialog if present
  // Use specific ID selector for OneTrust consent button
  const consentButton = page.locator('#onetrust-accept-btn-handler');
  if (await consentButton.isVisible({ timeout: 5000 })) {
    await consentButton.waitFor({ state: 'visible', timeout: 5000 });
    await consentButton.click();
    // Wait for overlay to disappear
    await page.waitForSelector('#onetrust-consent-sdk', { state: 'hidden', timeout: 5000 }).catch(() => {});
    await page.waitForSelector('.onetrust-pc-dark-filter', { state: 'hidden', timeout: 5000 }).catch(() => {});
  }
  //
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "View FTSE" }).click();
  await page.waitForLoadState();
  const popup = await popupPromise;
  await popup.waitForLoadState();

  await expect(popup).toHaveURL(/indices\/ftse-100\/constituents\/table/);
});
