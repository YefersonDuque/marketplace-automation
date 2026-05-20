import { logger } from './utils/logger.js';
import { saveSession } from './modules/auth/saveSession.js';
import { exportListings } from './modules/marketplace/exportListings.js';
import { getListings } from './modules/marketplace/getListings.js';
import { openWithSession } from './modules/auth/openWithSession.js';

async function bootstrap() {
  logger.info('Iniciando aplicación...');

  const command = process.argv[2];

  switch (command) {
    case 'login':
      logger.info('Modo login');

      await saveSession();

      break;

    case 'export':
      logger.info('Modo export');

      await exportListings();

      break;

    case 'listings':
      logger.info('Modo listings');

      {
        const { browser, page } = await openWithSession();

        const listings = await getListings(page);

        logger.info(`Publicaciones encontradas: ${listings.length}`);

        await browser.close();
      }

      break;

    default:
      logger.warn('Comando no encontrado');
  }

  logger.info('Proceso terminado.');
}

bootstrap();
