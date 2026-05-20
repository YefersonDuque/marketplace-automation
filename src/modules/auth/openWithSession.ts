import { chromium } from 'playwright';
import { appConfig } from '../../config/app.js';

export async function openWithSession() {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext({
    storageState: appConfig.storage.session,
  });

  const page = await context.newPage();

  console.log('Abriendo Facebook con sesión...');

  await page.goto(appConfig.urls.marketplace, {
    waitUntil: 'domcontentloaded',
  });

  console.log('Sesión cargada.');

  return {
    browser,
    page,
  };
}
