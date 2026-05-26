import { chromium } from 'playwright';

import type { Listing } from '../../types/listing.js';

export async function readListings() {
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

    const names = [
      ...content.matchAll(/([A-ZÁÉÍÓÚ0-9][A-ZÁÉÍÓÚ0-9\s]+)\$(\s*\d[\d.]*)/g),
    ];

    const products: Listing[] = names.map((m, index) => ({
      id: String(index),

      title: m[1].trim(),

      price: Number(m[2].replace(/\./g, '').trim()),

      url: '',

      scrapedAt: new Date().toISOString(),
    }));

    console.log('');

    console.log('PUBLICACIONES');

    console.log('==============');

    products.forEach((p, index) => {
      console.log(`${index + 1}. ${p.title}`);

      console.log(`   Precio: ${p.price ?? '-'}`);

      console.log('');
    });

    console.log(`Total: ${products.length}`);

    await page.waitForTimeout(10000);
  } finally {
    await browser.close();
  }
}
