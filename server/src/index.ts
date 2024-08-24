import { serve } from '@hono/node-server'
import { auth } from './routes/auth'
import { Hono } from 'hono'
import 'dotenv/config'

const app = new Hono()

app.route('/auth', auth)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
