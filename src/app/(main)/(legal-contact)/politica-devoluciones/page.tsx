import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	FileText,
	MessageCircle,
	RotateCcw,
	Shield,
	XCircle,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Política de Devoluciones y Garantía - RenovaBit',
	description:
		'Conoce nuestras políticas de devolución, cambio y garantía. Protegemos tu inversión con garantías completas y servicio post-venta.',
	keywords: 'devoluciones, garantía, cambios, servicio post-venta, RenovaBit',
}

export default function ReturnsPage() {
	const breadcrumbItems = [
		{ label: 'Política de Devoluciones', isActive: true },
	]

	const warrantyPeriods = [
		{
			category: 'Laptops y Computadoras',
			period: '12 meses',
			type: 'Garantía del fabricante + soporte técnico',
			color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
		},
		{
			category: 'Componentes PC',
			period: '6-24 meses',
			type: 'Según especificaciones del fabricante',
			color: 'bg-green-100 text-green-800 dark:bg-green-900/30',
		},
		{
			category: 'Periféricos',
			period: '6-12 meses',
			type: 'Garantía del fabricante',
			color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30',
		},
		{
			category: 'Accesorios',
			period: '3-6 meses',
			type: 'Garantía limitada',
			color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
		},
	]

	const returnReasons = [
		{
			reason: 'Producto Defectuoso',
			timeLimit: '7 días',
			conditions: 'Defecto de fábrica comprobado',
			action: 'Cambio o reembolso completo',
			icon: XCircle,
			color: 'text-red-600',
		},
		{
			reason: 'Error en el Pedido',
			timeLimit: '24 horas',
			conditions: 'Error nuestro en el envío',
			action: 'Cambio gratuito + envío gratis',
			icon: AlertTriangle,
			color: 'text-yellow-600',
		},
		{
			reason: 'Cambio de Opinion',
			timeLimit: '3 días',
			conditions: 'Producto sin usar, empaque original',
			action: 'Cambio (gastos de envío a cargo del cliente)',
			icon: RotateCcw,
			color: 'text-blue-600',
		},
		{
			reason: 'Garantía',
			timeLimit: 'Según producto',
			conditions: 'Dentro del período de garantía',
			action: 'Reparación, cambio o reembolso',
			icon: Shield,
			color: 'text-green-600',
		},
	]

	const returnSteps = [
		{
			step: 1,
			title: 'Contacta con nosotros',
			description:
				'Comunícate vía WhatsApp o email explicando el motivo del retorno.',
		},
		{
			step: 2,
			title: 'Evaluación inicial',
			description: 'Analizamos tu solicitud y te indicamos los pasos a seguir.',
		},
		{
			step: 3,
			title: 'Devolución del producto',
			description: 'Coordinas la devolución o nosotros recogemos el producto.',
		},
		{
			step: 4,
			title: 'Inspección',
			description:
				'Verificamos el estado del producto y validamos la garantía.',
		},
		{
			step: 5,
			title: 'Resolución',
			description:
				'Procedemos con el cambio, reparación o reembolso según corresponda.',
		},
	]

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-4">
						<Shield className="h-8 w-8 text-primary" />
						<h1 className="text-4xl lg:text-5xl font-bold">
							Devoluciones y Garantía
						</h1>
					</div>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Tu satisfacción es nuestra prioridad. Conoce nuestras políticas de
						devolución, cambio y garantía que protegen tu inversión.
					</p>
				</div>

				{/* Garantía Destacada */}
				<Card className="mb-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800">
					<CardContent className="p-8 text-center">
						<CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
							✅ Garantía Completa Incluida
						</h2>
						<p className="text-green-700 dark:text-green-300 mb-4">
							Todos nuestros productos incluyen garantía del fabricante más
							nuestro soporte técnico especializado
						</p>
						<div className="flex flex-wrap justify-center gap-2">
							<Badge
								variant="secondary"
								className="bg-green-100 text-green-800"
							>
								Productos originales
							</Badge>
							<Badge
								variant="secondary"
								className="bg-green-100 text-green-800"
							>
								Soporte técnico
							</Badge>
							<Badge
								variant="secondary"
								className="bg-green-100 text-green-800"
							>
								Servicio post-venta
							</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Períodos de Garantía */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-center mb-8">
						Períodos de Garantía
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{warrantyPeriods.map((warranty) => (
							<Card key={warranty.category} className="text-center">
								<CardHeader>
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
										<Clock className="w-8 h-8 text-primary" />
									</div>
									<CardTitle className="text-lg">{warranty.category}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className={`p-3 rounded-lg mb-3 ${warranty.color}`}>
										<div className="font-bold text-lg">{warranty.period}</div>
									</div>
									<p className="text-sm text-muted-foreground">
										{warranty.type}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Motivos de Devolución */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-center mb-8">
						Motivos de Devolución
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{returnReasons.map((reason) => (
							<Card key={reason.reason} className="h-full">
								<CardHeader>
									<div className="flex items-center gap-3">
										<reason.icon className={`w-6 h-6 ${reason.color}`} />
										<div>
											<CardTitle className="text-lg">{reason.reason}</CardTitle>
											<Badge variant="outline" className="mt-1">
												{reason.timeLimit}
											</Badge>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-3">
									<div>
										<h4 className="font-medium text-sm">Condiciones:</h4>
										<p className="text-sm text-muted-foreground">
											{reason.conditions}
										</p>
									</div>
									<div>
										<h4 className="font-medium text-sm">Acción:</h4>
										<p className="text-sm text-primary font-medium">
											{reason.action}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Proceso de Devolución */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="text-2xl text-center">
							Proceso de Devolución
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
							{returnSteps.map((step, index) => (
								<div key={step.step} className="text-center">
									<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white dark:text-black font-bold text-lg mx-auto mb-3">
										{step.step}
									</div>
									<h4 className="font-semibold mb-2">{step.title}</h4>
									<p className="text-sm text-muted-foreground">
										{step.description}
									</p>
									{index < returnSteps.length - 1 && (
										<div className="hidden md:block w-full h-0.5 bg-muted mt-6" />
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Condiciones Detalladas */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					{/* Condiciones para Devoluciones */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="w-5 h-5" />
								Condiciones para Devoluciones
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3 text-sm">
								<div>
									<h4 className="font-medium text-green-700">
										✅ Aceptamos devolución cuando:
									</h4>
									<ul className="list-disc pl-5 text-muted-foreground space-y-1">
										<li>El producto presenta defectos de fabricación</li>
										<li>Recibiste un producto diferente al pedido</li>
										<li>El producto llegó dañado por el transporte</li>
										<li>No cumple las especificaciones descritas</li>
										<li>Está dentro del período de garantía</li>
									</ul>
								</div>
								<div>
									<h4 className="font-medium text-red-700">
										❌ No aceptamos devolución cuando:
									</h4>
									<ul className="list-disc pl-5 text-muted-foreground space-y-1">
										<li>El daño es causado por mal uso del usuario</li>
										<li>Ha pasado el período límite establecido</li>
										<li>Falta el empaque original o accesorios</li>
										<li>El producto muestra signos de uso excesivo</li>
										<li>Se han roto los sellos de garantía</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Información de Garantía */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5" />
								Información de Garantía
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3 text-sm">
								<div>
									<h4 className="font-medium">🛡️ Cobertura de Garantía</h4>
									<p className="text-muted-foreground">
										La garantía cubre defectos de fabricación y fallas del
										hardware bajo uso normal.
									</p>
								</div>
								<div>
									<h4 className="font-medium">🔧 Servicio Técnico</h4>
									<p className="text-muted-foreground">
										Contamos con técnicos certificados para evaluación y
										reparación de productos.
									</p>
								</div>
								<div>
									<h4 className="font-medium">📋 Documentación Requerida</h4>
									<p className="text-muted-foreground">
										Comprobante de compra, caja original y accesorios incluidos.
									</p>
								</div>
								<div>
									<h4 className="font-medium">⏱️ Tiempo de Resolución</h4>
									<p className="text-muted-foreground">
										Evaluamos y resolvemos casos de garantía en un máximo de 7
										días hábiles.
									</p>
								</div>
								<div>
									<h4 className="font-medium">🔄 Opciones de Resolución</h4>
									<p className="text-muted-foreground">
										Reparación, reemplazo por producto nuevo o reembolso según
										el caso.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Preguntas Frecuentes */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-2">
									¿Puedo devolver un producto sin usar?
								</h4>
								<p className="text-sm text-muted-foreground">
									Sí, tienes 3 días para devolver productos sin usar en su
									empaque original. Los gastos de envío corren por tu cuenta.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Qué hago si mi producto llega dañado?
								</h4>
								<p className="text-sm text-muted-foreground">
									Contacta inmediatamente vía WhatsApp con fotos del daño.
									Gestionamos el cambio sin costo adicional.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Cuánto demora el reembolso?
								</h4>
								<p className="text-sm text-muted-foreground">
									Una vez aprobada la devolución, el reembolso se procesa en 3-5
									días hábiles según el método de pago.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿La garantía cubre software?
								</h4>
								<p className="text-sm text-muted-foreground">
									La garantía de hardware está incluida. Para software,
									aplicamos los términos de cada fabricante.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Puedo cambiar por otro modelo?
								</h4>
								<p className="text-sm text-muted-foreground">
									Sí, puedes cambiar por otro modelo pagando o recibiendo la
									diferencia de precio si aplica.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">
									¿Qué documentos necesito para la garantía?
								</h4>
								<p className="text-sm text-muted-foreground">
									Necesitas el comprobante de compra (boleta/factura) y
									preferiblemente la caja original del producto.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contacto para Devoluciones */}
				<Card className="bg-primary/5">
					<CardContent className="p-8 text-center">
						<MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-4">
							¿Necesitas hacer una devolución o consultar tu garantía?
						</h3>
						<p className="text-muted-foreground mb-6">
							Nuestro equipo de soporte está listo para ayudarte con cualquier
							tema relacionado con devoluciones y garantías.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
							<Button asChild>
								<Link href="https://wa.me/51987471074" target="_blank">
									<MessageCircle className="w-4 h-4 mr-2" />
									WhatsApp: +51 987 471 074
								</Link>
							</Button>
							<Button asChild variant="outline">
								<Link href="mailto:garantias@renovabit.com">
									📧 garantias@renovabit.com
								</Link>
							</Button>
						</div>
						<div className="text-sm text-muted-foreground">
							<p>
								<strong>Horarios de atención:</strong>
							</p>
							<p>Lunes a Sábado: 9:00 AM - 7:00 PM</p>
							<p>Domingo: 10:00 AM - 2:00 PM</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
