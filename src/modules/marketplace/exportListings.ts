import { chromium } from 'playwright';
import fs from 'fs/promises';
import type { Listing } from '../../types/listing.js';
import { compareListings } from './compareListings.js';

export async function exportListings() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    await page.goto('https://www.facebook.com/marketplace/you/selling', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.waitForTimeout(10000);

    const content = (await page.locator('[role="main"]').textContent()) ?? '';

    const matches = [
      ...content.matchAll(/([A-ZÁÉÍÓÚ0-9][A-ZÁÉÍÓÚ0-9\s]+)\$(\s*\d[\d.]*)/g),
    ];

    const listings: Listing[] = matches.map((m) => ({
      name: m[1].trim(),
      price: m[2].trim(),
    }));

    await compareListings(listings);
    
    await fs.writeFile(
      './storage/exports/listings.json',
      JSON.stringify(listings, null, 2),
    );

    console.log('');
    console.log('Archivo generado.');
    console.log(`Total: ${listings.length}`);
  } finally {
    await browser.close();
  }
}
