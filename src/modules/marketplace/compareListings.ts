import fs from 'fs/promises';

import type { Listing } from '../../types/listing.js';
import { appConfig } from '../../config/app.js';
import { logger } from '../../utils/logger.js';

export async function compareListings(
  current: Listing[]
) {
  try {
    const raw = await fs.readFile(
      appConfig.storage.exports,
      'utf-8'
    );

    const previous: Listing[] =
      JSON.parse(raw);

    const previousNames =
      previous.map((p) => p.name);

    const currentNames =
      current.map((p) => p.name);

    const added =
      currentNames.filter(
        (x) => !previousNames.includes(x)
      );

    const removed =
      previousNames.filter(
        (x) => !currentNames.includes(x)
      );

    logger.info('');
    logger.info('CAMBIOS');
    logger.info('========');
    logger.info(
      `Nuevas: ${added.length}`
    );

    logger.info(
      `Eliminadas: ${removed.length}`
    );

  } catch {
    logger.info(
      'No existe export anterior.'
    );
  }
}