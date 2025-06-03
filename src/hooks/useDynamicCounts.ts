'use client'

import type { ProductFilters } from '@/lib/stores/filters-store'

interface Category {
	id: string
	name: string
	slug: string
	productCount: number
}

interface Brand {
	id: string
	name: string
	slug: string
	productCount: number
}

interface Product {
	id: string
	name: string
	category: string
	brand: string
	price: number
	rating: number
	hasOffer: boolean
}

interface UseDynamicCountsOptions {
	categories: Category[]
	brands: Brand[]
	products?: Product[]
	filters: ProductFilters
}

export function useDynamicCounts({
	categories,
	brands,
	products = [],
	filters,
}: UseDynamicCountsOptions) {
	const filteredProducts = products.filter((product) => {
		if (
			filters.search &&
			!product.name.toLowerCase().includes(filters.search.toLowerCase())
		) {
			return false
		}

		if (
			filters.priceRange &&
			(product.price < filters.priceRange[0] ||
				product.price > filters.priceRange[1])
		) {
			return false
		}

		if (filters.rating && product.rating < filters.rating) {
			return false
		}

		if (filters.hasOffer && !product.hasOffer) {
			return false
		}

		return true
	})

	const categoriesWithDynamicCounts = categories.map((category) => {
		const count = filteredProducts.filter(
			(product) => product.category === category.slug,
		).length

		return {
			...category,
			productCount: count,
		}
	})

	const brandsWithDynamicCounts = brands.map((brand) => {
		const count = filteredProducts.filter(
			(product) => product.brand === brand.slug,
		).length

		return {
			...brand,
			productCount: count,
		}
	})

	return {
		categories: categoriesWithDynamicCounts,
		brands: brandsWithDynamicCounts,
	}
}
