'use client'

import type { products } from '@/database/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * Tipo para un item del carrito
 */
export type CartItem = {
	product: InferSelectModel<typeof products> & {
		brand: { id: string; name: string; slug: string }
	}
	quantity: number
}

/**
 * Tipo para un cupón validado
 */
export type ValidatedCoupon = {
	id: string
	code: string
	discount_percent: number
	discount_amount: number
}

/**
 * Estado del store del carrito
 */
interface CartState {
	items: CartItem[]
	isLoading: boolean
	isSyncing: boolean
	lastSyncedAt: string | null
	validatedCoupon: ValidatedCoupon | null
	selectedShipping: string
}

/**
 * Acciones del store del carrito
 */
interface CartActions {
	// Acciones básicas del carrito
	addItem: (product: CartItem['product'], quantity?: number) => void
	removeItem: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void

	// Utilidades
	getItemCount: () => number
	getSubtotal: () => number
	getTotalItems: () => number
	getDiscountAmount: () => number
	getFinalTotal: () => number

	// Cupones
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

			// Añadir item al carrito
			addItem: (product, quantity = 1) => {
				set((state: CartState) => {
					const existingItem = state.items.find(
						(item: CartItem) => item.product.id === product.id,
					)

					if (existingItem) {
						// Si ya existe, incrementar cantidad
						existingItem.quantity += quantity
					} else {
						// Si no existe, añadir nuevo item
						state.items.push({ product, quantity })
					}
				})
			},

			// Eliminar item del carrito
			removeItem: (productId) => {
				set((state: CartState) => {
					state.items = state.items.filter(
						(item: CartItem) => item.product.id !== productId,
					)
				})
			},

			// Actualizar cantidad de un item
			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(productId)
					return
				}

				set((state: CartState) => {
					const item = state.items.find(
						(item: CartItem) => item.product.id === productId,
					)
					if (item) {
						item.quantity = quantity
					}
				})
			},

			// Limpiar carrito
			clearCart: () => {
				set((state: CartState) => {
					state.items = []
					state.validatedCoupon = null
				})
			},

			// Obtener número de items únicos
			getItemCount: () => {
				return get().items.length
			},

			// Obtener subtotal del carrito (sin descuentos)
			getSubtotal: () => {
				return get().items.reduce((total, item) => {
					return total + Number.parseFloat(item.product.price) * item.quantity
				}, 0)
			},

			// Obtener total de items (sumando cantidades)
			getTotalItems: () => {
				return get().items.reduce((total, item) => {
					return total + item.quantity
				}, 0)
			},

			// Obtener monto del descuento
			getDiscountAmount: () => {
				const state = get()
				return state.validatedCoupon?.discount_amount || 0
			},

			// Obtener total final (con descuentos aplicados)
			getFinalTotal: () => {
				const state = get()
				return state.getSubtotal() - state.getDiscountAmount()
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
			name: 'renova-cart', // Nombre en localStorage
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				// Solo persistir items, lastSyncedAt y método de envío
				items: state.items,
				lastSyncedAt: state.lastSyncedAt,
				selectedShipping: state.selectedShipping,
				// NO persistir el cupón validado por seguridad
			}),
		},
	),
)
