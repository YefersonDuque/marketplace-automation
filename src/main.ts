import { exportListings } from './modules/marketplace/exportListings.js';

async function bootstrap() {
  console.log('Iniciando aplicación...');

  await exportListings();

  console.log('Proceso terminado.');
}

bootstrap();