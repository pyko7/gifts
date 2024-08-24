import { defineConfig } from 'drizzle-kit'

// eslint-disable-next-line no-undef
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: DB_HOST ?? '',
    user: DB_USER ?? '',
    password: DB_PASSWORD ?? '',
    database: DB_USER ?? ''
  }
})
