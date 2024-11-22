import { deleteCookie, setCookie } from 'hono/cookie'
import AuthService from '../services/AuthService'
import { DrizzleError } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import { Context } from 'hono'
import UserService from '../services/UserService'
import { getUserId } from '../utils/user/_utils'
import { decode } from 'hono/jwt'
import { Email, EmailAndPasswordReq, ResetPasswordDataReq } from './_types'

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
      const { email, password } = await c.req.json<EmailAndPasswordReq>()
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
      return c.json({
        userId: user.id,
        name: user.name,
        token,
        verified: user.verified
      })
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

      return c.json({
        id: user.id,
        name: user.name,
        verified: user.verified
      })
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
      const data = await c.req.json<ResetPasswordDataReq>()
      const { token } = c.req.query()
      if (!token) {
        return c.json({ error: 'Invalid or missing token' }, 400)
      }
      const { payload } = decode(token)
      const userId = payload.userId as string

      await AuthService.resetPassword(userId, data)

      //EMAIL ALMOST DONE
      // NEED TO HANDLE NOW HOW TO UPDATE USER PASSWORD FRONT SIDE AND SERVER SIDE

      return c.text('Request handled')
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
      const { payload } = decode(token)
      const userId = payload.userId as string
      await AuthService.confirmSignup(userId)
      return c.redirect('http://localhost:5173/login')
    } catch (error) {
      console.log(`[AuthController - confirmSignup]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while signup confirmation', 400)
    }
  }

  async handleResetPasswordRequest(c: Context) {
    try {
      const { email } = await c.req.json<Email>()
      if (!email) {
        throw new Error('No email provided')
      }
      AuthService.handleResetPasswordRequest(email)

      return c.text('Password reset has been done')
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
