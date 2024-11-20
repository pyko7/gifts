import { deleteCookie, setCookie } from 'hono/cookie'
import AuthService from '../services/AuthService'
import { DrizzleError } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import { Context } from 'hono'
import UserService from '../services/UserService'
import { getUserId } from '../utils/user/_utils'

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
      console.log(`user ${user.id} successfully logged in`)
      return c.json({ userId: user.id, name: user.name, token })
    } catch (error) {
      console.log(`[AuthController - login]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while login', 400)
    }
  }

  async validateSession(c: Context) {
    try {
      const userId = getUserId(c)
      if (!userId) {
        return c.text('Invalid userId', 401)
      }
      const user = await UserService.getUserById(userId)
      return c.json({ id: user.id, name: user.name })
    } catch (error) {
      console.log(`[AuthController - validateSession]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while validating the session', 400)
    }
  }

  logout(c: Context) {
    try {
      deleteCookie(c, 'session')
      return c.text('User successfully logged out')
    } catch (error) {
      console.log(`[AuthController - logout]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while logout', 500)
    }
  }

  forgotPassword = async (c: Context) => {
    try {
      const { email } = await c.req.json()
      if (!email) {
        throw new Error('No email provided')
      }
      await AuthService.forgotPassword(email)

      return c.text('email sent', 200)
    } catch (error) {
      console.log(`[AuthController - forgotPassword]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while reset password', 400)
    }
  }

  async confirmSignup(c: Context) {
    try {
      const { token } = c.req.query()

      if (!token) {
        return c.json({ error: 'Invalid or missing token' }, 400)
      }
      await AuthService.confirmSignup(token)
      return c.redirect('http://localhost:5173/login')
    } catch (error) {
      console.log(`[AuthController - confirmSignup]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while signup confirmation', 400)
    }
  }
}

export default AuthController
