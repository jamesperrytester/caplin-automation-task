import { test, expect } from "@playwright/test";

test("Extract FTSE 100 constituents where market cap exceeds 7 million", async ({
  page,
}) => {
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table"
  );

  await page.waitForLoadState();
  await expect(page).toHaveURL(/indices\/ftse-100\/constituents\/table/);

  // Extract constituents where market cap exceeds 7 million
  const highMarketCapConstituents = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    // Map rows to objects with name and market cap
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      // Defensive: check cell existence
      return {
        name: cells[1]?.innerText ?? "",
        marketCap: cells[3]?.innerText ?? "",
      };
    });
    // Filter for market cap > 7 million
    return data.filter(({ marketCap }) => {
      return data
      .map(({ name, marketCap }) => ({ name, marketCap }));
  });
});

  console.log("Constituents with Market Cap > 7 Million:", highMarketCapConstituents);
});