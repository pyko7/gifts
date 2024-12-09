import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/
    )
})

export const emailSchema = z.object({
  email: z.string().email('Invalid email format')
})
