import { db } from '../../db/firebase'
import { Notification } from './_types'

export const getAllNotifications = async (userId: string) => {
  try {
    const notificationsRef = db.collection('notifications')

    const snapshot = await notificationsRef
      .where('friendId', '==', userId)
      .get()

    if (snapshot.empty) {
      return []
    }

    const notifications: Notification[] = []

    snapshot.forEach((doc) => {
      const notification: Notification = {
        ...(doc.data() as Notification),
        id: doc.id
      }
      notifications.push(notification)
    })

    return notifications
  } catch (error) {
    console.log(error)
  }
}

export const updateNotificationState = async (notificationId: string) => {
  try {
    const notificationsRef = db.collection('notifications').doc(notificationId)
    await notificationsRef.set(
      {
        isRead: true
      },
      { merge: true }
    )
  } catch (error) {
    console.log(error)
  }
}
