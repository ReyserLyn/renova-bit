import { relations, sql } from 'drizzle-orm'
import {
	check,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
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
