import {
  pgTable,
  timestamp,
  uuid,
  pgEnum,
  primaryKey
} from 'drizzle-orm/pg-core'
import { users } from './user'

export const friendshipStatusEnum = pgEnum('friendshipStatusEnum', [
  'pending',
  'accepted',
  'declined',
  'blocked'
])

export const friends = pgTable(
  'friends',
  {
    userId: uuid('userId')
      .notNull()
      // .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    friendId: uuid('friendId')
      .notNull()
      // .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    state: friendshipStatusEnum('friendshipStatusEnum')
      .default('pending')
      .notNull(),
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
  },
  (friends) => {
    return {
      pk: primaryKey({ columns: [friends.userId, friends.friendId] }),
      pkWithCustomName: primaryKey({
        name: 'userFriendsId',
        columns: [friends.userId, friends.friendId]
      })
    }
  }
)
