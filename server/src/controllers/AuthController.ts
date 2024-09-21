import { deleteCookie, setCookie } from 'hono/cookie'
import AuthService from '../services/AuthService'
import { DrizzleError } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import { Context } from 'hono'

class AuthController {
  constructor() {}

  login = async (c: Context) => {
    try {
      // eslint-disable-next-line no-undef
      const { JWT_SECRET } = process.env
      const expiresAt = Math.floor(Date.now() / 1000) + 60 * 43800 // 1 month expiration

      if (!JWT_SECRET) {
        throw new Error('No secret provided')
      }
      const { email, password } = await c.req.json()
      const auth = new AuthService(email, password)
      const user = await auth.login()

      const payload = {
        userId: user.id,
        exp: expiresAt
      }

      const token = await sign(payload, JWT_SECRET)

      setCookie(c, 'session', token, {
        httpOnly: true,
        maxAge: 43800,
        sameSite: 'Lax',
        secure: false,
        path: '/'
      })

      return c.json({ token })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('[AuthController - login]: Error while login', 400)
    }
  }

  logout(c: Context) {
    try {
      deleteCookie(c, 'session')
      return c.text('User successfully logged out')
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('[AuthController - logout]: Error while logout', 500)
    }
  }
}

export default AuthController
