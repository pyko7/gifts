import GiftService from '../services/GiftService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { Gift } from '../types/gifts'
import { Context } from 'hono'

class GiftController {
  constructor() {}

  createGift = async (c: Context) => {
    try {
      const userId = getUserId(c)
      const req = await c.req.json()

      if (!req) throw new Error('No request provided')

      const computedGift: Gift = { ...req, userId }
      const giftService = new GiftService(computedGift)

      await giftService.createGift()

      return c.text('Gift successfully created', 201)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - createGift]: Error while creating the gift',
        500
      )
    }
  }

  updateGift = async (c: Context) => {
    try {
      const { userId, giftId } = c.req.param()

      if (!giftId) throw new Error('Missing parameter')

      const req = await c.req.json()

      if (!req) throw new Error('No request provided')

      // eslint-disable-next-line no-undef
      const secret = process.env.COOKIE_SECRET

      if (!secret) throw new Error('Missing secret')

      const computedGift: Gift = { ...req, id: giftId, userId }
      const giftService = new GiftService(computedGift)

      await giftService.updateGift()

      return c.text('Gift successfully updated', 200)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - updateGift]: Error while updating the user',
        500
      )
    }
  }
  deleteGift = async (c: Context) => {
    try {
      const { userId, giftId } = c.req.param()

      if (!userId || !giftId) throw new Error('Missing parameter')

      await GiftService.deleteGift(userId, giftId)

      return c.text('Gift successfully deleted', 200)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - updateGift]: Error while deleting the user',
        500
      )
    }
  }
}

export default GiftController
