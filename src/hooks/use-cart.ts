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

	const addItemMutation = useMutation({
		mutationFn: async ({
			product,
			quantity = 1,
		}: {
			product: CartItem['product']
			quantity?: number
		}) => {
			addItem(product, quantity)

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

	const removeItemMutation = useMutation({
		mutationFn: async (productId: string) => {
			removeItem(productId)

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

	const updateQuantityMutation = useMutation({
		mutationFn: async ({
			productId,
			quantity,
		}: {
			productId: string
			quantity: number
		}) => {
			updateQuantity(productId, quantity)

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

	const clearCartMutation = useMutation({
		mutationFn: async () => {
			clearCart()

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
