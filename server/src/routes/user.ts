import UserController from '../controllers/UserController'
import { Hono } from 'hono'
import 'dotenv/config'

export const user = new Hono()
const userController = new UserController()

user.get('/:userId', userController.getUserById)
user.get('/friends/all', userController.getAllFriends)
user.get('/friends/:friendId', userController.getUserFriendById)
user.put('/update/:id', userController.updateUser)
user.delete('/delete', userController.deleteUser)
