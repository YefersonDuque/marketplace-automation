import { Page } from 'playwright';

export async function getListings(page: Page) {
  await page.waitForTimeout(3000);

  const content = await page.locator('[role="main"]').textContent();

  if (!content) {
    return [];
  }

  const matches = content.match(/\$\s?[\d.,]+/g) || [];

  return matches.map((_, index) => ({
    id: index,
  }));
}
