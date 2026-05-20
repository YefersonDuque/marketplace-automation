import { chromium } from 'playwright';

export async function openWithSession() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({
      storageState: './storage/facebook-session.json',
    });

    const page = await context.newPage();

    console.log('Abriendo Facebook con sesión...');

    await page.goto('https://www.facebook.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Sesión cargada.');

    await page.waitForTimeout(15000);
  } finally {
    await browser.close();
  }
}
