'use client'

import { getCartItemsFromDB, replaceCartInDB } from '@/actions/cart'
import { useCartStore } from '@/lib/stores/cart-store'
import { useEffect, useRef } from 'react'
import { useUser } from './use-user'

export function useCartSync() {
	const { user, isSignedIn } = useUser()
	const { items, setItems, setLoading, setLastSyncedAt, clearCart } =
		useCartStore()
	const syncData = useRef({
		inProgress: false,
		hasInitialSync: false,
		lastUserId: null as string | null,
		hadItemsBeforeLogin: false,
		wasSignedIn: false,
	})

	useEffect(() => {
		// Detectar cierre de sesión
		if (syncData.current.wasSignedIn && !isSignedIn) {
			syncData.current.hasInitialSync = false
			syncData.current.lastUserId = null
			syncData.current.wasSignedIn = false
			return
		}

		// Si no hay usuario, actualizar estado pero mantener carrito
		if (!user) {
			syncData.current.hasInitialSync = false
			syncData.current.lastUserId = null
			syncData.current.hadItemsBeforeLogin = items.length > 0
			syncData.current.wasSignedIn = false
			return
		}

		// Detectar si es un usuario diferente o si acaba de iniciar sesión
		const isNewUser = syncData.current.lastUserId !== user.id
		const justLoggedIn = !syncData.current.lastUserId && user.id

		// Actualizar estado de sesión
		syncData.current.wasSignedIn = true

		if (syncData.current.inProgress) {
			return
		}

		// Determinar si necesita sincronización
		const shouldSync =
			isNewUser || justLoggedIn || !syncData.current.hasInitialSync

		if (!shouldSync) {
			return
		}

		const syncCart = async () => {
			syncData.current.inProgress = true
			setLoading(true)

			try {
				// Caso 1: Usuario acaba de iniciar sesión y tenía items locales
				// → Reemplazar BD con carrito local
				if (
					justLoggedIn &&
					syncData.current.hadItemsBeforeLogin &&
					items.length > 0
				) {
					const result = await replaceCartInDB(user.id, items)
					if (result.success) {
						setLastSyncedAt(new Date().toISOString())
					}
				}
				// Caso 2: Usuario inicia sesión con carrito local vacío
				// → Traer carrito de BD
				else if (justLoggedIn && items.length === 0) {
					const dbItems = await getCartItemsFromDB(user.id)
					if (dbItems.length > 0) {
						setItems(dbItems)
					}
					setLastSyncedAt(new Date().toISOString())
				}
				// Caso 3: Cambio de usuario (usuario diferente)
				// → Cargar carrito del nuevo usuario
				else if (isNewUser && !justLoggedIn) {
					const dbItems = await getCartItemsFromDB(user.id)
					setItems(dbItems)
					setLastSyncedAt(new Date().toISOString())
				}
				// Caso 4: Sincronización normal (primera vez con usuario existente)
				else if (!syncData.current.hasInitialSync) {
					const dbItems = await getCartItemsFromDB(user.id)

					// Solo reemplazar si hay diferencias significativas
					if (
						dbItems.length > 0 &&
						(items.length === 0 ||
							JSON.stringify(
								items.map((i) => ({ id: i.product.id, qty: i.quantity })),
							) !==
								JSON.stringify(
									dbItems.map((i) => ({ id: i.product.id, qty: i.quantity })),
								))
					) {
						setItems(dbItems)
					}
					setLastSyncedAt(new Date().toISOString())
				}

				// Actualizar estado de sincronización
				syncData.current.hasInitialSync = true
				syncData.current.lastUserId = user.id
				syncData.current.hadItemsBeforeLogin = false // Reset después de procesar
			} catch (error) {
				console.error('❌ Error en sincronización:', error)
			} finally {
				setLoading(false)
				syncData.current.inProgress = false
			}
		}

		syncCart()
	}, [
		user?.id,
		isSignedIn,
		setItems,
		setLoading,
		setLastSyncedAt,
		items.length,
		clearCart,
	])

	// Cleanup en desmontaje
	useEffect(() => {
		return () => {
			syncData.current = {
				inProgress: false,
				hasInitialSync: false,
				lastUserId: null,
				hadItemsBeforeLogin: false,
				wasSignedIn: false,
			}
		}
	}, [])
}
