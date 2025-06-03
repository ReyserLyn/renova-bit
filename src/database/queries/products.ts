import { db } from '@/database'
import { brands, categories, offers, products } from '@/database/schema'
import type { ProductFilters } from '@/types'
import {
	and,
	desc,
	eq,
	gte,
	ilike,
	inArray,
	like,
	lte,
	ne,
	or,
	sql,
} from 'drizzle-orm'

/**
 * Obtener un producto por su ID
 */
export async function getProductById(productId: string) {
	return await db.query.products.findFirst({
		where: eq(products.id, productId),
		with: {
			brand: true,
			category: true,
		},
	})
}

/**
 * Obtener un producto por su slug
 */
export async function getProductBySlug(slug: string) {
	return await db.query.products.findFirst({
		where: eq(products.slug, slug),
		with: {
			brand: true,
			category: true,
		},
	})
}

/**
 * Obtener un producto completo con reviews para la página de producto
 */
export async function getProductPageData(slug: string) {
	return await db.query.products.findFirst({
		where: eq(products.slug, slug),
		with: {
			brand: true,
			category: true,
			reviews: {
				where: (reviews, { eq }) => eq(reviews.is_approved, true),
				orderBy: (reviews, { desc }) => [desc(reviews.created_at)],
				limit: 10, // Limitar a las 10 más recientes
			},
		},
	})
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(categoryId: string) {
	return await db.query.products.findMany({
		where: eq(products.category_id, categoryId),
		with: {
			brand: true,
			category: true,
		},
	})
}

/**
 * Obtener productos por marca
 */
export async function getProductsByBrand(brandId: string) {
	return await db.query.products.findMany({
		where: eq(products.brand_id, brandId),
		with: {
			brand: true,
			category: true,
		},
	})
}

/**
 * Buscar productos por nombre
 */
export async function searchProductsByName(searchTerm: string) {
	return await db.query.products.findMany({
		where: like(products.name, `%${searchTerm}%`),
		with: {
			brand: true,
			category: true,
		},
	})
}

/**
 * Obtener productos con filtros
 */
export async function getFilteredProducts(filters: ProductFilters) {
	const conditions = []
	const now = new Date()

	// Filtro de búsqueda
	if (filters.search) {
		conditions.push(
			or(
				ilike(products.name, `%${filters.search}%`),
				ilike(products.short_description, `%${filters.search}%`),
			),
		)
	}

	// Filtro de categorías
	if (filters.categories.length > 0) {
		const categoryIds = await db
			.select({ id: categories.id })
			.from(categories)
			.where(inArray(categories.slug, filters.categories))

		if (categoryIds.length > 0) {
			conditions.push(
				inArray(
					products.category_id,
					categoryIds.map((c) => c.id),
				),
			)
		}
	}

	// Filtro de marcas
	if (filters.brands.length > 0) {
		const brandIds = await db
			.select({ id: brands.id })
			.from(brands)
			.where(inArray(brands.slug, filters.brands))

		if (brandIds.length > 0) {
			conditions.push(
				inArray(
					products.brand_id,
					brandIds.map((b) => b.id),
				),
			)
		}
	}

	// Filtro de precio
	if (filters.priceRange[0] > 0 || filters.priceRange[1] < 999999) {
		conditions.push(
			and(
				gte(products.price_web, filters.priceRange[0].toString()),
				lte(products.price_web, filters.priceRange[1].toString()),
			),
		)
	}

	// Filtro de rating
	if (filters.rating) {
		conditions.push(gte(products.rating, filters.rating.toString()))
	}

	// Query principal
	const baseQuery = db
		.select({
			id: products.id,
			name: products.name,
			slug: products.slug,
			image_url: products.image_url,
			short_description: products.short_description,
			long_description: products.long_description,
			stock: products.stock,
			price_web: products.price_web,
			price: products.price,
			brand_id: products.brand_id,
			category_id: products.category_id,
			condition_id: products.condition_id,
			rating: products.rating,
			rating_count: products.rating_count,
			brand: {
				id: brands.id,
				name: brands.name,
				slug: brands.slug,
			},
			category: {
				id: categories.id,
				name: categories.name,
				slug: categories.slug,
			},
			offer: {
				id: offers.id,
				offer_price: offers.offer_price,
				discount_percent: offers.discount_percent,
				end_date: offers.end_date,
			},
		})
		.from(products)
		.leftJoin(brands, eq(products.brand_id, brands.id))
		.leftJoin(categories, eq(products.category_id, categories.id))
		.leftJoin(
			offers,
			and(
				eq(products.id, offers.product_id),
				eq(offers.is_active, true),
				lte(offers.start_date, now),
				gte(offers.end_date, now),
			),
		)

	// Aplicar condiciones y ejecutar
	const result =
		conditions.length > 0
			? await baseQuery
					.where(and(...conditions))
					.orderBy(desc(products.rating), desc(products.rating_count))
			: await baseQuery.orderBy(
					desc(products.rating),
					desc(products.rating_count),
				)

	// Filtro de ofertas (debe aplicarse después del join)
	if (filters.hasOffer) {
		return result.filter((product) => product.offer?.id != null)
	}

	return result
}

/**
 * Obtener productos relacionados (misma categoría, diferente producto)
 */
export async function getRelatedProducts(
	productId: string,
	categoryId: string,
	limit = 4,
) {
	return await db.query.products.findMany({
		where: and(
			eq(products.category_id, categoryId),
			ne(products.id, productId), // Excluir el producto actual
		),
		with: {
			brand: true,
			category: true,
		},
		limit,
	})
}

/**
 * Obtener todos los productos con límite y orden
 */
export async function getAllProducts(limit = 12) {
	return await db.query.products.findMany({
		where: gte(products.stock, 1), // Solo productos en stock
		with: {
			brand: true,
			category: true,
		},
		limit,
		orderBy: (products, { desc }) => [desc(products.id)],
	})
}

/**
 * Obtener productos destacados (mejor rating y más vendidos)
 */
export async function getFeaturedProducts(limit = 8) {
	return await db.query.products.findMany({
		where: gte(products.stock, 1), // Solo productos en stock
		with: {
			brand: true,
			category: true,
		},
		limit,
		orderBy: (products, { desc }) => [
			desc(products.rating),
			desc(products.rating_count),
		],
	})
}

/**
 * Obtener productos más recientes
 */
export async function getLatestProducts(limit = 8) {
	return await db.query.products.findMany({
		where: gte(products.stock, 1), // Solo productos en stock
		with: {
			brand: true,
			category: true,
		},
		limit,
		orderBy: (products, { desc }) => [desc(products.id)],
	})
}

/**
 * Obtener productos por rango de precio
 */
export async function getProductsByPriceRange(
	minPrice: number,
	maxPrice: number,
	limit = 12,
) {
	return await db.query.products.findMany({
		where: and(
			gte(products.price, minPrice.toString()),
			lte(products.price, maxPrice.toString()),
			gte(products.stock, 1),
		),
		with: {
			brand: true,
			category: true,
		},
		limit,
		orderBy: (products, { asc }) => [asc(products.price)],
	})
}

/**
 * Obtener estadísticas de la tienda
 */
export async function getStoreStats() {
	const totalProducts = await db.query.products.findMany()
	const inStockProducts = await db.query.products.findMany({
		where: gte(products.stock, 1),
	})

	return {
		totalProducts: totalProducts.length,
		inStockProducts: inStockProducts.length,
		categories: 8, // Aproximado basado en las categorías que vi
		brands: 15, // Aproximado basado en las marcas que vi
	}
}

// Obtener rangos de precio para filtros
export async function getPriceRange() {
	const result = await db
		.select({
			min: sql<number>`CAST(MIN(${products.price_web}) AS INTEGER)`,
			max: sql<number>`CAST(MAX(${products.price_web}) AS INTEGER)`,
		})
		.from(products)

	const dbResult = result[0] || { min: 0, max: 10000 }

	// Establecer máximo en 20,000 soles
	return {
		min: dbResult.min,
		max: Math.min(dbResult.max, 20000),
	}
}

// Obtener marcas disponibles para una categoría específica
export async function getBrandsByCategory(categorySlug?: string) {
	const baseQuery = db
		.select({
			id: brands.id,
			name: brands.name,
			slug: brands.slug,
			productCount: sql<number>`count(${products.id})`,
		})
		.from(brands)
		.leftJoin(products, eq(brands.id, products.brand_id))

	if (categorySlug) {
		const result = await baseQuery
			.leftJoin(categories, eq(products.category_id, categories.id))
			.where(eq(categories.slug, categorySlug))
			.groupBy(brands.id, brands.name, brands.slug)
			.having(sql`count(${products.id}) > 0`)
			.orderBy(desc(sql`count(${products.id})`), brands.name)
		return result
	}

	const result = await baseQuery
		.groupBy(brands.id, brands.name, brands.slug)
		.having(sql`count(${products.id}) > 0`)
		.orderBy(desc(sql`count(${products.id})`), brands.name)

	return result
}

// Obtener categorías con conteo de productos (optimizada)
export async function getCategoriesWithCount() {
	try {
		// Usar una consulta más eficiente sin LEFT JOIN
		const result = await db
			.select({
				id: categories.id,
				name: categories.name,
				slug: categories.slug,
				productCount: sql<number>`(
					SELECT count(*) 
					FROM ${products} 
					WHERE ${products.category_id} = ${categories.id}
				)`,
			})
			.from(categories)
			.where(sql`(
				SELECT count(*) 
				FROM ${products} 
				WHERE ${products.category_id} = ${categories.id}
			) > 0`)
			.orderBy(
				sql`(
				SELECT count(*) 
				FROM ${products} 
				WHERE ${products.category_id} = ${categories.id}
			) DESC`,
				categories.name,
			)

		return result
	} catch (error) {
		console.error('Error getting categories with count:', error)
		// Fallback: obtener solo categorías sin conteo si hay error
		return await db
			.select({
				id: categories.id,
				name: categories.name,
				slug: categories.slug,
				productCount: sql<number>`0`, // Fallback sin conteo
			})
			.from(categories)
			.orderBy(categories.name)
	}
}

// Buscar productos por término
export async function searchProducts(searchTerm: string, limit = 20) {
	return await db
		.select({
			id: products.id,
			name: products.name,
			slug: products.slug,
			image_url: products.image_url,
			short_description: products.short_description,
			price_web: products.price_web,
			price: products.price,
			rating: products.rating,
			rating_count: products.rating_count,
			brand: {
				id: brands.id,
				name: brands.name,
				slug: brands.slug,
			},
			category: {
				id: categories.id,
				name: categories.name,
				slug: categories.slug,
			},
		})
		.from(products)
		.leftJoin(brands, eq(products.brand_id, brands.id))
		.leftJoin(categories, eq(products.category_id, categories.id))
		.where(
			or(
				ilike(products.name, `%${searchTerm}%`),
				ilike(products.short_description, `%${searchTerm}%`),
				ilike(brands.name, `%${searchTerm}%`),
			),
		)
		.orderBy(desc(products.rating), desc(products.rating_count))
		.limit(limit)
}

/**
 * Función optimizada para obtener todos los datos necesarios para la página de búsqueda
 * Evita múltiples conexiones simultáneas
 */
export async function getSearchPageData(filters: ProductFilters) {
	try {
		// Ejecutar las consultas más importantes primero
		const products = await getFilteredProducts(filters)

		// Luego ejecutar las consultas de metadatos en paralelo (máximo 3 conexiones)
		const [priceRange, brands, categories] = await Promise.all([
			getPriceRange(),
			getBrandsByCategory(),
			getCategoriesWithCount(),
		])

		return {
			products,
			priceRange,
			brands,
			categories,
		}
	} catch (error) {
		console.error('Error getting search page data:', error)
		// Fallback: ejecutar consultas secuencialmente si hay error
		const products = await getFilteredProducts(filters)
		const priceRange = await getPriceRange()
		const brands = await getBrandsByCategory()
		const categories = await getCategoriesWithCount()

		return {
			products,
			priceRange,
			brands,
			categories,
		}
	}
}

/**
 * Función optimizada para obtener todos los datos necesarios para las páginas de categorías
 * Evita múltiples conexiones simultáneas
 */
export async function getCategoryPageData(
	categorySlug: string,
	filters: ProductFilters,
) {
	try {
		// Ejecutar las consultas más importantes primero
		const products = await getFilteredProducts(filters)

		// Luego ejecutar las consultas de metadatos en paralelo (máximo 3 conexiones)
		const [priceRange, brands, categories] = await Promise.all([
			getPriceRange(),
			getBrandsByCategory(categorySlug), // Solo marcas disponibles en esta categoría
			getCategoriesWithCount(),
		])

		return {
			products,
			priceRange,
			brands,
			categories,
		}
	} catch (error) {
		console.error('Error getting category page data:', error)
		// Fallback: ejecutar consultas secuencialmente si hay error
		const products = await getFilteredProducts(filters)
		const priceRange = await getPriceRange()
		const brands = await getBrandsByCategory(categorySlug)
		const categories = await getCategoriesWithCount()

		return {
			products,
			priceRange,
			brands,
			categories,
		}
	}
}
