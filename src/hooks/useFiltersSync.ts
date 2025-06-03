'use client'

import {
	useFilters,
	useFiltersActions,
	useHasActiveFilters,
	useIsUpdatingFromUrl,
	useLocalPriceRange
} from '@/lib/stores/filters-store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface UseFiltersSyncOptions {
	priceRange: { min: number; max: number }
}

export function useFiltersSync({ priceRange }: UseFiltersSyncOptions) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const initialized = useRef(false)
	const lastUrlRef = useRef('')
	const lastSearchTerm = useRef('')
	const userIsTyping = useRef(false)

	const filters = useFilters()
	const localPriceRange = useLocalPriceRange()
	const hasActiveFilters = useHasActiveFilters()
	const actions = useFiltersActions()
	const isUpdatingFromUrl = useIsUpdatingFromUrl()

	useEffect(() => {
		if (initialized.current) return

		const initialFilters = {
			search: searchParams.get('buscar') || '',
			categories:
				searchParams.get('categorias')?.split(',').filter(Boolean) || [],
			brands: searchParams.get('marcas')?.split(',').filter(Boolean) || [],
			priceRange: [
				Number(searchParams.get('precio_min')) || priceRange.min,
				Math.min(
					Number(searchParams.get('precio_max')) || priceRange.max,
					20000,
				),
			] as [number, number],
			rating: searchParams.get('rating')
				? Number(searchParams.get('rating'))
				: null,
			hasOffer: searchParams.get('ofertas') === 'true',
		}

		actions.setPriceRange(priceRange)
		actions.setFilters(initialFilters)
		lastSearchTerm.current = initialFilters.search
		initialized.current = true
	}, [])

	useEffect(() => {
		if (!initialized.current) return
		
		const currentSearchTerm = searchParams.get('buscar') || ''
		const currentCategories = searchParams.get('categorias')?.split(',').filter(Boolean) || []
		
		if (currentSearchTerm !== lastSearchTerm.current && !userIsTyping.current) {
			console.log('Sincronizando búsqueda desde URL (header):', currentSearchTerm, 'Categorías:', currentCategories) // Debug temporal
			actions.setIsUpdatingFromUrl(true)
			
			const cleanFilters = {
				search: currentSearchTerm,
				categories: currentCategories,
				brands: [],
				priceRange: [priceRange.min, priceRange.max] as [number, number],
				rating: null,
				hasOffer: false,
			}
			
			actions.setFilters(cleanFilters)
			actions.setLocalPriceRange([priceRange.min, priceRange.max])
			actions.setIsUpdatingFromUrl(false)
			lastSearchTerm.current = currentSearchTerm
		}
	}, [searchParams, actions, priceRange])

	const buildUrl = useCallback(
		(currentFilters: any, currentPriceRange: any) => {
			const params = new URLSearchParams()

			if (currentFilters.search) params.set('buscar', currentFilters.search)
			if (currentFilters.categories.length > 0) {
				params.set('categorias', currentFilters.categories.join(','))
			}
			if (currentFilters.brands.length > 0) {
				params.set('marcas', currentFilters.brands.join(','))
			}
			if (currentFilters.priceRange[0] !== currentPriceRange.min) {
				params.set('precio_min', currentFilters.priceRange[0].toString())
			}
			if (currentFilters.priceRange[1] !== currentPriceRange.max) {
				params.set('precio_max', currentFilters.priceRange[1].toString())
			}
			if (currentFilters.rating) {
				params.set('rating', currentFilters.rating.toString())
			}
			if (currentFilters.hasOffer) {
				params.set('ofertas', 'true')
			}

			return params.toString() ? `${pathname}?${params.toString()}` : pathname
		},
		[pathname],
	)

	const debouncedNavigate = useDebouncedCallback(
		useCallback(
			(currentFilters: any, currentPriceRange: any) => {
				if (!initialized.current) return

				const newUrl = buildUrl(currentFilters, currentPriceRange)

				if (newUrl !== lastUrlRef.current) {
					lastUrlRef.current = newUrl
					lastSearchTerm.current = currentFilters.search
					router.replace(newUrl, { scroll: false })
				}
			},
			[buildUrl, router],
		),
		100,
		{ leading: false, trailing: true },
	)

	useEffect(() => {
		if (!initialized.current) return
		
		if (isUpdatingFromUrl) return
		
		debouncedNavigate(filters, priceRange)
	}, [filters, priceRange, debouncedNavigate, actions, isUpdatingFromUrl])

	const stableUpdateFilter = useCallback(
		(key: any, value: any) => {
			if (key === 'search') {
				console.log('Búsqueda desde panel:', value)
				userIsTyping.current = true
				lastSearchTerm.current = value
				setTimeout(() => {
					userIsTyping.current = false
				}, 500)
			}
			actions.updateFilter(key, value)
		},
		[actions],
	)

	const stableToggleCategory = useCallback(
		(slug: string) => {
			actions.toggleCategory(slug)
		},
		[actions],
	)

	const stableToggleBrand = useCallback(
		(slug: string) => {
			actions.toggleBrand(slug)
		},
		[actions],
	)

	const stableClearFilters = useCallback(() => {
		actions.clearFilters()
	}, [actions])

	const stableSetLocalPriceRange = useCallback(
		(range: [number, number]) => {
			actions.setLocalPriceRange(range)
		},
		[actions],
	)

	const stableCommitPriceRange = useCallback(() => {
		actions.commitPriceRange()
	}, [actions])

	return {
		filters,
		localPriceRange,
		hasActiveFilters,
		updateFilter: stableUpdateFilter,
		toggleCategory: stableToggleCategory,
		toggleBrand: stableToggleBrand,
		clearFilters: stableClearFilters,
		setLocalPriceRange: stableSetLocalPriceRange,
		commitPriceRange: stableCommitPriceRange,
	}
}
