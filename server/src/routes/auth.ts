import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import { jwt } from 'hono/jwt'
import { Hono } from 'hono'
import 'dotenv/config'

export const auth = new Hono()
const userController = new UserController()
const authController = new AuthController()

auth.post('/signup', userController.createUser)
auth.post('/login', authController.login)
auth.post(
  '/logout',
  jwt({
    // eslint-disable-next-line no-undef
    secret: process.env.JWT_SECRET ?? '',
    cookie: {
      key: 'session',
      // eslint-disable-next-line no-undef
      secret: process.env.COOKIE_SECRET ?? ''
    }
  }),
  authController.logout
)
