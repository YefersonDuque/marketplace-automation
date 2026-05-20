import { chromium } from 'playwright';

export async function readMyListings() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    console.log('Abriendo tus publicaciones...');

    await page.goto(
      'https://www.facebook.com/marketplace/you/selling',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );

    await page.waitForTimeout(8000);

    const title = await page.title();

    console.log('Título:');
    console.log(title);

    const cards = await page.locator('[role="main"] a').count();

    console.log('Elementos encontrados:');
    console.log(cards);

    const first = await page
      .locator('[role="main"] a')
      .first()
      .textContent();

    console.log('Primer texto encontrado:');
    console.log(first);

    await page.waitForTimeout(10000);
  } finally {
    await browser.close();
  }
}