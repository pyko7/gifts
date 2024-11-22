import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import { jwtMiddleware } from '../middlewares/jwtMiddleware'
import { Hono } from 'hono'
import 'dotenv/config'
import { isUserVerifiedMiddleware } from '../middlewares/isUserVerifiedMiddleware'

export const auth = new Hono()
const userController = new UserController()
const authController = new AuthController()

auth.get('/confirm-signup', authController.confirmSignup)
auth.get('/validate', jwtMiddleware, authController.validateSession)
auth.post('/signup', userController.createUser)
auth.post('/login', isUserVerifiedMiddleware, authController.login)
auth.post(
  '/forgot-password',
  isUserVerifiedMiddleware,
  authController.handleResetPasswordRequest
)
auth.post('/forgot-password/reset', authController.forgotPassword)
auth.post('/logout', jwtMiddleware, authController.logout)
