import { and, DrizzleError, eq } from 'drizzle-orm'
import { friends } from '../db/schemas/friend'
import { db } from '../db/drizzle'

class FriendService {
  userId: string | null
  friendId: string | null
  constructor(userId: string | null, friendId: string | null) {
    this.userId = userId
    this.friendId = friendId
  }

  async handleDeleteFriendship() {
    try {
      const result = await db
        .delete(friends)
        .where(
          and(
            eq(friends.userId, this.friendId ?? ''),
            eq(friends.friendId, this.userId ?? '')
          )
        )
        .returning()
      if (result.length === 0) {
        throw new Error('Deletion failed, no friendship found ')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(
          `[FriendService - handleDeleteFriendship]: ${error.message}`
        )
      }
      throw new Error(
        '[FriendService - handleDeleteFriendship]: An unexpected error has occurred'
      )
    }
  }
  async handleBlockUser() {
    try {
      const friendship = await db
        .select()
        .from(friends)
        .where(
          and(
            eq(friends.userId, this.userId ?? ''),
            eq(friends.friendId, this.friendId ?? '')
          )
        )
      if (friendship.length === 0) {
        await db.insert(friends).values({
          userId: this.userId ?? '',
          friendId: this.friendId ?? '',
          state: 'blocked'
        })
      } else {
        await db
          .update(friends)
          .set({ state: 'blocked' })
          .where(
            and(
              eq(friends.userId, this.userId ?? ''),
              eq(friends.friendId, this.friendId ?? '')
            )
          )
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(
          `[FriendService - handleDeleteFriendship]: ${error.message}`
        )
      }
      throw new Error(
        '[FriendService - handleDeleteFriendship]: An unexpected error has occurred'
      )
    }
  }
}
export default FriendService
