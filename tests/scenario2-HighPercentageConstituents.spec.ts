import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 highest constituents by % change", async ({ page }) => {
  // Go to the FTSE 100 constituents table page
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table"
  );

  // Wait for the page to fully load
  await page.waitForLoadState();
  await expect(page).toHaveURL(/indices\/ftse-100\/constituents\/table/);

  // Extract the top 10 constituents by % change (descending)
  const top10Constituents = await page.evaluate(() => {
    // Select all table rows
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    // Map each row to an object with name and % change
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      // Defensive: check cell existence
      return {
        name: cells[1]?.innerText ?? "", // Company name
        change: cells[6]?.innerText ?? "", // % change value as text
        changeValue: parseFloat(cells[6]?.innerText.replace("%", "")) || 0, // Numeric % change
      };
    });
    // Sort by changeValue descending and take top 10
    return data
      .sort((a, b) => b.changeValue - a.changeValue) // Sort from highest to lowest
      .slice(0, 10) // Take the first 10 (highest)
      .map(({ name, change }) => ({ name, change })); // Return only name and change
  });

  // Log the results to the console
  console.log("Top 10 Constituents by highest % Change:", top10Constituents);
});