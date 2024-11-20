import { eq } from 'drizzle-orm'
import { db } from '../db/drizzle'
import { createMiddleware } from 'hono/factory'
import { User } from '../utils/types'
import { users } from '../db/schemas/user'
import { getCookie } from 'hono/cookie'
import { getUserId } from '../utils/user/_utils'

export const confirmedMiddleware = createMiddleware(async (c, next) => {
  if (c.req.path.includes('/auth/login')) {
    const { email } = await c.req.json()
    const user: User | undefined = await db.query.users.findFirst({
      where: eq(users.email, email)
    })
    if (!user) {
      console.log('[confirmedMiddleware] - Invalid userId')
      return c.text('Invalid userId', 400)
    }
    if (!user.isConfirmed || user.confirmToken !== null) {
      console.log('[confirmedMiddleware] - Account not confirmed')
      return c.text(`Account not confirmed`, 400)
    }
  } else {
    const { session } = getCookie(c)
    if (!session) {
      console.log('[confirmedMiddleware] - Invalid session')
      return c.text('Invalid userId', 400)
    }
    const userId = getUserId(c)

    if (!userId) {
      console.log('[confirmedMiddleware] - No user found')
      return c.text(`No user found`, 400)
    }

    const user: User | undefined = await db.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (!user) {
      console.log('[confirmedMiddleware] - Account not confirmed')
      return c.text(`Account not confirmed`, 400)
    }
  }

  await next()
})
