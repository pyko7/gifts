import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import { isUserExists } from '../middlewares/isUserExists'
import { jwt } from 'hono/jwt'
import { Hono } from 'hono'
import 'dotenv/config'

export const auth = new Hono()
const userController = new UserController()
const authController = new AuthController()

auth.post('/signup', userController.createUser)
auth.post('/login', authController.login)
auth.post('/forgot-password', isUserExists, authController.forgotPassword)
auth.post(
  '/logout',
  jwt({
    // eslint-disable-next-line no-undef
    secret: process.env.JWT_SECRET ?? '',
    cookie: 'session'
  }),
  authController.logout
)
