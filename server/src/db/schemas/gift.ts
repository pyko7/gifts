import { text, pgTable, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './user'

export const stateEnum = pgEnum('state', ['available', 'unavailable'])
export const wishRateEnum = pgEnum('wishRate', ['1', '2', '3', '4', '5'])

export const gifts = pgTable('gifts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId'),
  name: text('name'),
  url: text('url'),
  description: text('description'),
  price: text('price'),
  state: stateEnum('state'),
  wishRate: wishRateEnum('wishRate'),
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

export const postsRelations = relations(gifts, ({ one }) => ({
  user: one(users, {
    fields: [gifts.userId],
    references: [users.id]
  })
}))
