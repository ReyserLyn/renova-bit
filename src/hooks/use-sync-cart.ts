'use client'

import { getCartItemsFromDB, syncCartWithDB } from '@/actions/cart'
import { useCartStore } from '@/lib/stores/cart-store'
import { useEffect, useRef } from 'react'

/**
 * Hook para sincronizar el carrito con la base de datos
 * Se usa cuando el usuario inicia sesión o al cargar la aplicación
 */
export function useSyncCart(userId: string | null) {
	const { items, setItems, setLoading, setLastSyncedAt } = useCartStore()
	const syncInProgress = useRef(false)
	const lastSyncTime = useRef<number>(0)

	useEffect(() => {
		// Si no hay userId o ya hay una sincronización en progreso, no hacer nada
		if (!userId || syncInProgress.current) {
			return
		}

		// Evitar sincronizaciones muy frecuentes (mínimo 5 segundos entre sincronizaciones)
		const now = Date.now()
		if (now - lastSyncTime.current < 5000) {
			return
		}

		const syncCart = async () => {
			syncInProgress.current = true
			setLoading(true)

			try {
				// Si hay items locales, sincronizar con la DB
				if (items.length > 0) {
					const result = await syncCartWithDB(userId, items)
					if (result.success && result.items) {
						// Solo actualizar si hay cambios reales
						const currentItems = JSON.stringify(items)
						const newItems = JSON.stringify(result.items)
						if (currentItems !== newItems) {
							setItems(result.items)
						}
					}
				} else {
					// Si no hay items locales, cargar desde la DB
					const dbItems = await getCartItemsFromDB(userId)
					if (dbItems.length > 0) {
						setItems(dbItems)
					}
				}

				setLastSyncedAt(new Date().toISOString())
				lastSyncTime.current = now
			} catch (error) {
				console.error('Error sincronizando carrito:', error)
			} finally {
				setLoading(false)
				syncInProgress.current = false
			}
		}

		syncCart()
	}, [userId]) // Solo dependencia de userId
}
