import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export const generateRandomUUID = () => crypto.randomUUID()

export const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const generateToken = () => uuidv4()
