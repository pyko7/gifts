import { generateRandomNumber, generateToken } from '../utils/_utils'
import { DrizzleError, eq } from 'drizzle-orm'
import { users } from '../db/schemas/user'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'
import EmailService from './EmailService'
import { EmailServiceType, EmailUser } from './emailService/_types'
import { generateSignUpEmailTemplate } from '../templates/email/signup'

type HandleEmailUpdate = {
  currentEmail: string
  email: string
  newEmail: string
}

type HandlePasswordReset = {
  currentPassword: string
  password: string
  newPassword: string
}

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

  static async hashPassword(password: string): Promise<string> {
    // eslint-disable-next-line no-undef
    const { MIN_SALT_VALUE, MAX_SALT_VALUE } = process.env

    if (!MIN_SALT_VALUE || !MAX_SALT_VALUE)
      throw new Error('No salt value provided')

    const saltRounds = generateRandomNumber(
      parseInt(MIN_SALT_VALUE),
      parseInt(MAX_SALT_VALUE)
    )

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(`[hashPassword]: ${err.message}`)
          return reject(new Error(err.message))
        }
        resolve(hash)
      })
    })
  }

  static async createUser(email: string, password: string) {
    try {
      if (!email || !password)
        throw new Error('Missing email or password parameter')

      const confirmToken = generateToken()
      const hashedPassword = await this.hashPassword(password)
      const result = await db
        .insert(users)
        .values({ email, password: hashedPassword, confirmToken })
        .returning()

      if (result.length > 0) {
        const emailSender: EmailUser = {
          name: 'Gifts team',
          // eslint-disable-next-line no-undef
          email: process.env.CONTACT_EMAIL ?? ''
        }
        const emailTo = [
          {
            name: result[0].email,
            email: result[0].email
          }
        ]

        // eslint-disable-next-line no-undef
        const API_URL = process.env.API_URL ?? ''
        const confirmationUrl = `${API_URL}/auth/confirm-signup?token=${confirmToken}`
        const emailTemplate = generateSignUpEmailTemplate(confirmationUrl)

        const email: EmailServiceType = {
          emailSender,
          emailSubject: "Confirmation d'inscription",
          emailTo,
          emailTemplate: emailTemplate
        }
        const emailService = new EmailService(email)
        await emailService.sendMail()
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log(`[UserService - createUser]: ${error.message}`)
        throw new Error(error.message)
      }
      console.log(
        '[UserService - createUser]: An unexpected error has occurred'
      )
      throw new Error('An unexpected error has occurred')
    }
  }

  static async getUserById(id: string) {
    try {
      const res: User | undefined = await db.query.users.findFirst({
        where: eq(users.id, id)
      })

      if (!res) {
        throw new Error('Retrieve failed, no user found ')
      }

      const user: Pick<User, 'name' | 'email' | 'id' | 'imageUrl'> = {
        id: res.id,
        name: res.name,
        email: res.email,
        imageUrl: res.imageUrl
      }

      return user
    } catch (error) {
      console.log(`[UserService - getUserById]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - getUserById]: ${error.message}`)
      }
      throw new Error('An unexpected error has occurred')
    }
  }

  static async getUserSensitiveData(id: string) {
    try {
      const res: User | undefined = await db.query.users.findFirst({
        where: eq(users.id, id)
      })

      if (!res) {
        throw new Error('Retrieve failed, no user found ')
      }

      const user: Pick<User, 'password'> = {
        password: res.password
      }

      return user
    } catch (error) {
      console.log(`[UserService - getUserSensitiveData]: ${error}`)
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(
          `[UserService - getUserSensitiveData]: ${error.message}`
        )
      }
      throw new Error('An unexpected error has occurred')
    }
  }

  static async updateUser(user: User, userId: string) {
    try {
      const result: User[] = await db
        .update(users)
        .set({ ...user })
        .where(eq(users.id, userId))
        .returning()

      if (result.length === 0) {
        throw new Error('Update failed')
      }
      const updatedUser = {
        name: result[0].name,
        email: result[0].email
      }
      return updatedUser
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log(`[UserService - updateUser]: ${error.message}`)
        throw new Error(`${error.message}`)
      }
      throw new Error('An unexpected error has occurred')
    }
  }

  static async deleteUser(userId: string) {
    try {
      const result = await db
        .delete(users)
        .where(eq(users.id, userId))
        .returning()
      if (result.length === 0) {
        throw new Error('Deletion failed, no user found ')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        throw new Error(`[UserService - deleteUser]: ${error.message}`)
      }
      throw new Error(
        '[UserService - deleteUser]: An unexpected error has occurred'
      )
    }
  }
  static handleEmailUpdate(emails: HandleEmailUpdate) {
    const { currentEmail, email, newEmail } = emails

    if (currentEmail !== email) {
      throw new Error('Wrong current email')
    }
    if (currentEmail === newEmail) {
      throw new Error('Emails have to be different')
    }
    return newEmail
  }
  static async handlePasswordReset(passwords: HandlePasswordReset) {
    const { currentPassword, password, newPassword } = passwords

    const isCurrentPasswordMatch = await bcrypt.compare(
      password,
      currentPassword
    )
    if (!isCurrentPasswordMatch) {
      throw new Error('Wrong current password')
    }

    const isNewPasswordSameAsCurrent = await bcrypt.compare(
      newPassword,
      currentPassword
    )
    if (isNewPasswordSameAsCurrent) {
      throw new Error('Passwords have to be different')
    }

    return newPassword
  }
}

export default UserService
