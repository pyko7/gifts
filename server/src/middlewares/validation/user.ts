import { partialUserSchema } from '../../validation/user'
import { Context, Next } from 'hono'
import { getContentType } from '../../utils/api/getContentType'

export const validateUser = async (c: Context, next: Next) => {
  const contentType = getContentType(c)

  let value
  if (contentType === 'JSON') {
    value = await c.req.json()
  } else if (contentType === 'FORMDATA') {
    const formData = await c.req.formData()
    value = Object.fromEntries(formData.entries())
  } else {
    return c.text('Unsupported Content-Type', 400)
  }

  const parsed = partialUserSchema.safeParse(value)
  if (!parsed.success) {
    console.error(`[validateUser] ${parsed.error}`)
    return c.text('Invalid!', 401)
  }

  // Attach validated data to the context for later use
  c.set('validatedUser', parsed.data)
  await next()
}
