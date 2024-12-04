import { db } from '../db/drizzle'
import { friends } from '../db/schemas/friend'
import FriendService from '../services/friendService'
import InvitationService from '../services/InvitationService'
import { getUserId } from '../utils/user/_utils'
import { and, DrizzleError, eq } from 'drizzle-orm'
import { Context } from 'hono'
import NotificationService from '../services/NotificationService'
import UserService from '../services/UserService'
import { updateNotificationState } from '../utils/notifications/notifications'

class InvitationController {
  constructor() {}

  sendInvitation = async (c: Context) => {
    try {
      const friendId = c.req.param('friendId')
      if (!friendId) throw new Error('Missing friendId param')

      const userId = getUserId(c)
      const { name } = await UserService.getUserById(friendId ?? '')
      const friend = {
        userId: friendId,
        name: name ?? ''
      }

      if (!userId) throw new Error('Missing userId param')

      const invitationService = new InvitationService(userId, friendId)

      await invitationService.sendInvitation()

      const notificationService = new NotificationService(userId, friend)
      notificationService.saveNotification()

      return c.text('Friend invitation has been successfully sent', 200)
    } catch (error) {
      console.log(`[InvitationController - sendInvitation]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while sending invitation', 400)
    }
  }

  answerInvitation = async (c: Context) => {
    try {
      const { userId, friendId } = c.req.param()
      if (!userId || !friendId)
        throw new Error(
          `Missing parameter, userId: ${userId}, friendId: ${friendId}`
        )

      const res = await c.req.json()

      const result = await db
        .select()
        .from(friends)
        .where(and(eq(friends.userId, friendId), eq(friends.friendId, userId)))

      const invitationService = new InvitationService(
        userId,
        friendId,
        res.answer
      )

      if (result[0].state === 'blocked') {
        throw new Error("User's blocked")
      }

      await invitationService.answerInvitation()
      await updateNotificationState(res.notificationId)

      return c.text('Friendship answer has been successfully sent', 200)
    } catch (error) {
      console.log(`[InvitationController - answer invitation]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while answering invitation', 400)
    }
  }
  deleteFriend = async (c: Context) => {
    try {
      const { userId, friendId } = c.req.param()
      if (!userId || !friendId)
        throw new Error(
          `Missing parameter, userId: ${userId}, friendId: ${friendId}`
        )

      const friendService = new FriendService(friendId, userId)
      await friendService.handleDeleteFriendship()

      return c.text('Friendship has been successfully deleted', 200)
    } catch (error) {
      console.log(`[InvitationController - delete friend]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while answering invitation', 400)
    }
  }
  blockUser = async (c: Context) => {
    try {
      const { userId, friendId } = c.req.param()
      if (!userId || !friendId)
        throw new Error(
          `Missing parameter, userId: ${userId}, friendId: ${friendId}`
        )

      const friendService = new FriendService(userId, friendId)

      await friendService.handleBlockUser()
      console.log(
        `[InvitationController - blockUser]: user ${friendId} has been blocked by ${userId}`
      )
      return c.text('User successfully blocked', 200)
    } catch (error) {
      console.log(`[InvitationController - blockUser]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while answering invitation', 400)
    }
  }
}

export default InvitationController
