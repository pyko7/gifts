import { serve } from '@hono/node-server'
import { auth } from './routes/auth'
import { user } from './routes/user'
import { jwt } from 'hono/jwt'
import { Hono } from 'hono'
import 'dotenv/config'

const app = new Hono()

app.route('/auth', auth)
app.use(
  '/*',
  jwt({
    /* eslint-disable no-undef */
    secret: process.env.JWT_SECRET ?? '',
    cookie: 'session'
  })
)
app.route('/user', user)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
