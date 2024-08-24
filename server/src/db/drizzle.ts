import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import 'dotenv/config'

// eslint-disable-next-line no-undef
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env
export const url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_USER}`
const queryClient = postgres(url)
export const db = drizzle(queryClient)
