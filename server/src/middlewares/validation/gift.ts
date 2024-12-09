import { validator } from 'hono/validator'
import { giftSchema } from '../../validation/gift'

export const validateGift = validator('json', (value, c) => {
  const parsed = giftSchema.safeParse(value)
  if (!parsed.success) {
    console.log(`[validateGift] ${parsed.error}`)
    return c.text('Invalid!', 401)
  }
  return parsed.data
})

export const validateGiftUpdate = validator('json', (value, c) => {
  const parsed = giftSchema.partial().safeParse(value)
  if (!parsed.success) {
    console.log(`[validateGift] ${parsed.error}`)
    return c.text('Invalid!', 401)
  }
  return parsed.data
})
