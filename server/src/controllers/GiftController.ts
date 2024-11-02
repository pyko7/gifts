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
import { deleteFile, getFileName, uploadAndGetFile } from '../utils/file/_utils'
import UserService from '../services/UserService'

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
        image = await uploadAndGetFile(body['file'])
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
          const fileName = getFileName(currentGift.imageUrl ?? '')
          if (!fileName) return
          deleteFile(fileName)
        }
        image = await uploadAndGetFile(body['file'])

        // if file has been deleted
      } else if (!body['imageUrl']) {
        const fileName = getFileName(currentGift.imageUrl ?? '')
        if (!fileName) return
        deleteFile(fileName)

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
        const fileName = getFileName(result.imageUrl)
        if (fileName) {
          deleteFile(fileName)
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

      const userId = getUserId(c)

      if (!userId)
        return c.text('[GiftController - reserveGift]: Wrong userId', 401)

      const req = await c.req.json()
      if (!req) throw new Error('No request provided')

      const computedReservation: ReserveGift = {
        giftId,
        reservedById: userId,
        state: req.state
      }

      GiftService.reserveGift(computedReservation)
      return c.text('Reservation successfully made', 200)
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
