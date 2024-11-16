import { Context } from 'hono'
import { HandleContentTypeRes } from './_types'

export const getContentType = (c: Context): HandleContentTypeRes => {
  const headers = c.req.header()
  const contentType = headers['content-type']
  const applicationJson = contentType.includes('application/json')
  const formData =
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')

  if (applicationJson) return 'JSON'
  else if (formData) return 'FORMDATA'
  else throw new Error('Unsupported Content-Type')
}
