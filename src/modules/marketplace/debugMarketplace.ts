import { chromium } from 'playwright';

export async function debugMarketplace() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    await page.goto(
      'https://www.facebook.com/marketplace/you/selling',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );

    console.log('Esperando carga...');

    await page.waitForTimeout(10000);

    const main = page.locator('[role="main"]');

    const text = await main.textContent();

    console.log('');
    console.log('CONTENIDO PRINCIPAL');
    console.log('===================');

    console.log(
      text
        ?.split('\n')
        .map((v) => v.trim())
        .filter(Boolean)
        .slice(0, 40)
        .join('\n')
    );

    await page.waitForTimeout(10000);
  } finally {
    await browser.close();
  }
}