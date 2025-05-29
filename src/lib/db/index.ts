import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL!
const client = postgres(connectionString, {
  ssl: 'require', // Fuerza SSL :cite[7]
  prepare: false, // Necesario para Supabase :cite[8]
})
export const db = drizzle(client)
