import { test, expect } from "@playwright/test";

test("Determine which month over the past three years recorded the lowest average index value", async ({
  page,
}) => {
  // Navigate to the London Stock Exchange website
  await page.goto(
    "https://www.londonstockexchange.com/live-markets/market-data-dashboard/price-explorer?trkcode=lsehomeprices"
  );

  // Confirm the URL is as expected
  await expect(page).toHaveURL(
    "https://www.londonstockexchange.com/live-markets/market-data-dashboard/price-explorer?trkcode=lsehomeprices"
  );

  const cookieButton = page.getByRole("button", { name: "Accept all cookies" });
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

  // Ensure the parent container is visible
  await page.waitForSelector("#price-explorer-filters-wrapper");

  // Click the "Admission date" button
  await page.click("#price-explorer-filters-wrapper .admission-date-button", { force: true });

  // Wait for the filter buttons to be visible
  await page.waitForSelector(".filter-buttons.price-explorer");

  // Click the "Between" button
  await page.click('.filter-buttons.price-explorer button:has-text("Between")', { force: true });

  // Wait for the date input to be visible
  const dateInput = page.locator(".date-container .date-input");
  await expect(dateInput).toBeVisible();
  await expect(dateInput).toBeEnabled();
  await dateInput.click({ force: true }); // Use force only if overlays are present and you expect it

// Open the month/year picker
await page.getByRole("button", { name: "Choose month and year" }).click({ force: true });

// Select the year
await page.locator('span.owl-dt-calendar-cell-content', { hasText: '2021' }).click({ force: true });

// Select the month
await page.locator('td.owl-dt-calendar-cell:has(span:has-text("Jul"))').click({ force: true });

// Select the day
await page.locator('span.owl-dt-calendar-cell-content', { hasText: '1' }).first().click({ force: true });

await page.locator('span[aria-label="Apply filters"]').click({ force: true });

});