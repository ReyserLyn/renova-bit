import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

dotenv.config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString, {
	prepare: false,
	ssl: {
		rejectUnauthorized: false,
	},
})

export const db = drizzle(client, {
	schema,
	logger: process.env.NODE_ENV !== 'production',
})
