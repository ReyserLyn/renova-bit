import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa6'

export const metadata: Metadata = {
	title: 'Contacto - RenovaBit',
	description:
		'Contáctanos para consultas, soporte técnico o información sobre nuestros productos tecnológicos en Moquegua.',
	keywords: 'contacto, soporte, RenovaBit, Moquegua, atención al cliente',
}

export default function ContactPage() {
	const breadcrumbItems = [{ label: 'Contacto', isActive: true }]

	const contactInfo = [
		{
			icon: Phone,
			title: 'Teléfono',
			info: '+51 987 471 074',
			description: 'Lunes a Sábado de 9:00 AM a 7:00 PM',
		},
		{
			icon: Mail,
			title: 'Email',
			info: 'info@renovabit.com',
			description: 'Respuesta en 24 horas',
		},
		{
			icon: MapPin,
			title: 'Ubicación',
			info: 'Moquegua, Perú',
			description: 'Entregas y atención personalizada',
		},
		{
			icon: Clock,
			title: 'Horarios',
			info: 'Lun - Sáb: 9:00 AM - 7:00 PM',
			description: 'Dom: 10:00 AM - 2:00 PM',
		},
	]

	const quickActions = [
		{
			icon: FaWhatsapp,
			title: 'WhatsApp',
			description: 'Chatea con nosotros ahora',
			action: 'https://wa.me/51987471074',
			color:
				'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
			buttonColor: 'bg-green-600 hover:bg-green-700',
		},
		{
			icon: MessageCircle,
			title: 'Soporte Técnico',
			description: 'Ayuda con productos y garantías',
			action: 'mailto:soporte@renovabit.com',
			color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
			buttonColor: 'bg-blue-600 hover:bg-blue-700',
		},
	]

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				<div className="text-center mb-12">
					<h1 className="text-4xl lg:text-5xl font-bold mb-4">Contáctanos</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo
						para cualquier consulta, soporte técnico o información sobre
						nuestros productos.
					</p>
				</div>

				{/* Acciones Rápidas */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					{quickActions.map((action) => (
						<Card
							key={action.title}
							className={`${action.color} border-0 hover:shadow-md transition-shadow`}
						>
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
										<action.icon className="w-6 h-6" />
									</div>
									<div>
										<h3 className="text-lg font-semibold">{action.title}</h3>
										<p className="text-sm opacity-80">{action.description}</p>
									</div>
								</div>
								<Button
									asChild
									className={`w-full ${action.buttonColor} text-white`}
								>
									<Link
										href={action.action}
										target={
											action.action.startsWith('http') ? '_blank' : '_self'
										}
									>
										Contactar Ahora
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Información de Contacto */}
					<div className="space-y-8">
						<div>
							<h2 className="text-2xl font-bold mb-6">
								Información de Contacto
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{contactInfo.map((item) => (
									<Card key={item.title}>
										<CardContent className="p-6">
											<div className="flex items-start gap-4">
												<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
													<item.icon className="w-6 h-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold text-base mb-1">
														{item.title}
													</h3>
													<p className="font-medium text-sm mb-1">
														{item.info}
													</p>
													<p className="text-xs text-muted-foreground">
														{item.description}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Preguntas Frecuentes */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">
									¿Necesitas ayuda rápida?
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-3">
									<div>
										<h4 className="font-medium text-sm">
											💳 Consultas sobre pedidos
										</h4>
										<p className="text-xs text-muted-foreground">
											WhatsApp: +51 987 471 074
										</p>
									</div>
									<div>
										<h4 className="font-medium text-sm">🔧 Soporte técnico</h4>
										<p className="text-xs text-muted-foreground">
											Email: soporte@renovabit.com
										</p>
									</div>
									<div>
										<h4 className="font-medium text-sm">
											🚚 Información de envíos
										</h4>
										<p className="text-xs text-muted-foreground">
											WhatsApp o email para seguimiento
										</p>
									</div>
									<div>
										<h4 className="font-medium text-sm">
											💼 Ventas empresariales
										</h4>
										<p className="text-xs text-muted-foreground">
											Email: ventas@renovabit.com
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Formulario de Contacto */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
							<p className="text-muted-foreground">
								Completa el formulario y te responderemos a la brevedad.
							</p>
						</CardHeader>
						<CardContent>
							<form className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="nombre">Nombre *</Label>
										<Input
											id="nombre"
											placeholder="Tu nombre completo"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="telefono">Teléfono</Label>
										<Input
											id="telefono"
											type="tel"
											placeholder="+51 987 123 456"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email *</Label>
									<Input
										id="email"
										type="email"
										placeholder="tu@email.com"
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="asunto">Asunto *</Label>
									<Input
										id="asunto"
										placeholder="¿En qué podemos ayudarte?"
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="mensaje">Mensaje *</Label>
									<Textarea
										id="mensaje"
										placeholder="Describe tu consulta o mensaje..."
										rows={6}
										required
									/>
								</div>

								<div className="text-xs text-muted-foreground">
									* Campos obligatorios. Al enviar este formulario, aceptas
									nuestra{' '}
									<Link
										href="/politica-privacidad"
										className="text-primary hover:underline"
									>
										Política de Privacidad
									</Link>
									.
								</div>

								<Button type="submit" className="w-full">
									<Send className="w-4 h-4 mr-2" />
									Enviar Mensaje
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Mapa o Información Adicional */}
				<Card className="mt-12">
					<CardContent className="p-8 text-center">
						<h3 className="text-xl font-semibold mb-4">
							¿Prefieres visitarnos?
						</h3>
						<p className="text-muted-foreground mb-6">
							Estamos ubicados en Moquegua, Perú. Contáctanos para coordinar una
							cita y conocer nuestros productos en persona.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild variant="outline">
								<Link href="https://wa.me/51987471074" target="_blank">
									<FaWhatsapp className="w-4 h-4 mr-2" />
									Coordinar Visita
								</Link>
							</Button>
							<Button asChild>
								<Link href="/busqueda">Ver Nuestros Productos</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
