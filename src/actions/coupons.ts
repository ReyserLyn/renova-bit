'use server'

import { db } from '@/database'
import { couponUsages, coupons } from '@/database/schema'
import bcrypt from 'bcryptjs'
import { and, eq, gte, isNull, or, sql } from 'drizzle-orm'

/**
 * Validar un código de cupón
 */
export async function validateCoupon(
	code: string,
	userId: string | null,
	subtotal: number,
) {
	try {
		// Normalizar código
		const normalizedCode = code.trim().toUpperCase()

		// Buscar cupones activos
		const activeCoupons = await db.query.coupons.findMany({
			where: and(
				eq(coupons.is_active, true),
				or(isNull(coupons.valid_until), gte(coupons.valid_until, new Date())),
			),
		})

		// Buscar el cupón válido comparando con bcrypt
		let validCoupon = null
		for (const coupon of activeCoupons) {
			const isMatch = await bcrypt.compare(normalizedCode, coupon.code_hash)
			if (isMatch) {
				validCoupon = coupon
				break
			}
		}

		if (!validCoupon) {
			return {
				isValid: false,
				error: 'Cupón no válido',
			}
		}

		// Verificar fecha de expiración
		if (validCoupon.valid_until && new Date() > validCoupon.valid_until) {
			return {
				isValid: false,
				error: 'Cupón expirado',
			}
		}

		// Verificar compra mínima
		if (
			validCoupon.min_purchase &&
			subtotal < Number(validCoupon.min_purchase)
		) {
			return {
				isValid: false,
				error: `Compra mínima requerida: S/${validCoupon.min_purchase}`,
			}
		}

		// Verificar límite de uso global
		if (
			validCoupon.usage_limit &&
			validCoupon.usage_count >= validCoupon.usage_limit
		) {
			return {
				isValid: false,
				error: 'Cupón agotado',
			}
		}

		// Verificar si el usuario ya usó este cupón
		if (userId) {
			const existingUsage = await db.query.couponUsages.findFirst({
				where: and(
					eq(couponUsages.coupon_id, validCoupon.id),
					eq(couponUsages.user_id, userId),
				),
			})

			if (existingUsage) {
				return {
					isValid: false,
					error: 'Ya has utilizado este cupón',
				}
			}
		}

		// Calcular descuento
		let discountAmount = (subtotal * validCoupon.discount_percent) / 100

		// Aplicar descuento máximo si existe
		if (
			validCoupon.max_discount &&
			discountAmount > Number(validCoupon.max_discount)
		) {
			discountAmount = Number(validCoupon.max_discount)
		}

		return {
			isValid: true,
			coupon: {
				id: validCoupon.id,
				code: normalizedCode,
				discount_percent: validCoupon.discount_percent,
				discount_amount: discountAmount,
			},
		}
	} catch (error) {
		console.error('Error validando cupón:', error)
		return {
			isValid: false,
			error: 'Error al validar el cupón',
		}
	}
}

/**
 * Registrar el uso de un cupón
 */
export async function registerCouponUsage(
	couponId: string,
	userId: string,
	orderId?: string,
) {
	try {
		// Incrementar contador de uso
		await db
			.update(coupons)
			.set({
				usage_count: sql`${coupons.usage_count} + 1`,
				updated_at: new Date(),
			})
			.where(eq(coupons.id, couponId))

		// Registrar uso por usuario
		await db.insert(couponUsages).values({
			coupon_id: couponId,
			user_id: userId,
			order_id: orderId,
		})

		return { success: true }
	} catch (error) {
		console.error('Error registrando uso de cupón:', error)
		return { success: false }
	}
}

/**
 * Crear un nuevo cupón (para admin)
 */
export async function createCoupon(
	code: string,
	discountPercent: number,
	options?: {
		validUntil?: Date
		minPurchase?: number
		maxDiscount?: number
		usageLimit?: number
	},
) {
	try {
		// Hashear el código
		const salt = await bcrypt.genSalt(10)
		const codeHash = await bcrypt.hash(code.toUpperCase(), salt)

		// Insertar cupón
		const [newCoupon] = await db
			.insert(coupons)
			.values({
				code_hash: codeHash,
				discount_percent: discountPercent,
				valid_until: options?.validUntil,
				min_purchase: options?.minPurchase?.toString(),
				max_discount: options?.maxDiscount?.toString(),
				usage_limit: options?.usageLimit,
			})
			.returning()

		return { success: true, coupon: newCoupon }
	} catch (error) {
		console.error('Error creando cupón:', error)
		return { success: false, error: 'Error al crear el cupón' }
	}
}
