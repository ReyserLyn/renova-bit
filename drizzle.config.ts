import dotenv from 'dotenv'
// drizzle.config.ts
import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' }) // Carga variables de entorno

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql', // Requerido en 2025 :cite[4]
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Usa 'url' en lugar de 'connectionString' :cite[7]
  },
} satisfies Config
