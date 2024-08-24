import { generateRandomUUID } from '../utils/_utils'
import { users } from '../db/schemas/user'
import { DrizzleError } from 'drizzle-orm'
import { User } from '../utils/types'
import { db } from '../db/drizzle'

class UserService {
  name?: string
  email: string
  password: string
  constructor(user: User) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
  }
  static async createUser(email: string, password: string) {
    try {
      if (!email || !password)
        throw new Error('[UserService - createUser]: Missing parameter')
      await db.insert(users).values({ email, password })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - createUser]: ${error.message}`)
      }
      return error
    }
  }
}

export default UserService
