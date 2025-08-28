import { test, expect } from "@playwright/test";

test("Extract FTSE 100 constituents with market cap > 7 million from pages 1–5", async ({
  page,
}) => {
  // Array to collect all results from all pages
  const allResults: { name: string; marketCap: string }[] = [];

  // Loop through pages 1 to 5
  for (let i = 1; i <= 5; i++) {
    // Use base URL for page 1, add ?page=2+ for others
    const url =
      i === 1
        ? "https://www.londonstockexchange.com/indices/ftse-100/constituents/table"
        : `https://www.londonstockexchange.com/indices/ftse-100/constituents/table?page=${i}`;

    // Navigate to the page and wait for it to load
    await page.goto(url);
    await page.waitForLoadState();
    if (i === 1) {
      await expect(page).toHaveURL("https://www.londonstockexchange.com/indices/ftse-100/constituents/table");
    } else {
      await expect(page).toHaveURL(`https://www.londonstockexchange.com/indices/ftse-100/constituents/table?page=${i}`);
    }

    // Extract table rows and filter for market cap > 7 million
    const pageResults = await page.evaluate(() => {
      // Select all table rows
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows
        .map((row) => {
          // Get all cells in the row
          const cells = Array.from(row.querySelectorAll("td"));
          // Extract name and market cap text
          const name = cells[1]?.innerText ?? "";
          const marketCapText = cells[3]?.innerText ?? "";
          // Parse market cap value as a number (assumes millions)
          const marketCapValue = parseFloat(marketCapText.replace(/,/g, ""));

          return {
            name,
            marketCap: marketCapText,
            marketCapValue,
          };
        })
        // Only keep rows where market cap is over 7 million (7000 in millions)
        .filter((item) => item.marketCapValue > 7000)
        // Return only name and market cap for display
        .map(({ name, marketCap }) => ({ name, marketCap }));
    });

    // Add results from this page to the overall array
    allResults.push(...pageResults);
  }

  // Log all matching constituents to the console
  console.log("All FTSE 100 Constituents with Market Cap > 7 Million:");
  allResults.forEach(({ name, marketCap }) => {
    console.log(`- ${name}: ${marketCap}`);
  });
});
