import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 lowest constituents by % change", async ({
  page,
}) => {
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table?page=5"
  );

  // Extract the top 10 constituents by % change (ascending)
  const bottom10Constituents = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        name: cells[1]?.innerText ?? "",
        change: cells[6]?.innerText ?? "",
        changeValue: parseFloat(cells[6]?.innerText.replace("%", "")) || 0,
      };
    });

    // Sort by changeValue ascending and take bottom 10
    return data
      .sort((a, b) => a.changeValue - b.changeValue)
      .slice(0, 10)
      .map(({ name, change }) => ({ name, change }));
  });

  console.log("Top 10 Constituents by Lowest % Change:", bottom10Constituents);
});