import GiftController from '../controllers/GiftController'
import { Hono } from 'hono'
import 'dotenv/config'

export const gift = new Hono()
const giftController = new GiftController()

gift.post('/create', giftController.createGift)
gift.put('/update/:id', giftController.updateGift)
gift.put('/delete/:id', giftController.deleteGift)
