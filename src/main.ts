import { openBrowser } from './modules/browser/openBrowser';

async function bootstrap() {
  console.log('Iniciando aplicación...');

  await openBrowser();

  console.log('Proceso terminado.');
}

bootstrap();