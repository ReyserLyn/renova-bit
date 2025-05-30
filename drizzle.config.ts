import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

export default {
	schema: './src/lib/db/schema.ts',
	out: './drizzle/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
} satisfies Config
