import { test, expect } from '@playwright/test';

test("Confirm user can Navigate to the London Stock Exchange website", async ({
  page,
}) => {
  // Navigate to the London Stock Exchange website
  await page.goto('https://www.londonstockexchange.com');

  // Confirm the URL is as expected
  await expect(page).toHaveURL('https://www.londonstockexchange.com');

  // Confirm a heading with the specified name is visible on the page
  await expect(
    page.getByRole("heading", {
      name: "MARKETS LATEST",
    })
  ).toBeVisible();
});