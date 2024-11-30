import { db } from '../db/firebase'
import { SaveNotification } from './notificationService/_types'

class NotificationService {
  userId: string
  friendName: string
  constructor(userId: string, friendName: string) {
    this.userId = userId
    this.friendName = friendName
  }
  async saveNotification() {
    try {
      const data: SaveNotification = {
        userId: this.userId,
        message: `${this.friendName} vous a envoyé une demande d'ami`,
        createdAt: new Date(),
        isRead: false
      }
      await db.collection('notifications').add(data)
    } catch (error) {
      console.error('[saveNotification -  Save failed:', error)
    }
  }
}

export default NotificationService
