import { Page } from 'playwright';

import type { Listing } from '../../types/listing.js';

export async function getListings(page: Page): Promise<Listing[]> {
  await page.waitForTimeout(3000);

  const content = await page.locator('[role="main"]').textContent();

  if (!content) {
    return [];
  }

  const matches = content.match(/\$\s?[\d.,]+/g) || [];

  return matches.map((price, index) => ({
    id: String(index),

    title: `Producto ${index + 1}`,

    price: Number(price.replace('$', '').replace(/\./g, '')),

    url: '',

    scrapedAt: new Date().toISOString(),
  }));
}
