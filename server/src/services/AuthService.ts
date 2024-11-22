import { DrizzleError, eq } from 'drizzle-orm'
import { users } from '../db/schemas/user'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'
import EmailService from './EmailService'
import { EmailServiceType, EmailUser } from './emailService/_types'
import { generateResetPasswordEmailTemplate } from '../templates/email/resetPassword'
import UserService from './UserService'
import { generateJwt } from '../utils/_utils'

type ResetPasswordData = {
  password: string
  newPassword: string
}

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
        const wrongEmail = 'No user found'
        const wrongPassword = 'Error when comparing password'
        console.log(`[AuthService - login]: ${error.message}`)

        if (wrongEmail || wrongPassword) {
          throw new Error('Invalid email or password')
        }
        throw new Error(error.message)
      }
      console.log('[AuthService - login]: An unexpected error has occurred')
      throw new Error('An unexpected error has occurred')
    }
  }
  static async handleResetPasswordRequest(userEmail: string) {
    try {
      const res: User | undefined = await db.query.users.findFirst({
        where: eq(users.email, userEmail)
      })

      if (!res) {
        throw new Error('Invalid email')
      }

      const payload = {
        userId: res.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 15 // Token expires in 15 minutes
      }
      const token = await generateJwt(payload)

      const emailSender: EmailUser = {
        name: 'Gifts team',
        // eslint-disable-next-line no-undef
        email: process.env.CONTACT_EMAIL ?? ''
      }

      const emailTo = [
        {
          name: res.name ?? '',
          email: res.email ?? ''
        }
      ]

      // eslint-disable-next-line no-undef
      const API_URL = process.env.API_URL ?? ''
      const resetUrl = `${API_URL}/auth/forgot-password/reset?token=${token}`
      const emailTemplate = generateResetPasswordEmailTemplate(resetUrl)

      const email: EmailServiceType = {
        emailSender,
        emailSubject: 'Mot de passe oublié',
        emailTo,
        emailTemplate
      }
      const emailService = new EmailService(email)
      await emailService.sendMail()
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log(`[AuthService - forgotPassword]: ${error.message}`)
        throw new Error(error.message)
      }
      console.log(
        '[AuthService - forgotPassword]: An unexpected error has occurred'
      )
      throw new Error('An unexpected error has occurred')
    }
  }

  static async confirmSignup(userId: string) {
    try {
      const res: User | undefined = await db.query.users.findFirst({
        where: eq(users.id, userId)
      })

      if (!res) {
        throw new Error('Token is invalid or has expired')
      }

      const userRes = await UserService.updateUser(
        { ...res, verified: true },
        res.id
      )

      if (!userRes) {
        throw new Error('Error while confirming signup')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log(`[AuthService - confirmSignup]: ${error.message}`)
        throw new Error(error.message)
      }
      console.log(
        '[AuthService - confirmSignup]: An unexpected error has occurred'
      )
      throw new Error('An unexpected error has occurred')
    }
  }

  static async resetPassword(userId: string, data: ResetPasswordData) {
    try {
      const res: User | undefined = await db.query.users.findFirst({
        where: eq(users.id, userId)
      })

      if (!res) {
        throw new Error('Token is invalid or has expired')
      }

      const passwords = {
        currentPassword: res.password,
        password: data.password,
        newPassword: data.newPassword
      }

      const newPassword = await UserService.handlePasswordReset(passwords)

      const userRes = await UserService.updateUser(
        { ...res, password: newPassword },
        userId
      )

      if (!userRes) {
        throw new Error('Error while confirming signup')
      }
    } catch (error) {
      if (error instanceof Error || error instanceof DrizzleError) {
        console.log(`[AuthService - confirmSignup]: ${error.message}`)
        throw new Error(error.message)
      }
      console.log(
        '[AuthService - confirmSignup]: An unexpected error has occurred'
      )
      throw new Error('An unexpected error has occurred')
    }
  }
}
export default AuthService
