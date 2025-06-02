export type ShippingOption = {
	id: string
	name: string
	description: string
	price: number
	estimatedDays: string
	available: boolean
}

export function getShippingOptions(): ShippingOption[] {
	const today = new Date()
	const dayOfWeek = today.getDay() // 0 = Domingo, 6 = Sábado
	const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
	const hour = today.getHours()

	const options: ShippingOption[] = [
		{
			id: 'express',
			name: 'Envío Express',
			description:
				hour < 14
					? 'Recibe hoy mismo antes de las 8pm'
					: 'Recibe mañana antes del mediodía',
			price: 15.0,
			estimatedDays: hour < 14 ? 'Hoy' : 'Mañana',
			available: true,
		},
		{
			id: 'weekend',
			name: 'Envío Fin de Semana',
			description: isWeekend
				? 'Recibe este fin de semana'
				: 'Recibe el próximo sábado o domingo',
			price: 0,
			estimatedDays: isWeekend ? 'Este fin de semana' : 'Próximo fin de semana',
			available: true,
		},
		{
			id: 'standard',
			name: 'Envío Estándar',
			description: 'Recibe en 3-5 días hábiles',
			price: 8.0,
			estimatedDays: '3-5 días hábiles',
			available: true,
		},
	]

	return options
}

export function getEstimatedDeliveryDate(shippingId: string): Date {
	const today = new Date()
	const hour = today.getHours()

	switch (shippingId) {
		case 'express': {
			// Si es antes de las 2pm, entrega hoy. Si no, mañana
			if (hour < 12) {
				return today
			}
			const tomorrow = new Date(today)
			tomorrow.setDate(tomorrow.getDate() + 1)
			return tomorrow
		}

		case 'weekend': {
			// Calcular el próximo sábado
			const daysUntilSaturday = (6 - today.getDay() + 7) % 7
			const nextSaturday = new Date(today)
			nextSaturday.setDate(today.getDate() + (daysUntilSaturday || 7))
			return nextSaturday
		}

		case 'standard': {
			// Agregar 3 días hábiles
			const delivery = new Date(today)
			let daysAdded = 0
			while (daysAdded < 3) {
				delivery.setDate(delivery.getDate() + 1)
				// Si no es fin de semana, contar como día hábil
				if (delivery.getDay() !== 0 && delivery.getDay() !== 6) {
					daysAdded++
				}
			}
			return delivery
		}

		default:
			return today
	}
}

export function formatDeliveryDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	return date.toLocaleDateString('es-PE', options)
}
