import crypto from 'crypto'
import { sign } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'
import { v4 as uuidv4 } from 'uuid'

export const generateRandomUUID = () => crypto.randomUUID()

export const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const generateToken = () => uuidv4()

export const generateJwt = async (payload: JWTPayload) => {
  // eslint-disable-next-line no-undef
  const secret = process.env.JWT_SECRET ?? ''
  const token = await sign(payload, secret)
  return token
}
