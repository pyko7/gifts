import {
  CreateGift,
  GiftFormData,
  ReserveGift,
  UpdateGift,
  WishRateEnum
} from '../types'
import GiftService from '../services/GiftService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { Context } from 'hono'
import UserService from '../services/UserService'
import MediaService from '../services/mediaService/MediaService'

class GiftController {
  constructor() {}

  getUserGifts = async (c: Context) => {
    try {
      const userId = c.req.param('userId')

      if (!userId || userId === 'undefined') {
        return c.text('[GiftController - getUserGifts]: Missing parameter', 400)
      }

      const result = await GiftService.getUserGifts(userId)

      if (!result) {
        return c.text('[GiftController - getUserGifts]: No gifts found', 400)
      }

      c.text('Gift successfully retrieved', 200)
      return c.json(result)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - getUserGifts]: Error while getting the gifts',
        500
      )
    }
  }

  getGiftById = async (c: Context) => {
    try {
      const giftId = c.req.param('giftId')

      if (!giftId)
        return c.text('[GiftController - getGiftById]: Missing parameter', 400)

      const result = await GiftService.getGiftById(giftId)
      if (!result) {
        return c.text('[GiftController - getGiftById]: No gifts found', 400)
      }

      const user = await UserService.getUserById(result.userId)

      c.text('Gift successfully got', 200)
      return c.json({ ...result, userName: user.name })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - getGiftById]: Error while getting the gift',
        500
      )
    }
  }

  createGift = async (c: Context) => {
    try {
      const userId = getUserId(c)
      const body = await c.req.parseBody<GiftFormData>({ dot: true })

      if (!body) throw new Error('No request provided')
      let image = null

      if (body['file']) {
        image = await MediaService.uploadAndGetFile(body['file'], 'gifts')
      }

      const computedGift: CreateGift = {
        userId: userId ?? '',
        name: body['name'],
        description: body['description'],
        url: body['url'],
        price: body['price'],
        wishRate: body['wishRate'] as WishRateEnum,
        imageUrl: image?.url ?? null,
        storedImageName: image?.name
      }

      await GiftService.createGift(computedGift)

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
      const { giftId } = c.req.param()

      if (!giftId) throw new Error('Missing parameter')

      const body = await c.req.parseBody<GiftFormData>({ dot: true })

      if (!body) throw new Error('No request provided')

      const currentGift = await GiftService.getGiftById(body['id'] ?? '')

      let image = undefined

      // if new file
      if (body['file']) {
        if (currentGift?.imageUrl) {
          const mediaService = new MediaService(currentGift.imageUrl)
          const hasToDelete = mediaService.checkHasToDelete()
          if (!hasToDelete) return
          mediaService.deleteFile('gifts')
        }
        image = await MediaService.uploadAndGetFile(body['file'], 'gifts')

        // if file has been deleted
      } else if (!body['imageUrl']) {
        const mediaService = new MediaService(currentGift.imageUrl ?? '')
        const hasToDelete = mediaService.checkHasToDelete()
        if (hasToDelete) {
          mediaService.deleteFile('gifts')
        }
        // else file hasn't changed
      } else {
        image = {
          url: currentGift.imageUrl
        }
      }

      const computedGift: UpdateGift = {
        id: currentGift.id ?? '',
        userId: currentGift.userId ?? '',
        name: body['name'],
        description: body['description'],
        url: body['url'],
        price: body['price'],
        wishRate: body['wishRate'] as WishRateEnum,
        imageUrl: image?.url ?? null,
        storedImageName: image?.name,
        state: currentGift.state,
        reservedById: currentGift.reservedById
      }

      await GiftService.updateGift(computedGift)

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

      if (!giftId) throw new Error('Missing parameter')

      const result = await GiftService.deleteGift(userId, giftId)

      if (result && result.imageUrl) {
        const mediaService = new MediaService(result.imageUrl)
        const hasToDelete = mediaService.checkHasToDelete()
        if (hasToDelete) {
          mediaService.deleteFile('gifts')
        }
      }

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

  reserveGift = async (c: Context) => {
    try {
      const giftId = c.req.param('giftId')

      if (!giftId) throw new Error('Missing parameter')
      const gift = await GiftService.getGiftById(giftId)

      if (!gift) throw new Error('[ReserveGift] - No gift found ')

      const userId = getUserId(c)

      if (!userId || (gift.reservedById && gift.reservedById !== userId))
        return c.text('[GiftController - reserveGift]: Wrong userId', 401)

      const state = gift.state === 'available' ? 'unavailable' : 'available'

      const computedReservation: ReserveGift = {
        giftId,
        reservedById: state === 'available' ? null : userId,
        state
      }

      const result = await GiftService.reserveGift(computedReservation)

      return c.json(result, 200)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[GiftController - reserveGift]: Error while making the reservation',
        500
      )
    }
  }
}

export default GiftController
