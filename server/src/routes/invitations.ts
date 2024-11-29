import { friendshipMiddleware } from '../middlewares/friendshipMiddleware'
import InvitationController from '../controllers/InvitationController'
import { selfMiddleware } from '../middlewares/selfMiddleware'
import { Hono } from 'hono'
import 'dotenv/config'

export const invitation = new Hono()
const invitationController = new InvitationController()

invitation.post(
  '/send/:friendId',
  friendshipMiddleware,
  invitationController.sendInvitation
)
invitation.post(
  '/blocked/:userId/:friendId',
  selfMiddleware,
  invitationController.blockUser
)
invitation.put(
  '/answer/:userId/:friendId',
  selfMiddleware,
  invitationController.answerInvitation
)
