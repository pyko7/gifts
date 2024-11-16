import { gifts } from '../db/schemas/gift'

export type Gift = typeof gifts.$inferSelect
export type NewGift = typeof gifts.$inferInsert
export type StateEnum = 'available' | 'unavailable' | null
export type WishRateEnum = '1' | '2' | '3' | '4' | '5' | null
export type ReserveGift = {
  giftId: string
  reservedById: string | null
  state: StateEnum
}
export type GiftFormData = {
  id?: string
  name: string
  description: string
  price: string
  url: string
  wishRate: string
  file: File
  imageUrl?: string
}

export type CreateGift = Omit<
  Gift,
  'id' | 'state' | 'reservedById' | 'createdAt' | 'updatedAt'
> & {
  storedImageName?: string
}

export type UpdateGift = Omit<Gift, 'createdAt' | 'updatedAt'> & {
  storedImageName?: string
}
