import { Page } from 'playwright';

import type { Listing } from '../../types/listing.js';

export async function getListings(page: Page): Promise<Listing[]> {
  await page.waitForSelector('[role="main"]', {
    timeout: 60000,
  });

  await page.waitForTimeout(5000);

  const content = await page.locator('[role="main"]').innerText();

  const rows = content
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);

  const listings: Listing[] = [];

  for (let i = 0; i < rows.length - 1; i++) {
    const title = rows[i];

    const price = rows[i + 1];

    if (!price.startsWith('$')) {
      continue;
    }

    listings.push({
      id: title.toLowerCase().replace(/\s+/g, '-'),

      title,

      price: Number(price.replace('$', '').replace(/\./g, '').trim()),

      url: '',

      scrapedAt: new Date().toISOString(),
    });
  }

  console.log('');
  console.log(`Extraídas: ${listings.length}`);

  return listings;
}
