import type { Page } from 'playwright';

import type { Listing } from '../../types/listing.js';

export async function getListings(
  page: Page
): Promise<Listing[]> {
  const content =
    (await page
      .locator('[role="main"]')
      .textContent()) ?? '';

  const matches = [
    ...content.matchAll(
      /([A-ZÁÉÍÓÚ0-9][A-ZÁÉÍÓÚ0-9\s]+)\$(\s*\d[\d.]*)/g
    ),
  ];

  return matches.map((m) => ({
    name: m[1].trim(),
    price: m[2].trim(),
  }));
}