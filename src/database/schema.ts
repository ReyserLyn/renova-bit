import { relations, sql } from 'drizzle-orm'
import {
	boolean,
	check,
	integer,
	jsonb,
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
export const quotationStatus = pgEnum('quotation_status', [
	'draft',
	'completed',
	'requested',
	'confirmed',
	'cancelled',
])
export const componentType = pgEnum('component_type', [
	'cpu',
	'motherboard',
	'ram1',
	'ram2',
	'storage1',
	'storage2',
	'case',
	'psu',
	'cooling',
	'mouse',
	'keyboard',
	'audio',
	'monitor',
])

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
		name: varchar('name', { length: 255 }).notNull(),
		slug: varchar('slug', { length: 255 }).notNull(),
		image_url: text('image_url').notNull(),
		short_description: text('short_description').notNull(),
		long_description: text('long_description').default(''),
		stock: integer('stock').notNull().default(0),
		price_web: numeric('price_web', { precision: 10, scale: 2 })
			.notNull()
			.default('0.00'),
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
		rating: numeric('rating', { precision: 3, scale: 2 }).default('0.00'),
		rating_count: integer('rating_count').default(0).notNull(),
	},
	(table) => [
		uniqueIndex('products_slug_idx').on(table.slug),
		check('price_web_check', sql`${table.price_web} >= 0`),
		check('price_check', sql`${table.price} >= 0`),
		check('rating_check', sql`${table.rating} >= 0 AND ${table.rating} <= 5`),
		check('price_comparison_check', sql`${table.price_web} <= ${table.price}`),
	],
).enableRLS()

export const reviews = pgTable(
	'reviews',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		product_id: uuid('product_id')
			.notNull()
			.references(() => products.id, { onDelete: 'cascade' }),
		user_id: text('user_id').notNull(),
		user_name: varchar('user_name', { length: 100 }).notNull(),
		user_email: text('user_email').notNull(),
		user_image_url: text('user_image_url'),
		rating: integer('rating').notNull(),
		title: varchar('title', { length: 200 }).notNull(),
		comment: text('comment').notNull(),
		is_verified_purchase: boolean('is_verified_purchase').default(false),
		is_approved: boolean('is_approved').default(true),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('review_user_product_idx').on(table.user_id, table.product_id),
		check('rating_check', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
	],
).enableRLS()

export const wishlists = pgTable(
	'wishlists',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		user_id: text('user_id').notNull(),
		product_id: uuid('product_id')
			.notNull()
			.references(() => products.id, { onDelete: 'cascade' }),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('wishlist_user_product_idx').on(
			table.user_id,
			table.product_id,
		),
	],
).enableRLS()

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}))

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [products.category_id],
		references: [categories.id],
	}),
	brand: one(brands, {
		fields: [products.brand_id],
		references: [brands.id],
	}),
	reviews: many(reviews),
	wishlists: many(wishlists),
	offer: one(offers, {
		fields: [products.id],
		references: [offers.product_id],
	}),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
	product: one(products, {
		fields: [reviews.product_id],
		references: [products.id],
	}),
}))

export const wishlistsRelations = relations(wishlists, ({ one }) => ({
	product: one(products, {
		fields: [wishlists.product_id],
		references: [products.id],
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

export const offers = pgTable(
	'offers',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		product_id: uuid('product_id')
			.notNull()
			.references(() => products.id, { onDelete: 'cascade' }),
		offer_price: numeric('offer_price', { precision: 10, scale: 2 }).notNull(),
		discount_percent: integer('discount_percent').notNull(),
		start_date: timestamp('start_date', { withTimezone: true })
			.defaultNow()
			.notNull(),
		end_date: timestamp('end_date', { withTimezone: true }).notNull(),
		is_active: boolean('is_active').default(true).notNull(),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('offers_product_idx').on(table.product_id),
		check('offer_price_check', sql`${table.offer_price} >= 0`),
		check(
			'discount_percent_check',
			sql`${table.discount_percent} > 0 AND ${table.discount_percent} <= 100`,
		),
		check('date_check', sql`${table.end_date} > ${table.start_date}`),
	],
).enableRLS()

export const offersRelations = relations(offers, ({ one }) => ({
	product: one(products, {
		fields: [offers.product_id],
		references: [products.id],
	}),
}))

// Tabla principal de proformas/cotizaciones
export const quotations = pgTable(
	'quotations',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		user_id: text('user_id').notNull(),
		user_email: text('user_email'),
		user_name: varchar('user_name', { length: 100 }),
		user_phone: varchar('user_phone', { length: 20 }),
		title: varchar('title', { length: 200 }).default('Mi PC personalizada'),
		notes: text('notes'),
		status: quotationStatus('status').default('draft').notNull(),
		total_price: numeric('total_price', { precision: 12, scale: 2 })
			.default('0.00')
			.notNull(),
		total_web_price: numeric('total_web_price', { precision: 12, scale: 2 })
			.default('0.00')
			.notNull(),
		savings: numeric('savings', { precision: 12, scale: 2 })
			.default('0.00')
			.notNull(),
		configuration_data: jsonb('configuration_data'), // Para guardar configuración completa como backup
		is_compatible: boolean('is_compatible').default(true),
		compatibility_notes: text('compatibility_notes'),
		expires_at: timestamp('expires_at', { withTimezone: true }),
		requested_at: timestamp('requested_at', { withTimezone: true }),
		confirmed_at: timestamp('confirmed_at', { withTimezone: true }),
		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		check('total_price_check', sql`${table.total_price} >= 0`),
		check('total_web_price_check', sql`${table.total_web_price} >= 0`),
		check('savings_check', sql`${table.savings} >= 0`),
	],
).enableRLS()

// Tabla de items/componentes de cada proforma
export const quotationItems = pgTable(
	'quotation_items',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		quotation_id: uuid('quotation_id')
			.notNull()
			.references(() => quotations.id, { onDelete: 'cascade' }),
		product_id: uuid('product_id').references(() => products.id, {
			onDelete: 'set null',
		}), // Nullable en caso de que se elimine el producto
		component_type: componentType('component_type').notNull(),
		component_order: integer('component_order').notNull(), // Para ordenar los pasos
		quantity: integer('quantity').default(1).notNull(),
		unit_price: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
		unit_web_price: numeric('unit_web_price', {
			precision: 10,
			scale: 2,
		}).notNull(),
		total_price: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
		total_web_price: numeric('total_web_price', {
			precision: 10,
			scale: 2,
		}).notNull(),
		is_optional: boolean('is_optional').default(false), // Si el componente es opcional
		is_skipped: boolean('is_skipped').default(false), // Si el usuario decidió omitirlo

		// Información del producto al momento de agregar (backup)
		product_name: varchar('product_name', { length: 255 }),
		product_image_url: text('product_image_url'),
		product_brand: varchar('product_brand', { length: 100 }),
		product_category: varchar('product_category', { length: 100 }),

		created_at: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex('quotation_component_idx').on(
			table.quotation_id,
			table.component_type,
		),
		check('quantity_positive', sql`${table.quantity} > 0`),
		check('unit_price_check', sql`${table.unit_price} >= 0`),
		check('unit_web_price_check', sql`${table.unit_web_price} >= 0`),
		check('total_price_check', sql`${table.total_price} >= 0`),
		check('total_web_price_check', sql`${table.total_web_price} >= 0`),
		check(
			'order_check',
			sql`${table.component_order} >= 1 AND ${table.component_order} <= 13`,
		),
	],
).enableRLS()

// Relaciones para las proformas
export const quotationsRelations = relations(quotations, ({ many }) => ({
	items: many(quotationItems),
}))

export const quotationItemsRelations = relations(quotationItems, ({ one }) => ({
	quotation: one(quotations, {
		fields: [quotationItems.quotation_id],
		references: [quotations.id],
	}),
	product: one(products, {
		fields: [quotationItems.product_id],
		references: [products.id],
	}),
}))
