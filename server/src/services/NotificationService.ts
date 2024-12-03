import { db } from '../db/firebase'
import { SaveNotification } from './notificationService/_types'

type Friend = {
  userId: string
  name: string
}

class NotificationService {
  userId: string
  friend: Friend
  constructor(userId: string, friend: Friend) {
    this.userId = userId
    this.friend = friend
  }
  async saveNotification() {
    try {
      const data: SaveNotification = {
        userId: this.userId,
        friendId: this.friend.userId,
        message: `${this.friend.name} vous a envoyé une demande d'ami`,
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
