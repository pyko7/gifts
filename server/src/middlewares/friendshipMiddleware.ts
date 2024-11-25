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
    console.log("[FriendshipMiddleware]: Can't invite himself")
    return c.text("Can't invite himself", 400)
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
    console.log('[FriendshipMiddleware]: Friendship already exists')
    return c.text('Friendship already exists', 400)
  }

  await next()
})
