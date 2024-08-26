import { getCookie } from 'hono/cookie'
import { decode } from 'hono/jwt'
import { Context } from 'hono'

export const getUserId = (c: Context): string | undefined => {
  const sessionToken = getCookie(c, 'session')
  if (!sessionToken) {
    return undefined
  }
  const { payload } = decode(sessionToken)
  const userId = payload.userId as string
  return userId
}
