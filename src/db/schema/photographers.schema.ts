import { InferModel } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const photographers = pgTable(
  'photographers',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    email: varchar('email', { length: 50 }).notNull(),
    password: varchar('password').notNull(),
    login: varchar('login', { length: 50 }).notNull(),
    role: varchar('role', { length: 25, enum: ['photographers'] })
      .notNull()
      .default('photographers'),
    token: varchar('token'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    emailIndex: uniqueIndex('emailIdx').on(table.email),
    loginIndex: uniqueIndex('loginIdx').on(table.login),
  })
);

export type TPhotographers = InferModel<typeof photographers>;
export type TNewPhotographers = InferModel<typeof photographers, 'insert'>;
