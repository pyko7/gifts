import { createMiddleware } from 'hono/factory'
import { friends } from '../db/schemas/friend'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/drizzle'
import { getUserId } from '../utils/user/_utils'

// Check if friendship already exist
export const friendshipMiddleware = createMiddleware(async (c, next) => {
  const userId = getUserId(c)
  const friendId = c.req.param('friendId')

  if (!userId || !friendId)
    return c.text('[FriendshipMiddleware]: Missing parameter', 400)

  const result = await db
    .select()
    .from(friends)
    .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)))

  if (result) {
    return c.text('[FriendshipMiddleware]: Friendship already exists', 400)
  }

  await next()
})
