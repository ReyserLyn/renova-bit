'use client'

import { validateCoupon } from '@/actions/coupons'
import { useUser } from '@/hooks/use-user'
import { useCartStore } from '@/lib/stores/cart-store'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export function useCoupon() {
	const { user } = useUser()
	const { getSubtotal } = useCartStore()

	const validateCouponMutation = useMutation({
		mutationFn: async (code: string) => {
			const subtotal = getSubtotal()
			const result = await validateCoupon(code, user?.id || null, subtotal)
			return result
		},
		onSuccess: (data) => {
			if (data.isValid && data.coupon) {
				useCartStore.getState().setValidatedCoupon(data.coupon)
				toast.success('¡Cupón aplicado correctamente!')
			} else {
				toast.error(data.error || 'Cupón no válido')
			}
		},
		onError: () => {
			toast.error('Error al validar el cupón')
		},
	})

	const removeCoupon = () => {
		useCartStore.getState().removeCoupon()
		toast('Cupón removido', {
			icon: '🗑️',
		})
	}

	return {
		validateCoupon: validateCouponMutation.mutate,
		isValidating: validateCouponMutation.isPending,
		removeCoupon,
	}
}
