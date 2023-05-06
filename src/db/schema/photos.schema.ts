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
  originalUrl: varchar('original_url').notNull(),
});

export type TPhotos = InferModel<typeof photos>;
export type TNewPhotos = InferModel<typeof photos, 'insert'>;
