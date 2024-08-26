import GiftService from '../services/GiftService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { Gift } from '../types/gifts'
import { Context } from 'hono'

class GiftController {
  constructor() {}

  createGift = async (c: Context) => {
    try {
      const req = await c.req.json()
      const userId = getUserId(c)
      const gift: Gift = { ...req, userId }
      const giftService = new GiftService(gift)

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
      const giftId = c.req.param('id')
      // eslint-disable-next-line no-undef
      const secret = process.env.COOKIE_SECRET
      if (!secret) {
        throw new Error('Missing secret')
      }
      const req = await c.req.json()

      const userId = getUserId(c)

      if (!userId) {
        return c.text(
          '[GiftController - updateGift]: Invalid session token',
          401
        )
      }

      const gift: Gift = {
        ...req,
        id: giftId,
        userId
      }

      const giftService = new GiftService(gift)
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
      const giftId = c.req.param('id')
      const userId = getUserId(c)
      if (!userId) {
        return c.text(
          '[GiftController - updateGift]: Invalid session token',
          401
        )
      }

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
