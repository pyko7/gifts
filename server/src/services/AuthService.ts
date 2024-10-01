import { DrizzleError, eq } from 'drizzle-orm'
import { users } from '../db/schemas/user'
import { User } from '../utils/types'
import { db } from '../db/drizzle'
import bcrypt from 'bcrypt'
import EmailService from './EmailService'
import { EmailServiceType, EmailUser } from './emailService/_types'

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
  static async forgotPassword(userEmail: string) {
    const emailSender: EmailUser = {
      name: 'Gifts team',
      // eslint-disable-next-line no-undef
      email: process.env.CONTACT_EMAIL ?? ''
    }
    const emailTo = [
      {
        name: 'User',
        email: userEmail
      }
    ]
    const email: EmailServiceType = {
      emailSender,
      emailSubject: 'Mot de passe oublié',
      emailTo,
      emailTemplate: '<p>Oubli de mdp</p>'
    }
    const emailService = new EmailService(email)
    await emailService.sendMail()
  }
}
export default AuthService
