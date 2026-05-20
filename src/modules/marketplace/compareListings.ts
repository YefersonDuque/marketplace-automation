import fs from 'fs/promises';

import type { Listing } from '../../types/listing.js';

export async function compareListings(
  current: Listing[]
) {
  try {
    const raw = await fs.readFile(
      './storage/exports/listings.json',
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

    console.log('');

    console.log('CAMBIOS');
    console.log('========');

    console.log(
      `Nuevas: ${added.length}`
    );

    console.log(
      `Eliminadas: ${removed.length}`
    );

  } catch {
    console.log(
      'No existe export anterior.'
    );
  }
}