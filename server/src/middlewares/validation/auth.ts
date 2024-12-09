import { validator } from 'hono/validator'
import { authSchema, emailSchema } from '../../validation/auth'

export const validateEmail = validator('json', (value, c) => {
  const parsed = emailSchema.safeParse(value)
  if (!parsed.success) {
    console.log(`[validateEmail] ${parsed.error}`)
    return c.text('Invalid!', 401)
  }
  return parsed.data
})

export const validateAuth = validator('json', (value, c) => {
  const parsed = authSchema.safeParse(value)
  if (!parsed.success) {
    console.log(`[validateAuth] ${parsed.error}`)
    return c.text('Invalid!', 401)
  }
  return parsed.data
})
