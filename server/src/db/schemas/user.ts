import { text, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { gifts } from './gift'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').unique(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  imageUrl: text('imageUrl'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true
  })
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const usersRelations = relations(users, ({ many }) => ({
  gift: many(gifts),
  reservations: many(gifts)
}))
