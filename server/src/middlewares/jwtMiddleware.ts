/* eslint-disable no-undef */
import { Context, Next } from 'hono'
import { deleteCookie } from 'hono/cookie'
import { jwt } from 'hono/jwt'

// Check if session is valid
export const jwtMiddleware = async (c: Context, next: Next) => {
  const middleware = jwt({
    secret: process.env.JWT_SECRET ?? '',
    cookie: 'session'
  })

  try {
    await middleware(c, next)
  } catch (err) {
    console.error('JWT Error:', err)
    deleteCookie(c, 'session')
    return c.text('Invalid session', 401)
  }
}
