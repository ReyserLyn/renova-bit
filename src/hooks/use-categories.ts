'use client'

import { useEffect, useState } from 'react'

export function useCategories() {
	const [categories, setCategories] = useState<
		Array<{ id: string; name: string; slug: string }>
	>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await fetch('/api/categories')
				if (response.ok) {
					const fetchedCategories = await response.json()
					setCategories(fetchedCategories)
				} else {
					console.error('Error fetching categories:', response.statusText)
					setCategories([])
				}
			} catch (error) {
				console.error('Error fetching categories:', error)
				setCategories([])
			} finally {
				setLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return { categories, loading }
}
