'use client'

import {
	clearCartInDB,
	removeCartItemFromDB,
	saveCartItemToDB,
} from '@/actions/cart'
import { useUser } from '@/hooks/use-user'
import type { CartItem } from '@/lib/stores/cart-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { toast } from 'react-hot-toast'

export function useCart() {
	const { user } = useUser()
	const {
		items,
		isLoading,
		isSyncing,
		validatedCoupon,
		selectedShipping,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		getItemCount,
		getSubtotal,
		getTotalItems,
		getDiscountAmount,
		getShippingCost,
		getTotal,
		getShippingOptions,
		getSelectedShippingOption,
		setSelectedShipping,
		setValidatedCoupon,
		removeCoupon,
		setSyncing,
	} = useCartStore()

	// Sistema de debouncing para sincronización
	const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const pendingSyncsRef = useRef<Map<string, () => Promise<any>>>(new Map())

	const debouncedSync = useCallback(
		(key: string, syncFn: () => Promise<any>) => {
			if (!user) return

			// Agregar la función de sincronización pendiente
			pendingSyncsRef.current.set(key, syncFn)

			// Limpiar timeout anterior
			if (syncTimeoutRef.current) {
				clearTimeout(syncTimeoutRef.current)
			}

			// Crear nuevo timeout para ejecutar todas las sincronizaciones pendientes
			syncTimeoutRef.current = setTimeout(async () => {
				if (pendingSyncsRef.current.size === 0) return

				setSyncing(true)
				try {
					// Ejecutar todas las sincronizaciones pendientes
					const syncPromises = Array.from(pendingSyncsRef.current.values()).map(
						(fn) => fn(),
					)
					await Promise.all(syncPromises)
				} catch (error) {
					console.error('Error en sincronización:', error)
				} finally {
					setSyncing(false)
					pendingSyncsRef.current.clear()
				}
			}, 1000) // Esperar 1 segundo antes de sincronizar
		},
		[user, setSyncing],
	)

	const addItemMutation = useMutation({
		mutationFn: async ({
			product,
			quantity = 1,
		}: {
			product: CartItem['product']
			quantity?: number
		}) => {
			// Actualizar el estado local inmediatamente
			addItem(product, quantity)

			// Programar sincronización con debounce
			if (user) {
				debouncedSync(`add-${product.id}`, () =>
					saveCartItemToDB(user.id, product.id, quantity),
				)
			}

			return { success: true }
		},
		onSuccess: () => {
			toast.success('Producto añadido al carrito')
		},
		onError: (error) => {
			console.error('Error al añadir al carrito:', error)
			toast.error('Error al añadir el producto')
		},
	})

	const removeItemMutation = useMutation({
		mutationFn: async (productId: string) => {
			// Actualizar el estado local inmediatamente
			removeItem(productId)

			// Programar sincronización con debounce
			if (user) {
				debouncedSync(`remove-${productId}`, () =>
					removeCartItemFromDB(user.id, productId),
				)
			}

			return { success: true }
		},
		onSuccess: () => {
			toast.success('Producto eliminado del carrito')
		},
		onError: (error) => {
			console.error('Error al eliminar del carrito:', error)
			toast.error('Error al eliminar el producto')
		},
	})

	const updateQuantityMutation = useMutation({
		mutationFn: async ({
			productId,
			quantity,
		}: {
			productId: string
			quantity: number
		}) => {
			// Actualizar el estado local inmediatamente
			updateQuantity(productId, quantity)

			// Programar sincronización con debounce
			if (user) {
				debouncedSync(`update-${productId}`, () =>
					saveCartItemToDB(user.id, productId, quantity),
				)
			}

			return { success: true }
		},
		onError: (error) => {
			console.error('Error al actualizar cantidad:', error)
			toast.error('Error al actualizar la cantidad')
		},
	})

	const clearCartMutation = useMutation({
		mutationFn: async () => {
			// Actualizar el estado local inmediatamente
			clearCart()

			// Sincronización inmediata para limpiar carrito (es una acción final)
			if (user) {
				setSyncing(true)
				try {
					const result = await clearCartInDB(user.id)
					return result
				} finally {
					setSyncing(false)
				}
			}
			return { success: true }
		},
		onSuccess: () => {
			toast.success('Carrito vaciado')
		},
		onError: (error) => {
			console.error('Error al limpiar carrito:', error)
			toast.error('Error al vaciar el carrito')
		},
	})

	const isInCart = (productId: string) => {
		return items.some((item) => item.product.id === productId)
	}

	const getQuantity = (productId: string) => {
		const item = items.find((item) => item.product.id === productId)
		return item?.quantity || 0
	}

	return {
		// Estado del carrito
		items,
		isLoading,
		isSyncing,
		validatedCoupon,
		selectedShipping,

		// Contadores
		itemCount: getItemCount(),
		totalItems: getTotalItems(),

		// Cálculos financieros
		subtotal: getSubtotal(),
		discountAmount: getDiscountAmount(),
		shippingCost: getShippingCost(),
		total: getTotal(),

		// Opciones de envío
		shippingOptions: getShippingOptions(),
		selectedShippingOption: getSelectedShippingOption(),

		// Acciones del carrito
		addItem: addItemMutation.mutate,
		removeItem: removeItemMutation.mutate,
		updateQuantity: updateQuantityMutation.mutate,
		clearCart: clearCartMutation.mutate,

		// Acciones de cupones
		setValidatedCoupon,
		removeCoupon,

		// Acciones de envío
		setSelectedShipping,

		// Estados de las mutaciones (solo los que se usan)
		isAddingItem: addItemMutation.isPending,
		isClearingCart: clearCartMutation.isPending,

		// Helpers
		isInCart,
		getQuantity,
	}
}
