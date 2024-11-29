import { createMiddleware } from 'hono/factory'
import { friends } from '../db/schemas/friend'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/drizzle'
import { getUserId } from '../utils/user/_utils'

// Check if friendship already exist
export const friendshipMiddleware = createMiddleware(async (c, next) => {
  const userId = getUserId(c)
  const friendId = c.req.param('friendId')

  if (userId === friendId) {
    console.log("[FriendshipMiddleware]: Can't invite yourself")
    return c.text("Can't invite yourself", 400)
  }

  if (!userId || !friendId) {
    console.log('[FriendshipMiddleware]: Missing parameter')
    return c.text('[FriendshipMiddleware]: Missing parameter', 400)
  }

  const result = await db
    .select()
    .from(friends)
    .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)))

  if (result.length > 0) {
    const friendshipInvitationState = result[0].state
    if (friendshipInvitationState === 'pending') {
      console.log('[FriendshipMiddleware]: Friendship invitation pending')
      return c.text('Friendship invitation pending', 400)
    }
    if (friendshipInvitationState === 'blocked') {
      console.log("[FriendshipMiddleware]: User's blocked")
      return c.text("User's blocked", 400)
    }
    console.log('[FriendshipMiddleware]: Friendship already exists')
    return c.text('Friendship already exists', 400)
  }

  await next()
})
