import {
  CreateGift,
  Gift,
  ReserveGift,
  StateEnum,
  UpdateGift,
  WishRateEnum
} from '../types/gifts'
import { and, DrizzleError, eq } from 'drizzle-orm'
import { gifts } from '../db/schemas/gift'
import { db } from '../db/drizzle'
import MediaService from './mediaService/MediaService'

class GiftService {
  id: string | null
  userId: string | null
  name: string | null
  url: string | null
  description: string | null
  price: string | null
  state: StateEnum
  reservedBy: string | null
  wishRate: WishRateEnum

  constructor(gift: Gift) {
    this.id = gift.id
    this.userId = gift.userId
    this.name = gift.name
    this.url = gift.url
    this.description = gift.description
    this.price = gift.price
    this.state = gift.state
    this.reservedBy = gift.reservedById
    this.wishRate = gift.wishRate
  }

  static async getUserGifts(userId: string) {
    try {
      const result = await db
        .select()
        .from(gifts)
        .where(eq(gifts.userId, userId))
      return result
    } catch (error) {
      return error
    }
  }

  static async getGiftById(giftId: string): Promise<Gift> {
    try {
      const result = await db.select().from(gifts).where(eq(gifts.id, giftId))

      return result[0]
    } catch (error) {
      if (error instanceof Error) {
        console.error(`[GiftService - getGiftById] - ${error.message}`)
      } else {
        console.error('[GiftService - getGiftById] - An unknown error occurred')
      }
      throw new Error('[GiftService] - Failed to retrieve user')
    }
  }

  static async createGift(gift: CreateGift) {
    try {
      await db.insert(gifts).values({
        name: gift.name,
        userId: gift.userId,
        url: gift.url,
        description: gift.description,
        price: gift.price,
        wishRate: gift.wishRate,
        imageUrl: gift.imageUrl
      })
    } catch (error) {
      if (gift.storedImageName) {
        const mediaService = new MediaService(gift.storedImageName)
        mediaService.deleteFile('gifts')
      }
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - createGift]: ${error.message}`)
      }
      return error
    }
  }

  static async updateGift(gift: UpdateGift) {
    try {
      const giftId = gift.id ?? ''
      const userId = gift.userId ?? ''

      const updatedGift = {
        name: gift.name,
        url: gift.url,
        description: gift.description,
        price: gift.price,
        state: gift.state,
        wishRate: gift.wishRate,
        imageUrl: gift?.imageUrl,
        reservedById: gift.reservedById
      }

      const result = await db
        .update(gifts)
        .set({ ...updatedGift })
        .where(and(eq(gifts.id, giftId), eq(gifts.userId, userId)))
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

      return result[0]
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - deleteGift]: ${error.message}`)
      }
      throw new Error(
        '[GiftService - deleteGift]: An unexpected error has occurred'
      )
    }
  }

  static async reserveGift({ giftId, reservedById, state }: ReserveGift) {
    try {
      const result = await db
        .update(gifts)
        .set({ reservedById, state })
        .where(and(eq(gifts.id, giftId)))
        .returning()

      if (result.length === 0) {
        throw new Error('No gift found')
      }
      return result[0].state
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[GiftService - reserveGift]: ${error.message}`)
      }
      throw new Error(
        '[GiftService - reserveGift]: An unexpected error has occurred'
      )
    }
  }
}

export default GiftService
