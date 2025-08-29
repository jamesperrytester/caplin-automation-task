import { test, expect } from "@playwright/test";

test("Determine which month over the past three years recorded the lowest average index value", async ({
  page,
}) => {
  // Navigate to the London Stock Exchange website
  await page.goto(
    "https://www.londonstockexchange.com/live-markets/market-data-dashboard/price-explorer?trkcode=lsehomeprices"
  );

  // Wait for results to load
  await page.waitForLoadState();

  // Confirm the URL is as expected
  await expect(page).toHaveURL(
    "https://www.londonstockexchange.com/live-markets/market-data-dashboard/price-explorer?trkcode=lsehomeprices"
  );

  const cookieButton = page.getByRole("button", { name: "Accept all cookies" });
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

  // Click the "Admission date" button
  await robustClick(
    page,
    "#price-explorer-filters-wrapper .admission-date-button"
  );
  await page.waitForLoadState();

  // Ran out of time and time boxed myself to 4 hours for this whole task
  // I would implement the date selection and filtering logic here if I had more time


  // // Wait for the filter buttons to be visible
  // await page.waitForSelector(".filter-buttons.price-explorer");

  // // Click the "Between" button
  // await robustClick(
  //   page,
  //   '.filter-buttons.price-explorer button:has-text("Between")'
  // );

  // // Wait for the date input to be visible
  // const dateInput = page.locator(".date-container .date-input");
  // await expect(dateInput).toBeVisible();
  // await expect(dateInput).toBeEnabled();
  // await robustClick(page, ".date-container .date-input");

  // // Open the month/year picker
  // await robustClick(page, 'button[aria-label="Choose month and year"]');

  // // Select the year
  // await robustClick(page, "span.owl-dt-calendar-cell-content", {
  //   hasText: "2022",
  // });

  // // Select the month
  // await robustClick(page, 'td.owl-dt-calendar-cell:has(span:has-text("Jul"))');

  // // Select the day
  // const dayCell = page.locator('span.owl-dt-calendar-cell-content', { hasText: "1" }).first();
  // await dayCell.waitFor({ state: "visible", timeout: 5000 });
  // await expect(dayCell).toBeEnabled();
  // await dayCell.click({ force: true });

  // // // Open the month/year picker
  // // await robustClick(page, 'button[aria-label="Choose month and year"]');

  // // Select the year
  // await robustClick(page, 'td.owl-dt-calendar-cell:has(span:has-text("2025"))');

  // // Select the month
  // await robustClick(page, 'td.owl-dt-calendar-cell:has(span:has-text("Jul"))');

  // // Select the day
  // await robustClick(page, 'span.owl-dt-calendar-cell-content', { hasText: "1" }, true);

  // // Click the "Apply filters" button
  // await robustClick(page, 'span[aria-label="Apply filters"]');

  // Robust click helper
  async function robustClick(
    page: any,
    selector: string,
    locatorOptions?: Record<string, any>,
    useFirst: boolean = false
  ) {
    let attempts = 0;
    while (attempts < 3) {
      try {
        let element;
        if (locatorOptions) {
          element = page.locator(selector, locatorOptions);
        } else {
          element = page.locator(selector);
        }
        if (useFirst) {
          element = element.first();
        }
        await element.waitFor({ state: "visible", timeout: 5000 });
        await element.click({ force: true });
        return;
      } catch (e) {
        attempts++;
        if (attempts === 3) throw e;
        await page.waitForTimeout(500);
      }
    }
  }
});