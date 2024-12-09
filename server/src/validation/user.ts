import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string({
      invalid_type_error: 'Password must be a string'
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/
    ),
  userId: z.string({
    invalid_type_error: 'userId must be a string'
  }),
  name: z.string({
    invalid_type_error: 'name must be a string'
  }),
  verified: z.boolean(),
  imageUrl: z.string({
    invalid_type_error: 'imageUrl must be a string'
  })
})

export const partialUserSchema = userSchema.partial()
