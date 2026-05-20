import { chromium } from 'playwright';

export async function openMarketplace() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    console.log('Abriendo Facebook...');

    await page.goto('https://www.facebook.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Abriendo Marketplace...');

    await page.goto('https://www.facebook.com/marketplace', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Marketplace abierto.');

    await page.waitForTimeout(20000);
  } finally {
    await browser.close();
  }
}