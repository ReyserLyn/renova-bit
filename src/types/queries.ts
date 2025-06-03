import type {
	getBrandsByCategory,
	getCategoriesWithCount,
} from '@/database/queries/products'

// Tipo para marcas con conteo de productos
export type BrandWithProductCount = Awaited<
	ReturnType<typeof getBrandsByCategory>
>[0]

// Tipo para categorías con conteo de productos
export type CategoryWithCount = Awaited<
	ReturnType<typeof getCategoriesWithCount>
>[0]
