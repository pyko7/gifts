import { friends } from '../db/schemas/friend'

export type Invitation = typeof friends.$inferSelect
export type NewInvitation = typeof friends.$inferInsert
export type FriendshipStatusEnum =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'blocked'
  | null
