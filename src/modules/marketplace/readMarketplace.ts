import { chromium } from 'playwright';

export async function readMarketplace() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    await page.goto(
      'https://www.facebook.com/marketplace',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );

    console.log('Marketplace cargado.');

    await page.waitForTimeout(5000);

    const title = await page.title();

    console.log('Título:');
    console.log(title);

    const links = await page.locator('a').count();

    console.log('Cantidad de enlaces:');
    console.log(links);

    await page.waitForTimeout(10000);
  } finally {
    await browser.close();
  }
}