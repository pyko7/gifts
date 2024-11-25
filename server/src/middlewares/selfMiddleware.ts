import { getUserId } from '../utils/user/_utils'
import { createMiddleware } from 'hono/factory'

export const selfMiddleware = createMiddleware(async (c, next) => {
  const reqUserId = c.req.param('userId')

  if (!reqUserId) {
    console.log('[SelfMiddleware]: Missing parameter')
    return c.text('Missing parameter', 400)
  }

  const userId = getUserId(c)
  if (!userId) {
    console.log('[SelfMiddleware]: Invalid session token')
    return c.text('Invalid session token', 401)
  }

  if (reqUserId !== userId) {
    console.log('[SelfMiddleware]: Unauthorized access')
    return c.text('Unauthorized access', 401)
  }

  await next()
})
