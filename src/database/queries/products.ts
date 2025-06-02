import { db } from '@/database'
import { products } from '@/database/schema'
import { and, eq, gte, like, lte } from 'drizzle-orm'

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
export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
	return await db.query.products.findMany({
		where: and(
			eq(products.category_id, categoryId),
			// Excluir el producto actual
		),
		with: {
			brand: true,
			category: true,
		},
		limit,
	})
} 