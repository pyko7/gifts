import { z } from 'zod'

export const giftSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  price: z.string({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a string'
  }),
  wishRate: z.string({
    required_error: 'wishRate is required',
    invalid_type_error: 'wishRate must be a string'
  }),
  descsription: z.string({
    invalid_type_error: 'Description must be a string'
  }),
  verified: z.boolean(),
  file: z.instanceof(File),
  url: z.string({
    invalid_type_error: 'url must be a string'
  }),
  imageUrl: z.string({
    invalid_type_error: 'imageUrl must be a string'
  }),
  reservedById: z.string({
    invalid_type_error: 'reservedBy must be a string'
  }),
  state: z.enum(['available', 'unavailable'], {
    invalid_type_error: 'reservedBy must be a available or unavailable'
  })
})

export const partialUserSchema = giftSchema
