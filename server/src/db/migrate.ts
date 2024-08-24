import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { drizzle } from 'drizzle-orm/postgres-js'
import { url } from './drizzle'
import postgres from 'postgres'
import 'dotenv/config'

const migrationClient = postgres(url, { max: 1 })
migrate(drizzle(migrationClient), {
  migrationsFolder: './src/db/migrations'
}).then(() => migrationClient.end())
