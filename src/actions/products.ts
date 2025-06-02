'use server'

import { db } from '@/database'
import { brands, categories, products } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface CreateProductData {
	name: string
	imageUrl: string
	shortDescription: string
	longDescription?: string
	stock?: number
	priceWeb: number
	price: number
	brandName: string
	categoryName: string
	conditionId: 'N' | 'U' | 'R' // N=Nuevo, U=Usado, R=Reacondicionado
}

function createSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[áàäâã]/g, 'a')
		.replace(/[éèëê]/g, 'e')
		.replace(/[íìïî]/g, 'i')
		.replace(/[óòöôõ]/g, 'o')
		.replace(/[úùüû]/g, 'u')
		.replace(/[ñ]/g, 'n')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}

async function findOrCreateBrand(brandName: string) {
	const slug = createSlug(brandName)

	// Buscar marca existente
	const existingBrand = await db
		.select()
		.from(brands)
		.where(eq(brands.slug, slug))
		.limit(1)

	if (existingBrand.length > 0) {
		return existingBrand[0]
	}

	// Crear nueva marca
	const newBrand = await db
		.insert(brands)
		.values({
			name: brandName,
			slug,
		})
		.returning()

	return newBrand[0]
}

async function findOrCreateCategory(categoryName: string) {
	const slug = createSlug(categoryName)

	// Buscar categoría existente
	const existingCategory = await db
		.select()
		.from(categories)
		.where(eq(categories.slug, slug))
		.limit(1)

	if (existingCategory.length > 0) {
		return existingCategory[0]
	}

	// Crear nueva categoría
	const newCategory = await db
		.insert(categories)
		.values({
			name: categoryName,
			slug,
		})
		.returning()

	return newCategory[0]
}

export async function createProduct(data: CreateProductData) {
	try {
		// Validaciones
		if (!data.name?.trim()) {
			return { success: false, error: 'El nombre del producto es obligatorio' }
		}

		if (!data.imageUrl?.trim()) {
			return { success: false, error: 'La URL de la imagen es obligatoria' }
		}

		if (!data.shortDescription?.trim()) {
			return { success: false, error: 'La descripción corta es obligatoria' }
		}

		if (data.priceWeb < 0 || data.price < 0) {
			return { success: false, error: 'Los precios no pueden ser negativos' }
		}

		if (data.priceWeb > data.price) {
			return {
				success: false,
				error: 'El precio web no puede ser mayor al precio regular',
			}
		}

		if (!data.brandName?.trim()) {
			return { success: false, error: 'La marca es obligatoria' }
		}

		if (!data.categoryName?.trim()) {
			return { success: false, error: 'La categoría es obligatoria' }
		}

		if (!['N', 'U', 'R'].includes(data.conditionId)) {
			return {
				success: false,
				error:
					'La condición debe ser N (Nuevo), U (Usado) o R (Reacondicionado)',
			}
		}

		// Crear slug único para el producto
		const baseSlug = createSlug(data.name)
		let slug = baseSlug
		let counter = 1

		// Verificar que el slug sea único
		while (true) {
			const existingProduct = await db
				.select()
				.from(products)
				.where(eq(products.slug, slug))
				.limit(1)

			if (existingProduct.length === 0) {
				break
			}

			slug = `${baseSlug}-${counter}`
			counter++
		}

		// Obtener o crear marca y categoría
		const brand = await findOrCreateBrand(data.brandName)
		const category = await findOrCreateCategory(data.categoryName)

		// Crear el producto
		const newProduct = await db
			.insert(products)
			.values({
				name: data.name.trim(),
				slug,
				image_url: data.imageUrl.trim(),
				short_description: data.shortDescription.trim(),
				long_description: data.longDescription?.trim() || '',
				stock: data.stock || 0,
				price_web: data.priceWeb.toString(),
				price: data.price.toString(),
				brand_id: brand.id,
				category_id: category.id,
				condition_id: data.conditionId,
				rating: '0.00',
				rating_count: 0,
			})
			.returning()

		return {
			success: true,
			product: newProduct[0],
			message: `Producto "${data.name}" creado exitosamente`,
		}
	} catch (error) {
		console.error('Error creating product:', error)
		return {
			success: false,
			error: 'Error interno del servidor al crear el producto',
		}
	}
}
