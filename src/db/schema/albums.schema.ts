import { InferModel } from 'drizzle-orm'
import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core'

import { photographers } from './photographers.schema'

export const albums = pgTable('albums', {
  id: uuid('id').defaultRandom().primaryKey(),
  owner: uuid('owner')
    .notNull()
    .references(() => photographers.id),
  name: varchar('first_name', { length: 50 }).notNull(),
  counterPhoto: integer('counter_photo').notNull().default(0),
  location: varchar('location', { length: 250 }).notNull(),
  createdAt: varchar('created_at', { length: 25 }).notNull(),
})

export type TAlbums = InferModel<typeof albums>
export type TNewAlbums = InferModel<typeof albums, 'insert'>
export type TableAlbums = typeof albums
