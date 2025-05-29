import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// Tabla de productos (ejemplo base)
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal('discount_price', { precision: 10, scale: 2 }),
  stock: integer('stock').default(0),
  images: jsonb('images').$type<string[]>(), // Array de URLs (almacenadas en Cloudflare R2)
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
}).enableRLS()

// Tabla de órdenes (para el flujo de WhatsApp)
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientPhone: text('client_phone').notNull(),
  products: jsonb('products')
    .$type<
      Array<{
        id: string
        quantity: number
        price: number
      }>
    >()
    .notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  deliveryDate: timestamp('delivery_date').notNull(),
  status: text('status')
    .$type<'pending' | 'confirmed' | 'cancelled'>()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
}).enableRLS()

// Ejemplo de relación producto-orden (many-to-many)
export const orderItems = pgTable('order_items', {
  orderId: uuid('order_id').references(() => orders.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
}).enableRLS()
