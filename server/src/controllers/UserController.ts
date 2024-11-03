import UserService from '../services/UserService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { deleteCookie } from 'hono/cookie'
import { Context } from 'hono'

class UserController {
  constructor() {}

  createUser = async (c: Context) => {
    try {
      const { email, password } = await c.req.json()
      await UserService.createUser(email, password)
      return c.text('User successfully created', 201)
    } catch (error) {
      console.log(error)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while creating the user', 400)
    }
  }

  getUserById = async (c: Context) => {
    try {
      const { userId } = c.req.param()

      if (!userId) {
        return c.text('[UserController - getUserById]: Invalid userId', 401)
      }

      const user = await UserService.getUserById(userId)
      return c.json(user, 200)
    } catch (error) {
      console.log(error)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text('Error while getting the user', 400)
    }
  }

  updateUser = async (c: Context) => {
    try {
      // eslint-disable-next-line no-undef
      const secret = process.env.COOKIE_SECRET
      const param = c.req.param('id')

      if (!secret) {
        throw new Error('Missing secret')
      }
      const user = await c.req.json()
      const userId = getUserId(c)

      if (!userId) {
        return c.text('Invalid session token', 401)
      }

      if (param !== userId) {
        return c.text('Invalid userId', 401)
      }

      const updatedUser = await UserService.updateUser(user, userId)

      return c.json(updatedUser)
    } catch (error) {
      console.log(`[UserController - updateUser]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(' Error while updating the user', 500)
    }
  }
  deleteUser = async (c: Context) => {
    try {
      const userId = getUserId(c)
      if (!userId) {
        return c.text(
          '[UserController - updateUser]: Invalid session token',
          401
        )
      }
      await UserService.deleteUser(userId)
      deleteCookie(c, 'session')
      c.text('User successfully deleted', 200)
      return c.redirect('/')
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        return c.text(error.message, 400)
      }
      return c.text(
        '[UserController - updateUser]: Error while deleting the user',
        500
      )
    }
  }
}

export default UserController
