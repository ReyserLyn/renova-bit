import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

export default {
	out: './src/database/drizzle',
	schema: './src/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	strict: true,
	verbose: true,
	introspect: {
		casing: 'preserve',
	},
	casing: 'snake_case',
} satisfies Config
