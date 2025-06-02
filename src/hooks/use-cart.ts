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
import { toast } from 'sonner'

/**
 * Hook principal para manejar el carrito
 * Combina el store local con sincronización a Supabase
 */
export function useCart() {
	const { user } = useUser()
	const {
		items,
		isLoading,
		isSyncing,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		getItemCount,
		getSubtotal,
		getTotalItems,
		setSyncing,
		getDiscountAmount,
		getFinalTotal,
	} = useCartStore()

	// Mutación para añadir item (con sincronización optimista)
	const addItemMutation = useMutation({
		mutationFn: async ({
			product,
			quantity = 1,
		}: {
			product: CartItem['product']
			quantity?: number
		}) => {
			// Primero actualizar el store local
			addItem(product, quantity)

			// Si hay usuario, sincronizar con DB
			if (user) {
				setSyncing(true)
				const result = await saveCartItemToDB(user.id, product.id, quantity)
				setSyncing(false)
				return result
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

	// Mutación para eliminar item
	const removeItemMutation = useMutation({
		mutationFn: async (productId: string) => {
			// Primero actualizar el store local
			removeItem(productId)

			// Si hay usuario, sincronizar con DB
			if (user) {
				setSyncing(true)
				const result = await removeCartItemFromDB(user.id, productId)
				setSyncing(false)
				return result
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

	// Mutación para actualizar cantidad
	const updateQuantityMutation = useMutation({
		mutationFn: async ({
			productId,
			quantity,
		}: {
			productId: string
			quantity: number
		}) => {
			// Primero actualizar el store local
			updateQuantity(productId, quantity)

			// Si hay usuario, sincronizar con DB
			if (user) {
				setSyncing(true)
				const result = await saveCartItemToDB(user.id, productId, quantity)
				setSyncing(false)
				return result
			}
			return { success: true }
		},
		onError: (error) => {
			console.error('Error al actualizar cantidad:', error)
			toast.error('Error al actualizar la cantidad')
		},
	})

	// Mutación para limpiar carrito
	const clearCartMutation = useMutation({
		mutationFn: async () => {
			// Primero limpiar el store local
			clearCart()

			// Si hay usuario, sincronizar con DB
			if (user) {
				setSyncing(true)
				const result = await clearCartInDB(user.id)
				setSyncing(false)
				return result
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

	// Función helper para verificar si un producto está en el carrito
	const isInCart = (productId: string) => {
		return items.some((item) => item.product.id === productId)
	}

	// Función helper para obtener la cantidad de un producto en el carrito
	const getQuantity = (productId: string) => {
		const item = items.find((item) => item.product.id === productId)
		return item?.quantity || 0
	}

	return {
		// Estado
		items,
		isLoading,
		isSyncing,
		itemCount: getItemCount(),
		subtotal: getSubtotal(),
		totalItems: getTotalItems(),
		validatedCoupon: useCartStore.getState().validatedCoupon,
		discountAmount: getDiscountAmount(),
		finalTotal: getFinalTotal(),
		selectedShipping: useCartStore.getState().selectedShipping,

		// Acciones con mutaciones
		addItem: addItemMutation.mutate,
		removeItem: removeItemMutation.mutate,
		updateQuantity: updateQuantityMutation.mutate,
		clearCart: clearCartMutation.mutate,

		// Acciones de envío
		setSelectedShipping: useCartStore.getState().setSelectedShipping,

		// Estados de las mutaciones
		isAddingItem: addItemMutation.isPending,
		isRemovingItem: removeItemMutation.isPending,
		isUpdatingQuantity: updateQuantityMutation.isPending,
		isClearingCart: clearCartMutation.isPending,

		// Helpers
		isInCart,
		getQuantity,
	}
}
