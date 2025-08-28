import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 highest constituents by % change", async ({ page }) => {
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table"
  );

  await page.waitForLoadState();
  await expect(page).toHaveURL(/indices\/ftse-100\/constituents\/table/);

  // Extract the top 10 constituents by % change (descending)
  const top10Constituents = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    // Map rows to objects with name and change
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      // Defensive: check cell existence
      return {
        name: cells[1]?.innerText ?? "",
        change: cells[6]?.innerText ?? "",
        changeValue: parseFloat(cells[6]?.innerText.replace("%", "")) || 0,
      };
    });
    // Sort by changeValue descending and take top 10
    return data
      .sort((a, b) => b.changeValue - a.changeValue)
      .slice(0, 10)
      .map(({ name, change }) => ({ name, change }));
  });

  console.log("Top 10 Constituents by highest % Change:", top10Constituents);
});