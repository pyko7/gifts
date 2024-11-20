import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import { isUserExists } from '../middlewares/isUserExists'
import { jwtMiddleware } from '../middlewares/jwtMiddleware'
import { Hono } from 'hono'
import 'dotenv/config'
import { confirmedMiddleware } from '../middlewares/confirmedMiddleware'

export const auth = new Hono()
const userController = new UserController()
const authController = new AuthController()

auth.get('/confirm-signup', authController.confirmSignup)
auth.get('/validate', jwtMiddleware, authController.validateSession)
auth.post('/signup', userController.createUser)
auth.post('/login', confirmedMiddleware, authController.login)
auth.post('/forgot-password', isUserExists, authController.forgotPassword)
auth.post('/logout', jwtMiddleware, authController.logout)
