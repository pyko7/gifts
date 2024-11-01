import { text, pgTable, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './user'

export const stateEnum = pgEnum('state', ['available', 'unavailable'])
export const wishRateEnum = pgEnum('wishRate', ['1', '2', '3', '4', '5'])

export const gifts = pgTable('gifts', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('userId').notNull(),
  name: text('name').notNull(),
  url: text('url'),
  description: text('description').notNull(),
  price: text('price').notNull(),
  state: stateEnum('state').default('available'),
  wishRate: wishRateEnum('wishRate'),
  reservedById: uuid('reservedById'),
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

export const giftsRelation = relations(gifts, ({ one }) => ({
  user: one(users, {
    fields: [gifts.userId],
    references: [users.id]
  }),
  reservedByIdId: one(users, {
    fields: [gifts.reservedById],
    references: [users.id]
  })
}))
