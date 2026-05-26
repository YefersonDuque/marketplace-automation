import { chromium } from 'playwright';
import { browserConfig } from '../../config/browser.config.js';

export async function openBrowser() {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    console.log('Abriendo página...');

    await page.goto(browserConfig.startUrl, {
      waitUntil: 'domcontentloaded',
      timeout: browserConfig.timeout,
    });

    console.log('Página cargada.');

    await page.waitForTimeout(5000);
  } finally {
    await browser.close();
  }
}
