import { FriendshipStatusEnum } from '../types/invitations'
import { and, DrizzleError, eq } from 'drizzle-orm'
import { friends } from '../db/schemas/friend'
import { db } from '../db/drizzle'
import FriendService from './friendService'

class InvitationService {
  userId: string | null
  friendId: string | null
  friendshipStatus?: FriendshipStatusEnum
  constructor(
    userId: string | null,
    friendId: string | null,
    friendshipStatus?: FriendshipStatusEnum
  ) {
    this.userId = userId
    this.friendId = friendId
    this.friendshipStatus = friendshipStatus
  }
  async sendInvitation() {
    try {
      if (!this.userId || !this.friendId)
        throw new Error('Missing userId or friendId parameter')

      await db.insert(friends).values({
        userId: this.userId,
        friendId: this.friendId,
        state: 'pending'
      })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(
          `[InvitationService - sendInvitation]: ${error.message}`
        )
      }
      throw new Error(
        '[InvitationService - sendInvitation]: An unexpected error has occurred'
      )
    }
  }
  async answerInvitation() {
    try {
      if (!this.userId || !this.friendId || !this.friendshipStatus)
        throw new Error('Missing parameter')

      if (this.friendshipStatus === 'declined') {
        const friendService = new FriendService(this.userId, this.friendId)
        await friendService.handleDeleteFriendship()
        return
      } else if (this.friendshipStatus === 'blocked') {
        const friendService = new FriendService(this.userId, this.friendId)
        await friendService.handleBlockUser()
        return
      }

      const result = await db
        .update(friends)
        .set({ state: this.friendshipStatus })
        .where(
          and(
            eq(friends.userId, this.userId),
            eq(friends.friendId, this.friendId)
          )
        )
        .returning()

      if (result.length === 0) throw new Error('No friendship found')
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(
          `[InvitationService - sendInvitation]: ${error.message}`
        )
      }
      throw new Error(
        '[InvitationService - sendInvitation]: An unexpected error has occurred'
      )
    }
  }
}
export default InvitationService
