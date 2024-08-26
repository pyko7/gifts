import UserController from '../controllers/UserController'
import { Hono } from 'hono'
import 'dotenv/config'

export const user = new Hono()
const userController = new UserController()

user.put('/update/:id', userController.updateUser)
user.put('/delete', userController.deleteUser)
