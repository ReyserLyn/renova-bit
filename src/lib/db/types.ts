import type { orders, products } from './schema'

// Tipos TypeScript automáticos
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Order = typeof orders.$inferSelect
