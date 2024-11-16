import UserService from '../services/UserService'
import { getUserId } from '../utils/user/_utils'
import { DrizzleError } from 'drizzle-orm'
import { deleteCookie } from 'hono/cookie'
import { Context } from 'hono'
import MediaService from '../services/mediaService/MediaService'
import { UserFormData } from '../types/user'
import { getContentType } from '../utils/api/getContentType'

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

      let user
      const contentType = getContentType(c)
      const userId = getUserId(c)

      if (contentType === 'JSON') {
        const currentUser = await UserService.getUserById(userId ?? '')

        user = await c.req.json()

        if (user.imageUrl === null && currentUser?.imageUrl) {
          const mediaService = new MediaService(currentUser.imageUrl)
          const hasToDelete = mediaService.checkHasToDelete()
          if (!hasToDelete) return
          mediaService.deleteFile('profilePictures')
        }
      } else if (contentType === 'FORMDATA') {
        const body = await c.req.parseBody<UserFormData>({ dot: true })
        let image = undefined

        if (body['file']) {
          const currentUser = await UserService.getUserById(userId ?? '')
          if (currentUser?.imageUrl) {
            const mediaService = new MediaService(currentUser.imageUrl)
            const hasToDelete = mediaService.checkHasToDelete()
            if (!hasToDelete) return
            mediaService.deleteFile('profilePictures')
          }

          image = await MediaService.uploadAndGetFile(
            body['file'],
            'profilePictures'
          )
        }

        user = {
          userId: body['userId'],
          name: body['name'],
          imageUrl: image?.url ?? null,
          storedImageName: image?.name
        }
      }

      if (param !== userId) {
        return c.text('Invalid userId', 401)
      }

      if (user.newEmail) {
        const currentUser = await UserService.getUserById(userId ?? '')
        const currentEmail = currentUser.email
        const emails = {
          currentEmail,
          email: user.email,
          newEmail: user.newEmail
        }
        const validNewEmail = UserService.handleEmailUpdate(emails)

        user = { ...user, email: validNewEmail }
      }

      if (user.password && user.newPassword) {
        const currentUser = await UserService.getUserSensitiveData(userId ?? '')
        const currentPassword = currentUser.password
        const passwords = {
          currentPassword,
          password: user.password,
          newPassword: user.newPassword
        }

        const validNewPassword =
          await UserService.handlePasswordReset(passwords)
        const hashedNewPassword =
          await UserService.hashPassword(validNewPassword)
        user = { ...user, password: hashedNewPassword }
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
