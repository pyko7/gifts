import UserController from '../controllers/UserController'
import { Hono } from 'hono'

export const auth = new Hono()
const userController = new UserController()

auth.post('/signup', userController.createUser)
