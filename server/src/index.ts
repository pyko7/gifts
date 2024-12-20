import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { auth, user, gift, invitation } from './routes/index'
import 'dotenv/config'
import { jwtMiddleware } from './middlewares/jwtMiddleware'
import { isUserVerifiedMiddleware } from './middlewares/isUserVerifiedMiddleware'
import { notification } from './routes/notification'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.route('/auth', auth)

app.use('/*', jwtMiddleware, isUserVerifiedMiddleware)

app.route('/user', user)
app.route('/gift', gift)
app.route('/invitation', invitation)
app.route('/notification', notification)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
