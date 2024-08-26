import { Gift, StateEnum, WishRateEnum } from '../types/gifts'
import { and, DrizzleError, eq } from 'drizzle-orm'
import { gifts } from '../db/schemas/gift'
import { db } from '../db/drizzle'

class GiftService {
  id: string | null
  userId: string | null
  name: string | null
  url: string | null
  description: string | null
  price: string | null
  state: StateEnum
  wishRate: WishRateEnum

  constructor(gift: Gift) {
    this.id = gift.id
    this.userId = gift.userId
    this.name = gift.name
    this.url = gift.url
    this.description = gift.description
    this.price = gift.price
    this.state = gift.state
    this.wishRate = gift.wishRate
  }
  async createGift() {
    try {
      const gift = {
        userId: this.userId,
        name: this.name,
        url: this.url,
        description: this.description,
        price: this.price,
        state: this.state,
        wishRate: this.wishRate
      }

      await db.insert(gifts).values({ ...gift })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - createGift]: ${error.message}`)
      }
      return error
    }
  }

  async updateGift() {
    try {
      const updatedGift = {
        name: this.name,
        url: this.url,
        description: this.description,
        price: this.price,
        state: this.state,
        wishRate: this.wishRate
      }
      const result = await db
        .update(gifts)
        .set({ ...updatedGift })
        .where(
          and(eq(gifts.id, this.id ?? ''), eq(gifts.userId, this.userId ?? ''))
        )
        .returning()
      if (result.length === 0) {
        throw new Error('No gift found')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - updateGift]: ${error.message}`)
      }
      throw new Error(
        '[GiftService - updateGift]: An unexpected error has occurred'
      )
    }
  }

  static async deleteGift(userId: string, giftId: string) {
    try {
      const result = await db
        .delete(gifts)
        .where(and(eq(gifts.id, giftId), eq(gifts.userId, userId)))
        .returning()

      if (result.length === 0) {
        throw new Error('Deletion failed, no user found ')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - deleteUser]: ${error.message}`)
      }
      throw new Error(
        '[GiftService - deleteGift]: An unexpected error has occurred'
      )
    }
  }
}

export default GiftService
