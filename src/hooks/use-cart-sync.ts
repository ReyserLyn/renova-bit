'use client'

import { getCartItemsFromDB, syncCartWithDB } from '@/actions/cart'
import { useCartStore } from '@/lib/stores/cart-store'
import { useEffect, useRef } from 'react'
import { useUser } from './use-user'

export function useCartSync() {
	const { user } = useUser()
	const { items, setItems, setLoading, setLastSyncedAt } = useCartStore()
	const syncData = useRef({
		inProgress: false,
		lastSync: 0,
		timeoutId: null as NodeJS.Timeout | null,
	})

	useEffect(() => {
		if (!user || syncData.current.inProgress) {
			return
		}
		const syncCart = async () => {
			syncData.current.inProgress = true
			setLoading(true)

			try {
				if (items.length > 0) {
					const { success, items: dbItems } = await syncCartWithDB(
						user.id,
						items,
					)
					if (success && dbItems) {
						if (JSON.stringify(items) !== JSON.stringify(dbItems)) {
							setItems(dbItems)
						}
					}
				} else {
					const dbItems = await getCartItemsFromDB(user.id)
					if (dbItems.length > 0) setItems(dbItems)
				}

				setLastSyncedAt(new Date().toISOString())
				syncData.current.lastSync = Date.now()
			} catch (error) {
				console.error('Sync error:', error)
			} finally {
				setLoading(false)
				syncData.current.inProgress = false
			}
		}

		if (!user || syncData.current.inProgress) return

		const now = Date.now()
		if (now - syncData.current.lastSync < 3000) {
			syncData.current.timeoutId = setTimeout(
				() => syncCart(), // Ahora syncCart está definida
				3000 - (now - syncData.current.lastSync),
			)
			return
		}

		syncCart()

		return () => {
			if (syncData.current.timeoutId) {
				clearTimeout(syncData.current.timeoutId)
			}
		}
	}, [user?.id, items, setItems, setLoading, setLastSyncedAt])
}
