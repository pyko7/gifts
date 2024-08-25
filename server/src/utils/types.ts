import { users } from '../db/schemas/user'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
