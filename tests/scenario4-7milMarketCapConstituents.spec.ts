import { test, expect } from "@playwright/test";

test("Extract FTSE 100 constituents where market cap exceeds 7 million", async ({
  page,
}) => {
  await page.goto(
    "https://www.londonstockexchange.com/indices/ftse-100/constituents/table"
  );

  await page.waitForLoadState();
  await expect(page).toHaveURL(/indices\/ftse-100\/constituents\/table/);

  const highMarketCapConstituents = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    return rows
      .map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        const name = cells[1]?.innerText ?? "";
        const marketCapText = cells[3]?.innerText ?? "";

        // Convert market cap string to number (assumes value is in millions)
        const marketCapValue = parseFloat(marketCapText.replace(/,/g, ""));

        return {
          name,
          marketCap: marketCapText,
          marketCapValue,
        };
      })
      .filter((item) => item.marketCapValue > 7000) // 7 million = 7000 in millions
      .map(({ name, marketCap }) => ({ name, marketCap }));
  });

  console.log("Constituents with Market Cap > 7 Million:");
  highMarketCapConstituents.forEach(({ name, marketCap }) => {
    console.log(`- ${name}: ${marketCap}`);
  });
});
