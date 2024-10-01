import { eq } from 'drizzle-orm'
import { db } from '../db/drizzle'
import { createMiddleware } from 'hono/factory'
import { User } from '../utils/types'
import { users } from '../db/schemas/user'

export const isUserExists = createMiddleware(async (c, next) => {
  const { email } = await c.req.json()

  if (!email) return c.text('[isUserExistsMiddleware]: Missing parameter', 400)

  const user: User | undefined = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  if (!user)
    return c.text(`[isUserExistsMiddleware]: This email doesn't exists`, 400)

  await next()
})
