import { generateRandomNumber } from '../utils/_utils'
import { users } from '../db/schemas/user'
import { DrizzleError } from 'drizzle-orm'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'

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
      // eslint-disable-next-line no-undef
      const { MIN_SALT_VALUE, MAX_SALT_VALUE } = process.env

      if (!email || !password)
        throw new Error('Missing email or password parameter')
      else if (!MIN_SALT_VALUE || !MAX_SALT_VALUE)
        throw new Error('No salt value provided')

      const saltRounds = generateRandomNumber(
        parseInt(MIN_SALT_VALUE),
        parseInt(MAX_SALT_VALUE)
      )

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw new Error(`[hashPassword]: ${err?.message}`)
        await db.insert(users).values({ email, password: hash })
      })
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - createUser]: ${error.message}`)
      }
      return error
    }
  }
}

export default UserService
