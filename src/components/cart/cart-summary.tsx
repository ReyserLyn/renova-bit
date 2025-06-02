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
import { formatDeliveryDate, getEstimatedDeliveryDate } from '@/lib/shipping'
import { Info, Loader2, ShoppingBag, Tag, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Separator } from '../ui/separator'

export function CartSummary() {
	const router = useRouter()
	const {
		itemCount,
		totalItems,
		subtotal,
		discountAmount,
		shippingCost,
		total,
		validatedCoupon,
		selectedShipping,
		setSelectedShipping,
		shippingOptions,
		clearCart,
		isClearingCart,
	} = useCart()

	const { validateCoupon, isValidating, removeCoupon } = useCoupon()
	const [couponInput, setCouponInput] = useState('')

	const subtotalAfterDiscount = subtotal - discountAmount

	const handleApplyCoupon = () => {
		if (!couponInput.trim()) return
		validateCoupon(couponInput)
	}

	const handleRemoveCoupon = () => {
		removeCoupon()
		setCouponInput('')
	}

	const handleCheckout = () => {
		router.push(`/checkout?shipping=${selectedShipping}`)
	}

	return (
		<Card className="w-full max-w-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
					<ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
					Resumen del Pedido
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4 px-4 sm:px-6">
				<div className="space-y-2">
					<div className="flex justify-between text-sm sm:text-base">
						<span className="text-muted-foreground">
							Subtotal ({totalItems}{' '}
							{totalItems === 1 ? 'producto' : 'productos'})
						</span>
						<span className="font-medium">S/{subtotal.toFixed(2)}</span>
					</div>

					{!validatedCoupon ? (
						<div className="space-y-2">
							<Label
								htmlFor="coupon"
								className="text-sm flex items-center gap-1"
							>
								<Tag className="h-3 w-3" />
								Cupón de descuento
							</Label>
							<div className="flex flex-col sm:flex-row gap-2">
								<Input
									id="coupon"
									placeholder="Ingresa tu cupón"
									value={couponInput}
									onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
									onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
									disabled={isValidating}
									className="flex-1 text-sm"
								/>
								<Button
									variant="outline"
									size="sm"
									onClick={handleApplyCoupon}
									disabled={isValidating || !couponInput.trim()}
									className="w-full sm:w-auto"
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
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-green-600 text-sm">
							<span className="flex items-center gap-1">
								<Tag className="h-3 w-3" />
								Cupón {validatedCoupon.code} ({validatedCoupon.discount_percent}
								% desc.)
							</span>
							<div className="flex items-center justify-between sm:justify-end gap-2">
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

				<div className="space-y-3">
					<Label className="text-sm flex items-center gap-1">
						<Truck className="h-4 w-4" />
						Método de envío
					</Label>
					<RadioGroup
						value={selectedShipping}
						onValueChange={setSelectedShipping}
						className="space-y-2"
					>
						{shippingOptions.map((option) => (
							<div
								key={option.id}
								className="flex items-start space-x-2 py-2 pr-2"
							>
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className="mt-1 flex-shrink-0"
								/>
								<Label
									htmlFor={option.id}
									className="flex-1 cursor-pointer space-y-1 min-w-0"
								>
									<div className="flex flex-col sm:flex-row sm:justify-between gap-1">
										<span className="font-medium text-sm">{option.name}</span>
										<span
											className={`text-sm flex-shrink-0 ${
												option.price === 0 ? 'text-green-600 font-semibold' : ''
											}`}
										>
											{option.price === 0
												? 'GRATIS'
												: `S/${option.price.toFixed(2)}`}
										</span>
									</div>
									<p className="text-xs text-muted-foreground pr-4">
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

					<div className="flex justify-between text-base sm:text-lg font-bold">
						<span>Total a pagar</span>
						<span>S/{total.toFixed(2)}</span>
					</div>

					<p className="text-xs text-muted-foreground flex items-start gap-1">
						<Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
						<span>Todos los precios incluyen IGV</span>
					</p>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col gap-2 px-4 sm:px-6">
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
