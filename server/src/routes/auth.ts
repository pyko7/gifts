import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import { jwtMiddleware } from '../middlewares/jwtMiddleware'
import { Hono } from 'hono'
import 'dotenv/config'
import { isUserVerifiedMiddleware } from '../middlewares/isUserVerifiedMiddleware'
import { validateAuth, validateEmail } from '../middlewares/validation/auth'

export const auth = new Hono()
const userController = new UserController()
const authController = new AuthController()

auth.get('/confirm-signup', authController.confirmSignup)
auth.get('/validate', jwtMiddleware, authController.validateSession)
auth.post('/signup', validateAuth, userController.createUser)
auth.post(
  '/login',
  validateAuth,
  isUserVerifiedMiddleware,
  authController.login
)
auth.post(
  '/forgot-password',
  validateEmail,
  isUserVerifiedMiddleware,
  authController.handleResetPasswordRequest
)
auth.post(
  '/forgot-password/reset',
  validateEmail,
  authController.forgotPassword
)
auth.post('/logout', jwtMiddleware, authController.logout)
