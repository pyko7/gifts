import { generateRandomNumber } from '../utils/_utils'
import { DrizzleError, eq } from 'drizzle-orm'
import { users } from '../db/schemas/user'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'

class UserService {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  constructor(user: User) {
    this.id = user.id
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
  //TODO: CREATE THIS FUNCTION
  static async updateUser(data: User) {
    try {
      await db
        .update(users)
        .set({ ...data })
        .where(eq(users.id, data.id))
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - updateUser]: ${error.message}`)
      }
      return error
    }
  }
}

export default UserService
