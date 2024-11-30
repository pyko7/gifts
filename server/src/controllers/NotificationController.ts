import { Context } from 'hono'
import { getUserId } from '../utils/user/_utils'
import { getAllNotifications } from '../utils/notifications/notifications'
import { FirebaseFirestoreError } from 'firebase-admin/firestore'

class NotificationController {
  constructor() {}

  async getAllNotifications(c: Context) {
    try {
      const userId = getUserId(c)
      if (!userId) {
        return c.text('Invalid userId', 401)
      }

      const notifications = await getAllNotifications(userId)

      return c.json(notifications)
    } catch (error) {
      console.log(`[NotificationController - getAllNotifications]: ${error}`)
      if (error instanceof Error || error instanceof FirebaseFirestoreError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while getting notifications', 400)
    }
  }
}

export default NotificationController
