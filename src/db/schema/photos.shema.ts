import { InferModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { albums } from './albums.schema';

export const photos = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  albumId: uuid('album_id')
    .notNull()
    .references(() => albums.id),
  name: varchar('first_name', { length: 50 }).notNull(),
  people: varchar('people').array().default([]),
  url: varchar('url').notNull(),
  createdAt: varchar('created_at', { length: 25 }).notNull(),
});

export type TAlbums = InferModel<typeof albums>;
export type TNewAlbums = InferModel<typeof albums, 'insert'>;
