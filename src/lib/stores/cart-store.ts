'use client'

import type { products } from '@/database/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { type ShippingOption, getShippingOptions } from '../shipping'

// tipo para un item del carrito
export type CartItem = {
	product: InferSelectModel<typeof products> & {
		brand: { id: string; name: string; slug: string }
	}
	quantity: number
}

// tipo para un cupón validado
export type ValidatedCoupon = {
	id: string
	code: string
	discount_percent: number
	discount_amount: number
}

// estado del store del carrito
interface CartState {
	items: CartItem[]
	isLoading: boolean
	isSyncing: boolean
	lastSyncedAt: string | null
	validatedCoupon: ValidatedCoupon | null
	selectedShipping: string
	shippingOptions: ShippingOption[]
}

// acciones del store del carrito
interface CartActions {
	addItem: (product: CartItem['product'], quantity?: number) => void
	removeItem: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void

	// Getters básicos
	getItemCount: () => number
	getTotalItems: () => number

	// Cálculos financieros
	getSubtotal: () => number
	getDiscountAmount: () => number
	getShippingCost: () => number
	getTotal: () => number

	// Opciones de envío
	getShippingOptions: () => ShippingOption[]
	getSelectedShippingOption: () => ShippingOption | undefined

	// Manejo de cupones
	setValidatedCoupon: (coupon: ValidatedCoupon) => void
	removeCoupon: () => void

	// Envío
	setSelectedShipping: (shippingId: string) => void

	// Sincronización
	setLoading: (loading: boolean) => void
	setSyncing: (syncing: boolean) => void
	setItems: (items: CartItem[]) => void
	setLastSyncedAt: (date: string | null) => void
}

export type CartStore = CartState & CartActions

/**
 * Store global del carrito con persistencia en localStorage
 */
export const useCartStore = create<CartStore>()(
	persist(
		immer((set, get) => ({
			// Estado inicial
			items: [],
			isLoading: false,
			isSyncing: false,
			lastSyncedAt: null,
			validatedCoupon: null,
			selectedShipping: 'express',
			shippingOptions: getShippingOptions(),

			// Añadir item al carrito
			addItem: (product, quantity = 1) => {
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.product.id === product.id,
					)

					if (existingItem) {
						existingItem.quantity += quantity
					} else {
						state.items.push({ product, quantity })
					}
				})
			},

			// Eliminar item del carrito
			removeItem: (productId) => {
				set((state) => {
					state.items = state.items.filter(
						(item) => item.product.id !== productId,
					)
				})
			},

			// Actualizar cantidad de un item
			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(productId)
					return
				}

				set((state) => {
					const item = state.items.find((item) => item.product.id === productId)
					if (item) {
						item.quantity = quantity
					}
				})
			},

			// Limpiar carrito
			clearCart: () => {
				set((state) => {
					state.items = []
					state.validatedCoupon = null
				})
			},

			// Obtener número de items únicos
			getItemCount: () => {
				return get().items.length
			},

			// Obtener total de items (sumando cantidades)
			getTotalItems: () => {
				return get().items.reduce((total, item) => {
					return total + item.quantity
				}, 0)
			},

			// Obtener subtotal del carrito (sin descuentos ni envío)
			getSubtotal: () => {
				return get().items.reduce((total, item) => {
					return total + Number.parseFloat(item.product.price) * item.quantity
				}, 0)
			},

			// Obtener monto del descuento
			getDiscountAmount: () => {
				const state = get()
				return state.validatedCoupon?.discount_amount || 0
			},

			// Obtener costo de envío
			getShippingCost: () => {
				const state = get()
				const selectedOption = state.getSelectedShippingOption()
				return selectedOption?.price || 0
			},

			// Obtener total final (subtotal - descuento + envío)
			getTotal: () => {
				const state = get()
				const subtotal = state.getSubtotal()
				const discount = state.getDiscountAmount()
				const shipping = state.getShippingCost()
				return subtotal - discount + shipping
			},

			// Obtener opciones de envío
			getShippingOptions: () => {
				return get().shippingOptions
			},

			// Obtener opción de envío seleccionada
			getSelectedShippingOption: () => {
				const state = get()
				return state.shippingOptions.find(
					(opt) => opt.id === state.selectedShipping,
				)
			},

			// Establecer cupón validado
			setValidatedCoupon: (coupon) => {
				set((state) => {
					state.validatedCoupon = coupon
				})
			},

			// Remover cupón
			removeCoupon: () => {
				set((state) => {
					state.validatedCoupon = null
				})
			},

			// Establecer método de envío
			setSelectedShipping: (shippingId) => {
				set((state) => {
					state.selectedShipping = shippingId
				})
			},

			// Setters para sincronización
			setLoading: (loading) => {
				set((state) => {
					state.isLoading = loading
				})
			},

			setSyncing: (syncing) => {
				set((state) => {
					state.isSyncing = syncing
				})
			},

			setItems: (items) => {
				set((state) => {
					state.items = items
				})
			},

			setLastSyncedAt: (date) => {
				set((state) => {
					state.lastSyncedAt = date
				})
			},
		})),
		{
			name: 'renova-cart',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				items: state.items,
				lastSyncedAt: state.lastSyncedAt,
				selectedShipping: state.selectedShipping,
			}),
		},
	),
)
