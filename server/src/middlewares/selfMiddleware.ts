import { getUserId } from '../utils/user/_utils'
import { createMiddleware } from 'hono/factory'

export const selfMiddleware = createMiddleware(async (c, next) => {
  const reqUserId = c.req.param('userId')
  if (!reqUserId) return c.text('[SelfMiddleware]: Missing parameter', 400)

  const userId = getUserId(c)
  if (!userId) return c.text('[SelfMiddleware]: Invalid session token', 401)

  if (reqUserId !== userId)
    return c.text('[SelfMiddleware]: Unauthorized access', 401)

  await next()
})
