'use client'

import { useEffect, useState } from 'react'
import { useFiltersSync } from './useFiltersSync'

interface UseSSRSafeFiltersProps {
	categories: Array<{
		id: string
		name: string
		slug: string
		productCount: number
	}>
	brands: Array<{
		id: string
		name: string
		slug: string
		productCount: number
	}>
	priceRange: { min: number; max: number }
	products?: Array<{
		id: string
		name: string
		category: { slug: string } | null
		brand: { slug: string } | null
		price: number
		rating?: number
		offer?: { offer_price: number } | null
	}>
}

export function useSSRSafeFilters({
	categories,
	brands,
	priceRange,
	products = [],
}: UseSSRSafeFiltersProps) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const filtersHook = useFiltersSync({ priceRange })

	const fallbackState = {
		filters: {
			search: '',
			categories: [],
			brands: [],
			priceRange: [priceRange.min, priceRange.max] as [number, number],
			rating: null,
			hasOffer: false,
		},
		localPriceRange: [priceRange.min, priceRange.max] as [number, number],
		hasActiveFilters: false,
		updateFilter: () => {},
		toggleCategory: () => {},
		toggleBrand: () => {},
		clearFilters: () => {},
		setLocalPriceRange: () => {},
		commitPriceRange: () => {},
	}

	if (!mounted) {
		return {
			...fallbackState,
			categories,
			brands,
			priceRange,
			products,
		}
	}

	return {
		...filtersHook,
		categories,
		brands,
		priceRange,
		products,
	}
}
