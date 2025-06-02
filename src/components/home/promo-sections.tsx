import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	ArrowRight,
	Clock,
	Gift,
	MessageCircle,
	Percent,
	Phone,
	Sparkles,
	Zap,
} from 'lucide-react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa6'

export function WhatsAppSection() {
	return (
		<section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<div className="text-white space-y-6">
						<div className="flex items-center gap-3">
							<div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
								<FaWhatsapp className="w-8 h-8" />
							</div>
							<Badge className="bg-white/20 text-white border-white/30">
								Atención Inmediata
							</Badge>
						</div>

						<h2 className="text-3xl lg:text-4xl font-bold">
							¿Necesitas Ayuda?
							<br />
							¡Estamos a un Click!
						</h2>

						<p className="text-lg text-green-50">
							Nuestro equipo técnico especializado te ayudará a encontrar el
							producto perfecto para tus necesidades. Atención personalizada y
							presupuestos al instante.
						</p>

						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5" />
								<span>Respuesta inmediata de 9AM a 8PM</span>
							</div>
							<div className="flex items-center gap-3">
								<Sparkles className="w-5 h-5" />
								<span>Asesoría técnica especializada</span>
							</div>
							<div className="flex items-center gap-3">
								<Gift className="w-5 h-5" />
								<span>Descuentos exclusivos por WhatsApp</span>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								size="lg"
								className="bg-white text-green-600 hover:bg-green-50 font-semibold"
								asChild
							>
								<Link
									href="https://wa.me/51987471074?text=Hola! Me interesa obtener información sobre sus productos"
									target="_blank"
								>
									<FaWhatsapp className="mr-2 w-5 h-5" />
									Chatear Ahora
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="border-white/30 text-white hover:bg-white/10"
								asChild
							>
								<Link href="tel:+51987471074">
									<Phone className="mr-2 w-4 h-4" />
									Llamar Ahora
								</Link>
							</Button>
						</div>
					</div>

					<div className="flex justify-center lg:justify-end">
						<div className="relative">
							<div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
								<FaWhatsapp className="w-32 h-32 text-white" />
							</div>
							<div className="absolute -top-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 animate-bounce">
								<MessageCircle className="w-6 h-6 text-white" />
							</div>
							<div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 animate-pulse">
								<Zap className="w-6 h-6 text-white" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export function OffersSection() {
	const offers = [
		{
			title: 'Delivery Gratis',
			subtitle: 'Fines de Semana',
			description: 'Envío gratuito todos los sábados y domingos en Moquegua',
			icon: Gift,
			color: 'from-blue-500 to-blue-600',
			bgColor: 'bg-blue-50 dark:bg-blue-950/20',
			textColor: 'text-blue-600',
		},
		{
			title: 'Hasta 12 Cuotas',
			subtitle: 'Sin Interés',
			description: 'Paga cómodamente con tarjetas de crédito participantes',
			icon: Percent,
			color: 'from-purple-500 to-purple-600',
			bgColor: 'bg-purple-50 dark:bg-purple-950/20',
			textColor: 'text-purple-600',
		},
		{
			title: 'Garantía Extendida',
			subtitle: 'Hasta 1 Año',
			description: 'Protección completa en todos nuestros productos',
			icon: Sparkles,
			color: 'from-orange-500 to-orange-600',
			bgColor: 'bg-orange-50 dark:bg-orange-950/20',
			textColor: 'text-orange-600',
		},
	]

	return (
		<section className="py-16 bg-muted/30">
			<div className="container">
				<div className="text-center mb-12">
					<Badge className="mb-4">Ofertas Especiales</Badge>
					<h2 className="text-3xl lg:text-4xl font-bold mb-4">
						Beneficios Exclusivos
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Aprovecha nuestras promociones especiales y beneficios únicos en
						RenovaBit
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{offers.map((offer, index) => (
						<Card
							key={offer.title}
							className="border-0 shadow-lg hover:shadow-xl transition-shadow"
						>
							<CardContent className="p-8 text-center">
								<div
									className={`inline-flex p-4 rounded-xl ${offer.bgColor} mb-6`}
								>
									<offer.icon className={`w-8 h-8 ${offer.textColor}`} />
								</div>

								<h3 className="text-xl font-bold mb-2">{offer.title}</h3>
								<p className={`text-lg font-semibold ${offer.textColor} mb-3`}>
									{offer.subtitle}
								</p>
								<p className="text-muted-foreground text-sm">
									{offer.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Button size="lg" asChild>
						<Link href="/ofertas">
							Ver Todas las Ofertas
							<ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export function CTASection() {
	return (
		<section className="py-16 bg-gradient-to-r from-violet-500 to-purple-600">
			<div className="container text-center">
				<div className="max-w-3xl mx-auto text-white space-y-6">
					<Badge className="bg-white/20 text-white border-white/30 mb-4">
						¡No te quedes atrás!
					</Badge>

					<h2 className="text-3xl lg:text-5xl font-bold">
						Renueva tu Tecnología
						<br />
						con los Mejores Precios
					</h2>

					<p className="text-xl text-white/90">
						Encuentra todo lo que necesitas para tu setup perfecto. Productos
						originales, garantía completa y el mejor servicio técnico de
						Moquegua.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
						<Button
							size="lg"
							className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
							asChild
						>
							<Link href="/categoria/computadoras">
								Explorar Productos
								<ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
							asChild
						>
							<Link href="https://wa.me/51987471074" target="_blank">
								<FaWhatsapp className="mr-2 w-4 h-4" />
								Consultar Precio
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
