import crypto from 'crypto'

export const generateRandomUUID = () => crypto.randomUUID()

export const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
