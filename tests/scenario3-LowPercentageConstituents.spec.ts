import { test, expect } from '@playwright/test';

test("Extract FTSE 100 top 10 lowest constituents by % change", async ({
  page,
}) => {
  // Go directly to page 5 of the FTSE 100 constituents table
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table?page=5"
  );

  // Extract the top 10 constituents by % change (ascending)
  const bottom10Constituents = await page.evaluate(() => {
    // Select all table rows
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    // Map each row to an object with name and % change
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        name: cells[1]?.innerText ?? "", // Company name
        change: cells[6]?.innerText ?? "", // % change value as text
        changeValue: parseFloat(cells[6]?.innerText.replace("%", "")) || 0, // Numeric % change
      };
    });

    // Sort by changeValue ascending and take bottom 10
    return data
      .sort((a, b) => a.changeValue - b.changeValue) // Sort from lowest to highest
      .slice(0, 10) // Take the first 10 (lowest)
      .map(({ name, change }) => ({ name, change })); // Return only name and change
  });

  // Log the results to the console
  console.log("Top 10 Constituents by Lowest % Change:", bottom10Constituents);
});