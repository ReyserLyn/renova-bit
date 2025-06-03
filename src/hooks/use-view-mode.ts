'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type ViewMode = 'grid' | 'list'

export function useViewMode() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const getInitialViewMode = useCallback((): ViewMode => {
		const urlViewMode = searchParams.get('vista') as ViewMode
		if (urlViewMode === 'grid' || urlViewMode === 'list') {
			return urlViewMode
		}

		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('renova-bit-view-mode') as ViewMode
			if (stored === 'grid' || stored === 'list') {
				return stored
			}
		}

		return 'grid'
	}, [searchParams])

	const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode)

	useEffect(() => {
		const urlViewMode = searchParams.get('vista') as ViewMode
		if (urlViewMode && (urlViewMode === 'grid' || urlViewMode === 'list')) {
			setViewModeState(urlViewMode)
			localStorage.setItem('renova-bit-view-mode', urlViewMode)
		}
	}, [searchParams])

	const setViewMode = useCallback(
		(mode: ViewMode) => {
			setViewModeState(mode)

			if (typeof window !== 'undefined') {
				localStorage.setItem('renova-bit-view-mode', mode)
			}

			const currentParams = new URLSearchParams(searchParams.toString())
			currentParams.set('vista', mode)

			const newUrl = `${pathname}?${currentParams.toString()}`
			router.push(newUrl, { scroll: false })
		},
		[router, pathname, searchParams],
	)

	return {
		viewMode,
		setViewMode,
	}
}
