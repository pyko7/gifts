import { selfMiddleware } from '../middlewares/selfMiddleware'
import { Hono } from 'hono'
import NotificationController from '../controllers/NotificationController'
import 'dotenv/config'

export const notification = new Hono()
const notificationController = new NotificationController()

notification.get(
  '/all/:userId',
  selfMiddleware,
  notificationController.getAllNotifications
)
