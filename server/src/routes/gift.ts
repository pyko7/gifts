import { selfMiddleware } from '../middlewares/selfMiddleware'
import GiftController from '../controllers/GiftController'
import { Hono } from 'hono'
import 'dotenv/config'

export const gift = new Hono()
const giftController = new GiftController()

gift.post('/create', giftController.createGift)
gift.put('/update/:userId/:giftId', selfMiddleware, giftController.updateGift)
gift.put('/delete/:userId/:giftId', giftController.deleteGift)
