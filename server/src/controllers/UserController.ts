import UserService from '../services/UserService'
import { DrizzleError } from 'drizzle-orm'
import { Context } from 'hono'

class UserController {
  constructor() {}

  createUser = async (c: Context) => {
    try {
      const { email, password } = await c.req.json()
      await UserService.createUser(email, password)
      return c.text('User successfully created', 201)
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log('err here')
        return c.text(error.message, 400)
      }
      return c.text(
        '[UserController - createUser]: Error while creating the user',
        400
      )
    }
  }
}

export default UserController
