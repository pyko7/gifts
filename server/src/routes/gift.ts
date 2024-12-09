import { selfMiddleware } from '../middlewares/selfMiddleware'
import GiftController from '../controllers/GiftController'
import { Hono } from 'hono'
import 'dotenv/config'
import {
  validateGift,
  validateGiftUpdate
} from '../middlewares/validation/gift'

export const gift = new Hono()
const giftController = new GiftController()

// get user's gifts list
gift.get('/:userId/all', giftController.getUserGifts)

// get user friends gifts list
gift.get('/:userId/friends', giftController.getFriendsGifts)

// get gift by userId
gift.get('/single/:giftId', giftController.getGiftById)

gift.post('/create', validateGift, giftController.createGift)
gift.put(
  '/update/:userId/:giftId',
  validateGiftUpdate,
  selfMiddleware,
  giftController.updateGift
)
gift.delete(
  '/delete/:userId/:giftId',
  selfMiddleware,
  giftController.deleteGift
)
gift.put('/reservation/:giftId', giftController.reserveGift)
