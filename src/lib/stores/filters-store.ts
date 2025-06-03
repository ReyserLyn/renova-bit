'use client'

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface ProductFilters {
	search: string
	categories: string[]
	brands: string[]
	priceRange: [number, number]
	rating: number | null
	hasOffer: boolean
}

interface FiltersState {
	filters: ProductFilters
	localPriceRange: [number, number]
	isUpdatingFromUrl: boolean
	priceRange: { min: number; max: number }
}

interface FiltersActions {
	setFilters: (filters: ProductFilters) => void
	setPriceRange: (priceRange: { min: number; max: number }) => void
	setLocalPriceRange: (range: [number, number]) => void
	setIsUpdatingFromUrl: (updating: boolean) => void

	updateFilter: <K extends keyof ProductFilters>(
		key: K,
		value: ProductFilters[K],
	) => void
	toggleCategory: (categorySlug: string) => void
	toggleBrand: (brandSlug: string) => void
	clearFilters: () => void

	commitPriceRange: () => void
}

export type FiltersStore = FiltersState & FiltersActions

const createInitialFilters = (priceRange: {
	min: number
	max: number
}): ProductFilters => ({
	search: '',
	categories: [],
	brands: [],
	priceRange: [priceRange.min, priceRange.max],
	rating: null,
	hasOffer: false,
})

export const useFiltersStore = create<FiltersStore>()(
	subscribeWithSelector(
		immer((set, get) => ({
			filters: createInitialFilters({ min: 0, max: 20000 }),
			localPriceRange: [0, 20000],
			isUpdatingFromUrl: false,
			priceRange: { min: 0, max: 20000 },

			setFilters: (filters) => {
				set((state) => {
					state.filters = { ...filters }
					state.localPriceRange = [filters.priceRange[0], filters.priceRange[1]]
				})
			},

			setPriceRange: (priceRange) => {
				set((state) => {
					state.priceRange = priceRange
				})
			},

			setLocalPriceRange: (range) => {
				set((state) => {
					state.localPriceRange = range
				})
			},

			setIsUpdatingFromUrl: (updating) => {
				set((state) => {
					state.isUpdatingFromUrl = updating
				})
			},

			updateFilter: (key, value) => {
				const state = get()
				if (state.isUpdatingFromUrl) return

				set((state) => {
					state.filters[key] = value as any
				})
			},

			toggleCategory: (categorySlug) => {
				const state = get()
				if (state.isUpdatingFromUrl) return

				set((state) => {
					const categories = state.filters.categories
					const index = categories.indexOf(categorySlug)
					if (index > -1) {
						categories.splice(index, 1)
					} else {
						categories.push(categorySlug)
					}
				})
			},

			toggleBrand: (brandSlug) => {
				const state = get()
				if (state.isUpdatingFromUrl) return

				set((state) => {
					const brands = state.filters.brands
					const index = brands.indexOf(brandSlug)
					if (index > -1) {
						brands.splice(index, 1)
					} else {
						brands.push(brandSlug)
					}
				})
			},

			clearFilters: () => {
				const state = get()
				if (state.isUpdatingFromUrl) return

				set((state) => {
					const newFilters = createInitialFilters(state.priceRange)
					state.filters = newFilters
					state.localPriceRange = [state.priceRange.min, state.priceRange.max]
				})
			},

			commitPriceRange: () => {
				const state = get()
				if (state.isUpdatingFromUrl) return

				set((state) => {
					state.filters.priceRange = [
						state.localPriceRange[0],
						state.localPriceRange[1],
					]
				})
			},
		})),
	),
)

let cachedFilters: ProductFilters | undefined
let cachedLocalPriceRange: [number, number] | undefined
let cachedPriceRange: { min: number; max: number } | undefined
let cachedIsUpdatingFromUrl: boolean | undefined
let cachedHasActiveFilters: boolean | undefined
let cachedActions: any | undefined

const filtersSelector = (state: FiltersStore) => {
	if (
		!cachedFilters ||
		JSON.stringify(cachedFilters) !== JSON.stringify(state.filters)
	) {
		cachedFilters = state.filters
	}
	return cachedFilters
}

const localPriceRangeSelector = (state: FiltersStore) => {
	if (
		!cachedLocalPriceRange ||
		cachedLocalPriceRange[0] !== state.localPriceRange[0] ||
		cachedLocalPriceRange[1] !== state.localPriceRange[1]
	) {
		cachedLocalPriceRange = state.localPriceRange
	}
	return cachedLocalPriceRange
}

const priceRangeSelector = (state: FiltersStore) => {
	if (
		!cachedPriceRange ||
		cachedPriceRange.min !== state.priceRange.min ||
		cachedPriceRange.max !== state.priceRange.max
	) {
		cachedPriceRange = state.priceRange
	}
	return cachedPriceRange
}

const isUpdatingFromUrlSelector = (state: FiltersStore) => {
	if (cachedIsUpdatingFromUrl !== state.isUpdatingFromUrl) {
		cachedIsUpdatingFromUrl = state.isUpdatingFromUrl
	}
	return cachedIsUpdatingFromUrl
}

const hasActiveFiltersSelector = (state: FiltersStore) => {
	const hasActive = Boolean(
		state.filters.search ||
			state.filters.categories.length > 0 ||
			state.filters.brands.length > 0 ||
			state.filters.priceRange[0] !== state.priceRange.min ||
			state.filters.priceRange[1] !== state.priceRange.max ||
			state.filters.rating !== null ||
			state.filters.hasOffer,
	)

	if (cachedHasActiveFilters !== hasActive) {
		cachedHasActiveFilters = hasActive
	}
	return cachedHasActiveFilters
}

const actionsSelector = (state: FiltersStore) => {
	if (!cachedActions) {
		cachedActions = {
			setFilters: state.setFilters,
			setPriceRange: state.setPriceRange,
			setLocalPriceRange: state.setLocalPriceRange,
			setIsUpdatingFromUrl: state.setIsUpdatingFromUrl,
			updateFilter: state.updateFilter,
			toggleCategory: state.toggleCategory,
			toggleBrand: state.toggleBrand,
			clearFilters: state.clearFilters,
			commitPriceRange: state.commitPriceRange,
		}
	}
	return cachedActions
}

export const useFilters = () => useFiltersStore(filtersSelector)
export const useLocalPriceRange = () => useFiltersStore(localPriceRangeSelector)
export const usePriceRange = () => useFiltersStore(priceRangeSelector)
export const useIsUpdatingFromUrl = () =>
	useFiltersStore(isUpdatingFromUrlSelector)
export const useHasActiveFilters = () =>
	useFiltersStore(hasActiveFiltersSelector)
export const useFiltersActions = () => useFiltersStore(actionsSelector)
