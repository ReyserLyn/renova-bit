'use client'

import type {
	BrandWithCount,
	CategoryWithCount,
	ProductFilters,
	TransformedProduct,
} from '@/types'

interface UseDynamicCountsOptions {
	categories: CategoryWithCount[]
	brands: BrandWithCount[]
	products?: TransformedProduct[]
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

		if (filters.hasOffer && !product.offer) {
			return false
		}

		return true
	})

	const categoriesWithDynamicCounts = categories.map((category) => {
		const count = filteredProducts.filter(
			(product) => product.category?.slug === category.slug,
		).length

		return {
			...category,
			productCount: count,
		}
	})

	const brandsWithDynamicCounts = brands.map((brand) => {
		const count = filteredProducts.filter(
			(product) => product.brand?.slug === brand.slug,
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
