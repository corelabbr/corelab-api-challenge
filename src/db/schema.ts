import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: char({ length: 26 }).primaryKey(),
  email: text().notNull().unique(),
})

export const one_time_tokens = pgTable('one_time_tokens', {
  id: char({ length: 26 }).primaryKey(),
  email: text().notNull(),
  expires_at: timestamp().notNull(),
  was_used: boolean().default(false),
})

export const color = pgEnum('color', [
  'white',
  'light_blue',
  'mint_green',
  'light_yellow',
  'light_peach',
  'coral',
  'sky_blue',
  'lavender',
  'yellow_green',
  'light_orange',
  'light_gray',
  'medium_gray',
  'light_brown',
])

export const notes = pgTable('notes', {
  id: char({ length: 26 }).primaryKey(),
  user_id: char({ length: 26 })
    .notNull()
    .references(() => users.id),
  title: text().notNull(),
  description: text().notNull(),
  color: color().notNull().default('white'),
  favorite: boolean().notNull().default(false),
})
