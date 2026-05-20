import { exportListings } from './modules/marketplace/exportListings.js';
import { logger } from './utils/logger.js';

async function bootstrap() {
  logger.info('Iniciando aplicación...');

  await exportListings();

  logger.info('Proceso terminado.');
}

bootstrap();