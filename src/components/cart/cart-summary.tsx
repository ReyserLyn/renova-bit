'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCart } from '@/hooks/use-cart'
import { useCoupon } from '@/hooks/use-coupon'
import {
	formatDeliveryDate,
	getEstimatedDeliveryDate,
	getShippingOptions,
} from '@/lib/shipping'
import { Info, Loader2, ShoppingBag, Tag, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Separator } from '../ui/separator'

export function CartSummary() {
	const router = useRouter()
	const {
		subtotal,
		itemCount,
		clearCart,
		isClearingCart,
		validatedCoupon,
		selectedShipping,
		setSelectedShipping,
		discountAmount,
		totalItems,
		finalTotal,
	} = useCart()
	const { validateCoupon, isValidating, removeCoupon } = useCoupon()
	const [couponInput, setCouponInput] = useState('')

	// Obtener opciones de envío
	const shippingOptions = getShippingOptions()
	const selectedShippingOption = shippingOptions.find(
		(opt) => opt.id === selectedShipping,
	)
	const shippingCost = selectedShippingOption?.price || 0

	// Cálculos
	const subtotalAfterDiscount = subtotal - discountAmount
	const total = subtotalAfterDiscount + shippingCost

	const handleApplyCoupon = () => {
		if (!couponInput.trim()) return
		validateCoupon(couponInput)
	}

	const handleRemoveCoupon = () => {
		removeCoupon()
		setCouponInput('')
	}

	const handleCheckout = () => {
		// TODO: Implementar checkout con información de envío
		router.push(`/checkout?shipping=${selectedShipping}`)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ShoppingBag className="h-5 w-5" />
					Resumen del Pedido
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Resumen de productos */}
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}
							)
						</span>
						<span>S/{subtotal.toFixed(2)}</span>
					</div>

					{/* Cupón de descuento */}
					{!validatedCoupon ? (
						<div className="space-y-2">
							<Label
								htmlFor="coupon"
								className="text-sm flex items-center gap-1"
							>
								<Tag className="h-3 w-3" />
								Cupón de descuento
							</Label>
							<div className="flex gap-2">
								<Input
									id="coupon"
									placeholder="Ingresa tu cupón"
									value={couponInput}
									onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
									onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
									disabled={isValidating}
								/>
								<Button
									variant="outline"
									size="sm"
									onClick={handleApplyCoupon}
									disabled={isValidating || !couponInput.trim()}
								>
									{isValidating ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										'Aplicar'
									)}
								</Button>
							</div>
						</div>
					) : (
						<div className="flex justify-between items-center text-green-600">
							<span className="flex items-center gap-1">
								<Tag className="h-3 w-3" />
								Cupón {validatedCoupon.code} ({validatedCoupon.discount_percent}
								% desc.)
							</span>
							<div className="flex items-center gap-2">
								<span>-S/{discountAmount.toFixed(2)}</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleRemoveCoupon}
									className="h-6 px-2 text-xs"
								>
									Quitar
								</Button>
							</div>
						</div>
					)}
				</div>
				<Separator />

				{/* Opciones de envío */}
				<div className="space-y-3">
					<Label className="text-sm flex items-center gap-1">
						<Truck className="h-4 w-4" />
						Método de envío
					</Label>
					<RadioGroup
						value={selectedShipping}
						onValueChange={setSelectedShipping}
					>
						{shippingOptions.map((option) => (
							<div key={option.id} className="flex items-start space-x-2 py-2">
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className="mt-1"
								/>
								<Label
									htmlFor={option.id}
									className="flex-1 cursor-pointer space-y-1"
								>
									<div className="flex justify-between">
										<span className="font-medium">{option.name}</span>
										<span
											className={
												option.price === 0 ? 'text-green-600 font-semibold' : ''
											}
										>
											{option.price === 0
												? 'GRATIS'
												: `S/${option.price.toFixed(2)}`}
										</span>
									</div>
									<p className="text-xs text-muted-foreground">
										{option.description}
									</p>
									{option.id === selectedShipping && (
										<p className="text-xs text-blue-600">
											Entrega estimada:{' '}
											{formatDeliveryDate(getEstimatedDeliveryDate(option.id))}
										</p>
									)}
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				<Separator />

				{/* Total final */}
				<div className="space-y-2">
					{discountAmount > 0 && (
						<div className="flex justify-between text-sm">
							<span>Subtotal con descuento</span>
							<span>S/{subtotalAfterDiscount.toFixed(2)}</span>
						</div>
					)}

					<div className="flex justify-between text-sm">
						<span>Envío</span>
						<span
							className={
								shippingCost === 0 ? 'text-green-600 font-semibold' : ''
							}
						>
							{shippingCost === 0 ? 'GRATIS' : `S/${shippingCost.toFixed(2)}`}
						</span>
					</div>

					<div className="flex justify-between text-lg font-bold">
						<span>Total a pagar</span>
						<span>S/{total.toFixed(2)}</span>
					</div>

					<p className="text-xs text-muted-foreground flex items-center gap-1">
						<Info className="h-3 w-3" />
						Todos los precios incluyen IGV
					</p>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col gap-2">
				<Button
					className="w-full"
					size="lg"
					onClick={handleCheckout}
					disabled={itemCount === 0}
				>
					Proceder al Pago
				</Button>

				<Button
					variant="outline"
					className="w-full"
					onClick={() => clearCart()}
					disabled={isClearingCart || itemCount === 0}
				>
					{isClearingCart ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Vaciando...
						</>
					) : (
						'Vaciar Carrito'
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}
