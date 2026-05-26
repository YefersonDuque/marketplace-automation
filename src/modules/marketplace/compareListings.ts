import fs from 'fs/promises';

import type { Listing } from '../../types/listing.js';
import { appConfig } from '../../config/app.js';
import { logger } from '../../utils/logger.js';

export async function compareListings(current: Listing[]) {
  try {
    const raw = await fs.readFile(appConfig.storage.exports, 'utf-8');

    const previous: Listing[] = JSON.parse(raw);

    const previousTitles = previous.map((p) => p.title);

    const currentTitles = current.map((p) => p.title);

    const added = currentTitles.filter((x) => !previousTitles.includes(x));

    const removed = previousTitles.filter((x) => !currentTitles.includes(x));

    logger.info('');

    logger.info('CAMBIOS');

    logger.info('========');

    logger.info(`Nuevas: ${added.length}`);

    logger.info(`Eliminadas: ${removed.length}`);
  } catch {
    logger.info('No existe export anterior.');
  }
}
