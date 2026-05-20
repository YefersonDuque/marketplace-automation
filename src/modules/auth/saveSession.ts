import { chromium } from 'playwright';

export async function saveSession() {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://www.facebook.com');

  console.log('');
  console.log('=================================');
  console.log('INICIA SESIÓN MANUALMENTE');
  console.log('Cuando ya estés dentro de Facebook');
  console.log('vuelve a esta terminal y presiona ENTER');
  console.log('=================================');

  await new Promise<void>((resolve) => {
    process.stdin.resume();

    process.stdin.once('data', () => {
      process.stdin.pause();

      resolve();
    });
  });

  await context.storageState({
    path: './storage/facebook-session.json',
  });

  console.log('Sesión guardada correctamente.');

  await browser.close();
}
