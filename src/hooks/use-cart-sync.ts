'use client'

import { getCartItemsFromDB } from '@/actions/cart'
import { useUser } from '@/hooks/use-user'
import { useCartStore } from '@/lib/stores/cart-store'
import { useEffect, useRef } from 'react'

/**
 * Hook para sincronizar el carrito con la base de datos
 * Se sincroniza cuando el usuario inicia sesión
 */
export function useCartSync() {
	const { user, isLoaded } = useUser()
	const { setItems, setLoading } = useCartStore()
	const lastUserId = useRef<string | null>(null)

	useEffect(() => {
		// Solo proceder si el usuario está cargado
		if (!isLoaded) {
			return
		}

		// Si no hay usuario y no había usuario antes, no hacer nada
		if (!user && !lastUserId.current) {
			return
		}

		// Si el usuario cambió (de null a usuario o de un usuario a otro)
		const userChanged = lastUserId.current !== (user?.id || null)

		if (userChanged && user) {
			// Usuario acaba de iniciar sesión o cambió de usuario
			const loadCartFromDB = async () => {
				setLoading(true)
				try {
					const dbItems = await getCartItemsFromDB(user.id)
					if (dbItems.length > 0) {
						setItems(dbItems)
					} else {
						// Si no hay items en la DB, limpiar el carrito local
						setItems([])
					}
				} catch (error) {
					console.error('Error cargando carrito:', error)
				} finally {
					setLoading(false)
				}
			}

			loadCartFromDB()
		} else if (userChanged && !user) {
			// Usuario cerró sesión, limpiar carrito
			setItems([])
		}

		// Actualizar la referencia del último usuario
		lastUserId.current = user?.id || null
	}, [user?.id, isLoaded, setItems, setLoading])
}
