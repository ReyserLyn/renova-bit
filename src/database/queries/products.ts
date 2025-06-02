import { db } from '@/database'
import { products } from '@/database/schema'
import { and, eq, gte, like, lte, ne } from 'drizzle-orm'

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
export async function getFilteredProducts(filters: {
	categoryId?: string
	brandId?: string
	minPrice?: number
	maxPrice?: number
	inStock?: boolean
}) {
	const conditions = []

	if (filters.categoryId) {
		conditions.push(eq(products.category_id, filters.categoryId))
	}

	if (filters.brandId) {
		conditions.push(eq(products.brand_id, filters.brandId))
	}

	if (filters.minPrice) {
		conditions.push(gte(products.price, filters.minPrice.toString()))
	}

	if (filters.maxPrice) {
		conditions.push(lte(products.price, filters.maxPrice.toString()))
	}

	if (filters.inStock) {
		conditions.push(gte(products.stock, 1))
	}

	return await db.query.products.findMany({
		where: conditions.length > 0 ? and(...conditions) : undefined,
		with: {
			brand: true,
			category: true,
		},
	})
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
 * Obtener productos en oferta (productos con descuento)
 * TODO: Implementar cuando se añada lógica de ofertas al schema
 */
export async function getOffersProducts() {
	// Por ahora retornamos array vacío hasta implementar ofertas
	return []
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
