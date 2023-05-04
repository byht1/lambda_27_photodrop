import { InferModel } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import { photographers } from './photographers.schema';
import { albums } from './albums.schema';

export const albumsOfPhotographers = pgTable(
  'albums_of_photographers',
  {
    photographersId: uuid('photographers_id').references(() => photographers.id),
    albumId: uuid('albums_id').references(() => albums.id),
  },
  table => ({
    id: primaryKey(table.albumId, table.photographersId),
  })
);

export type TAlbumsPhotographers = InferModel<typeof albumsOfPhotographers>;
