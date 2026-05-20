import { chromium } from 'playwright';
import fs from 'fs/promises';
import type { Listing } from '../../types/listing.js';
import { compareListings } from './compareListings.js';
import { getListings } from './getListings.js';
import { appConfig } from '../../config/app.js';
import { logger } from '../../utils/logger.js';

export async function exportListings() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: appConfig.storage.session,
    });

    const page = await context.newPage();

    await page.goto(appConfig.urls.myListings, {
      waitUntil: 'domcontentloaded',
      timeout: appConfig.browser.timeout,
    });

    await page.waitForTimeout(appConfig.browser.waitAfterLoad);

    const listings = await getListings(page);

    await compareListings(listings);

    await fs.writeFile(
      appConfig.storage.exports,
      JSON.stringify(listings, null, 2),
    );

    logger.info('Archivo generado.');
    logger.info(`Total: ${listings.length}`);
  } finally {
    await browser.close();
  }
}
