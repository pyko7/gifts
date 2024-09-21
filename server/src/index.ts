import { serve } from '@hono/node-server'
import { jwt } from 'hono/jwt'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { auth, user, gift, invitation } from './routes/index'
import 'dotenv/config'

const app = new Hono()
app.use('/*', cors())
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
app.route('/gift', gift)
app.route('/invitation', invitation)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
