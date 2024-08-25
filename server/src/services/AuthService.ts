import { DrizzleError, eq } from 'drizzle-orm'
import { users } from '../db/schemas/user'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'

class AuthService {
  email: string
  password: string
  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
  async login(): Promise<User> {
    try {
      const user: User | undefined = await db.query.users.findFirst({
        where: eq(users.email, this.email)
      })

      if (!user) {
        throw new Error('No user found')
      }

      if (!user.password) {
        throw new Error('Missing password')
      }

      const match = await bcrypt.compare(this.password, user.password)
      if (!match) {
        throw new Error('Error when comparing password')
      }

      return user
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - login]: ${error.message}`)
      }
      throw new Error('[UserService - login]: An unexpected error has occurred')
    }
  }
}
export default AuthService
