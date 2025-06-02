import { relations, sql } from 'drizzle-orm'
import {
	boolean,
	check,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'

export const productCondition = pgEnum('product_condition', ['N', 'U', 'R'])

export const categories = pgTable(
	'categories',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', { length: 100 }).notNull(),
		slug: varchar('slug', { length: 100 }).notNull(),
	},
	(table) => [
		uniqueIndex('categories_slug_idx').on(table.slug),
		uniqueIndex('categories_name_idx').on(table.name),
	],
).enableRLS()

export const brands = pgTable(
	'brands',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', { length: 100 }).notNull(),
		slug: varchar('slug', { length: 100 }).notNull(),
	},
	(table) => [
		uniqueIndex('brands_slug_idx').on(table.slug),
		uniqueIndex('brands_name_idx').on(table.name),
	],
).enableRLS()

export const conditions = pgTable(
	'conditions',
	{
		id: productCondition('id').primaryKey(),
		name: varchar('name', { length: 50 }).notNull(),
	},
	(table) => [
		uniqueIndex('conditions_id_idx').on(table.id),
		uniqueIndex('conditions_name_idx').on(table.name),
	],
).enableRLS()

export const products = pgTable(
	'products',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', { length: 100 }).notNull(),
		slug: varchar('slug', { length: 100 }).notNull(),
		image_url: text('image_url').notNull(),
		short_description: text('short_description').notNull(),
		long_description: text('long_description').default(''),
		stock: integer('stock').notNull().default(0),
		price: numeric('price', { precision: 10, scale: 2 }).notNull(),
		brand_id: uuid('brand_id')
			.notNull()
			.references(() => brands.id),
		category_id: uuid('category_id')
			.notNull()
			.references(() => categories.id),
		condition_id: productCondition('condition_id')
			.notNull()
			.references(() => conditions.id),
	},
	(table) => [
		uniqueIndex('products_slug_idx').on(table.slug),
		check('price_check', sql`${table.price} > 0`),
	],
).enableRLS()

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}))

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products),
}))

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.category_id],
		references: [categories.id],
	}),
	brand: one(brands, {
		fields: [products.brand_id],
		references: [brands.id],
	}),
}))

export const cartItems = pgTable(
	'cart_items',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		user_id: text('user_id').notNull(),
		product_id: uuid('product_id')
			.notNull()
			.references(() => products.id, { onDelete: 'cascade' }),
		quantity: integer('quantity').notNull().default(1),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('cart_items_user_product_idx').on(
			table.user_id,
			table.product_id,
		),
		check('quantity_positive', sql`${table.quantity} > 0`),
	],
).enableRLS()

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
	product: one(products, {
		fields: [cartItems.product_id],
		references: [products.id],
	}),
}))

export const coupons = pgTable(
	'coupons',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		code_hash: text('code_hash').notNull().unique(),
		discount_percent: integer('discount_percent').notNull(),
		is_active: boolean('is_active').default(true).notNull(),
		valid_until: timestamp('valid_until', { withTimezone: true }),
		min_purchase: numeric('min_purchase', { precision: 10, scale: 2 }),
		max_discount: numeric('max_discount', { precision: 10, scale: 2 }),
		usage_limit: integer('usage_limit'),
		usage_count: integer('usage_count').default(0).notNull(),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('coupons_code_hash_idx').on(table.code_hash),
		check(
			'discount_percent_check',
			sql`${table.discount_percent} > 0 AND ${table.discount_percent} <= 100`,
		),
		check(
			'usage_check',
			sql`${table.usage_count} <= ${table.usage_limit} OR ${table.usage_limit} IS NULL`,
		),
	],
).enableRLS()

export const couponUsages = pgTable(
	'coupon_usages',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		coupon_id: uuid('coupon_id')
			.notNull()
			.references(() => coupons.id, { onDelete: 'cascade' }),
		user_id: text('user_id').notNull(),
		order_id: uuid('order_id'), // Referencia futura a orders
		used_at: timestamp('used_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('coupon_user_idx').on(table.coupon_id, table.user_id), // Un cupón por usuario
	],
).enableRLS()
