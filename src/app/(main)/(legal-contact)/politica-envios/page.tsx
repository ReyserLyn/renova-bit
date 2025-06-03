import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	AlertCircle,
	Calendar,
	Clock,
	Gift,
	MapPin,
	Package,
	Phone,
	Truck,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Política de Envíos - RenovaBit',
	description:
		'Información sobre envíos, delivery gratis los fines de semana, tiempos de entrega y cobertura en Moquegua y todo el Perú.',
	keywords: 'envíos, delivery, Moquegua, tiempos entrega, RenovaBit',
}

export default function ShippingPage() {
	const breadcrumbItems = [{ label: 'Política de Envíos', isActive: true }]

	const deliveryZones = [
		{
			zone: 'Moquegua Ciudad',
			time: '1-2 horas',
			cost: 'GRATIS los fines de semana',
			workdayCost: 'S/ 5.00',
			icon: MapPin,
			color: 'bg-green-100 text-green-800 dark:bg-green-900/30',
		},
		{
			zone: 'Provincia de Moquegua',
			time: '2-4 horas',
			cost: 'S/ 10.00 - S/ 15.00',
			workdayCost: 'Según distancia',
			icon: Truck,
			color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
		},
		{
			zone: 'Lima y principales ciudades',
			time: '1-3 días hábiles',
			cost: 'S/ 15.00 - S/ 25.00',
			workdayCost: 'Según peso y destino',
			icon: Package,
			color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30',
		},
		{
			zone: 'Resto del Perú',
			time: '3-7 días hábiles',
			cost: 'S/ 20.00 - S/ 40.00',
			workdayCost: 'Cotización personalizada',
			icon: Calendar,
			color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
		},
	]

	const shippingMethods = [
		{
			name: 'Delivery Express Local',
			description: 'Entrega el mismo día en Moquegua ciudad',
			time: '1-4 horas',
			cost: 'S/ 10.00',
			features: [
				'Seguimiento en tiempo real',
				'Entrega hasta las 8 PM',
				'Confirmación WhatsApp',
			],
		},
		{
			name: 'Delivery Gratuito Weekend',
			description: 'Servicio especial de fines de semana',
			time: 'Sábados y Domingos',
			cost: 'GRATIS',
			features: [
				'Solo fines de semana',
				'Moquegua ciudad',
				'Pedidos desde S/ 100',
			],
		},
		{
			name: 'Courier Nacional',
			description: 'Envío a todo el Perú vía empresas de transporte',
			time: '1-7 días hábiles',
			cost: 'Según destino',
			features: ['Cobertura nacional', 'Seguro incluido', 'Código de rastreo'],
		},
		{
			name: 'Recojo en Tienda',
			description: 'Retira tu pedido directamente',
			time: 'Inmediato',
			cost: 'GRATIS',
			features: [
				'Sin costo adicional',
				'Horarios flexibles',
				'Inspección previa',
			],
		},
	]

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-4">
						<Truck className="h-8 w-8 text-primary" />
						<h1 className="text-4xl lg:text-5xl font-bold">
							Política de Envíos
						</h1>
					</div>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Conoce nuestros servicios de entrega, tiempos estimados y cobertura.
						¡Delivery gratuito los fines de semana en Moquegua!
					</p>
				</div>

				{/* Promoción Destacada */}
				<Card className="mb-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800">
					<CardContent className="p-8 text-center">
						<Gift className="w-12 h-12 text-green-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
							🎉 Delivery GRATIS los Fines de Semana
						</h2>
						<p className="text-green-700 dark:text-green-300 mb-4">
							Todos los sábados y domingos entregamos sin costo adicional en
							Moquegua ciudad
						</p>
						<Badge variant="secondary" className="bg-green-100 text-green-800">
							Válido para pedidos desde S/ 50
						</Badge>
					</CardContent>
				</Card>

				{/* Zonas de Entrega */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-center mb-8">
						Zonas de Cobertura
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{deliveryZones.map((zone) => (
							<Card
								key={zone.zone}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader className="text-center pb-4">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
										<zone.icon className="w-8 h-8 text-primary" />
									</div>
									<CardTitle className="text-lg">{zone.zone}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4 text-muted-foreground" />
										<span className="text-sm">{zone.time}</span>
									</div>
									<div
										className={`p-2 rounded-lg text-xs font-medium ${zone.color}`}
									>
										Weekend: {zone.cost}
									</div>
									<div className="text-xs text-muted-foreground">
										Días hábiles: {zone.workdayCost}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Métodos de Envío */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-center mb-8">
						Métodos de Envío
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{shippingMethods.map((method) => (
							<Card key={method.name} className="h-full">
								<CardHeader>
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-xl mb-2">
												{method.name}
											</CardTitle>
											<p className="text-muted-foreground text-sm">
												{method.description}
											</p>
										</div>
										<Badge variant="outline">{method.cost}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="mb-4">
										<div className="flex items-center gap-2 mb-3">
											<Clock className="w-4 h-4 text-primary" />
											<span className="font-medium">Tiempo: {method.time}</span>
										</div>
									</div>
									<div>
										<h4 className="font-medium mb-2">Características:</h4>
										<ul className="space-y-1">
											{method.features.map((feature, idx) => (
												<li
													key={idx}
													className="text-sm text-muted-foreground flex items-center gap-2"
												>
													<div className="w-1.5 h-1.5 bg-primary rounded-full" />
													{feature}
												</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Información Detallada */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					{/* Proceso de Envío */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="w-5 h-5" />
								Proceso de Envío
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex gap-3">
									<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
										1
									</div>
									<div>
										<h4 className="font-medium">Confirmación del Pedido</h4>
										<p className="text-sm text-muted-foreground">
											Verificamos disponibilidad y confirmamos tu pedido vía
											WhatsApp.
										</p>
									</div>
								</div>
								<div className="flex gap-3">
									<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
										2
									</div>
									<div>
										<h4 className="font-medium">Preparación</h4>
										<p className="text-sm text-muted-foreground">
											Empacamos cuidadosamente tu producto y generamos la guía
											de envío.
										</p>
									</div>
								</div>
								<div className="flex gap-3">
									<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
										3
									</div>
									<div>
										<h4 className="font-medium">Envío</h4>
										<p className="text-sm text-muted-foreground">
											Despachamos tu pedido y te enviamos el código de
											seguimiento.
										</p>
									</div>
								</div>
								<div className="flex gap-3">
									<div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
										4
									</div>
									<div>
										<h4 className="font-medium">Entrega</h4>
										<p className="text-sm text-muted-foreground">
											Recibes tu producto y confirmamos la entrega exitosa.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Términos y Condiciones de Envío */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<AlertCircle className="w-5 h-5" />
								Términos y Condiciones
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3 text-sm">
								<div>
									<h4 className="font-medium">📦 Empaquetado</h4>
									<p className="text-muted-foreground">
										Todos los productos se empacan con materiales de protección
										para evitar daños durante el transporte.
									</p>
								</div>
								<div>
									<h4 className="font-medium">📋 Verificación de Entrega</h4>
									<p className="text-muted-foreground">
										El destinatario debe verificar el estado del producto al
										momento de la entrega.
									</p>
								</div>
								<div>
									<h4 className="font-medium">🕒 Horarios de Entrega</h4>
									<p className="text-muted-foreground">
										Lunes a Sábado: 9:00 AM - 7:00 PM
										<br />
										Domingos: 10:00 AM - 6:00 PM
									</p>
								</div>
								<div>
									<h4 className="font-medium">📱 Comunicación</h4>
									<p className="text-muted-foreground">
										Te mantendremos informado del estado de tu envío vía
										WhatsApp.
									</p>
								</div>
								<div>
									<h4 className="font-medium">🔄 Intentos de Entrega</h4>
									<p className="text-muted-foreground">
										Realizamos hasta 2 intentos de entrega. Después
										coordinaremos nueva fecha.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Preguntas Frecuentes sobre Envíos */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-2">
									¿Cómo puedo rastrear mi pedido?
								</h4>
								<p className="text-sm text-muted-foreground">
									Te enviamos un código de seguimiento vía WhatsApp que puedes
									usar en la web del courier o contactarnos directamente.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Qué pasa si no estoy en casa?
								</h4>
								<p className="text-sm text-muted-foreground">
									Coordinamos una nueva fecha de entrega que sea conveniente
									para ti. También puedes recoger en nuestra tienda.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Hacen envíos fuera de Perú?
								</h4>
								<p className="text-sm text-muted-foreground">
									Actualmente solo realizamos envíos dentro del territorio
									peruano. Contacta para casos especiales.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Los envíos incluyen seguro?
								</h4>
								<p className="text-sm text-muted-foreground">
									Sí, todos nuestros envíos incluyen seguro contra pérdida o
									daños durante el transporte.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contacto para Envíos */}
				<Card className="bg-primary/5">
					<CardContent className="p-8 text-center">
						<Phone className="w-8 h-8 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-4">
							¿Necesitas ayuda con tu envío?
						</h3>
						<p className="text-muted-foreground mb-6">
							Nuestro equipo está listo para ayudarte con cualquier consulta
							sobre envíos y entregas.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
							<div className="flex items-center gap-2">
								<span className="font-medium">WhatsApp Envíos:</span>
								<Link
									href="https://wa.me/51987471074"
									target="_blank"
									className="text-primary hover:underline"
								>
									+51 987 471 074
								</Link>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">Email:</span>
								<Link
									href="mailto:envios@renovabit.com"
									className="text-primary hover:underline"
								>
									envios@renovabit.com
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
