import { db } from '@/database'
import { couponUsages, coupons } from '@/database/schema'
import { and, eq, gte, isNull, or, sql } from 'drizzle-orm'

/**
 * Obtener todos los cupones activos
 */
export async function getActiveCoupons() {
	return await db.query.coupons.findMany({
		where: and(
			eq(coupons.is_active, true),
			or(isNull(coupons.valid_until), gte(coupons.valid_until, new Date())),
		),
	})
}

/**
 * Obtener un cupón por su ID
 */
export async function getCouponById(couponId: string) {
	return await db.query.coupons.findFirst({
		where: eq(coupons.id, couponId),
	})
}

/**
 * Verificar si un usuario ya usó un cupón específico
 */
export async function getCouponUsageByUser(couponId: string, userId: string) {
	return await db.query.couponUsages.findFirst({
		where: and(
			eq(couponUsages.coupon_id, couponId),
			eq(couponUsages.user_id, userId),
		),
	})
}

/**
 * Insertar un nuevo cupón
 */
export async function insertCoupon(data: {
	code_hash: string
	discount_percent: number
	valid_until?: Date | null
	min_purchase?: string | null
	max_discount?: string | null
	usage_limit?: number | null
}) {
	return await db.insert(coupons).values(data).returning()
}

/**
 * Incrementar el contador de uso de un cupón
 */
export async function incrementCouponUsage(couponId: string) {
	return await db
		.update(coupons)
		.set({
			usage_count: sql`${coupons.usage_count} + 1`,
			updated_at: new Date(),
		})
		.where(eq(coupons.id, couponId))
}

/**
 * Registrar el uso de un cupón por un usuario
 */
export async function insertCouponUsage(data: {
	coupon_id: string
	user_id: string
	order_id?: string
}) {
	return await db.insert(couponUsages).values(data)
}

/**
 * Obtener todos los usos de un cupón
 */
export async function getCouponUsages(couponId: string) {
	return await db.query.couponUsages.findMany({
		where: eq(couponUsages.coupon_id, couponId),
	})
}

/**
 * Obtener el historial de cupones usados por un usuario
 */
export async function getUserCouponHistory(userId: string) {
	return await db.query.couponUsages.findMany({
		where: eq(couponUsages.user_id, userId),
		with: {
			coupon: true,
		},
	})
}
