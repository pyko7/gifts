import InvitationService from '../services/InvitationService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { Context } from 'hono'

class InvitationController {
  constructor() {}

  sendInvitation = async (c: Context) => {
    try {
      const friendId = c.req.param('friendId')
      if (!friendId)
        return c.text(
          '[InvitationController - sendInvitation]: Missing friendId param',
          400
        )

      const userId = getUserId(c)
      if (!userId)
        return c.text(
          '[InvitationController - sendInvitation]: Missing userId param',
          400
        )

      const invitationService = new InvitationService(userId, friendId)

      await invitationService.sendInvitation()

      return c.text('Friend invitation has been successfully sent', 200)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('[InvitationController - login]: Error while login', 400)
    }
  }

  answerInvitation = async (c: Context) => {
    try {
      const { userId, friendId } = c.req.param()
      if (!userId || !friendId)
        return c.text(
          '[InvitationController - sendInvitation]: Missing parameter',
          400
        )

      const answer = await c.req.json()
      const invitationService = new InvitationService(
        userId,
        friendId,
        answer.friendshipStatus
      )

      await invitationService.answerInvitation()

      return c.text('Friendship answer has been successfully sent', 200)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('[InvitationController - logout]: Error while logout', 500)
    }
  }
}

export default InvitationController
