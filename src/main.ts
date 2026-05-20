import { openWithSession } from './modules/auth/openWithSession.js';

async function bootstrap() {
  console.log('Iniciando aplicación...');

  await openWithSession();

  console.log('Proceso terminado.');
}

bootstrap();