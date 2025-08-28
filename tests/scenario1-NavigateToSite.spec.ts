import { test, expect } from '@playwright/test';

test("Confirm user can Navigate to the London Stock Exchange website", async ({
  page,
}) => {
  //Navigate to the London Stock Exchange website
  await page.goto('https://www.londonstockexchange.com');
  //Confirm url is as expected
  await expect(page).toHaveURL('https://www.londonstockexchange.com');

  //Confirm a heading on the page with the specified name is visible
  await expect(
    page.getByRole("heading", {
      name: "Latest news from London Stock",
    })
  ).toBeVisible();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//});
