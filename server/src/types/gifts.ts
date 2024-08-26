import { gifts } from '../db/schemas/gift'

export type Gift = typeof gifts.$inferSelect
export type NewGift = typeof gifts.$inferInsert
export type StateEnum = 'available' | 'unavailable' | null
export type WishRateEnum = '1' | '2' | '3' | '4' | '5' | null
