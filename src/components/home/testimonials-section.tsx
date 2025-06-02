import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'

const testimonials = [
	{
		id: 1,
		name: 'Carlos Mendoza',
		role: 'Gamer Profesional',
		content:
			'Compré mi setup gaming completo en RenovaBit. Excelente atención, productos originales y el mejor precio de Moquegua. ¡Totalmente recomendado!',
		rating: 5,
		verified: true,
		product: 'PC Gaming RTX 4070',
	},
	{
		id: 2,
		name: 'María Fernández',
		role: 'Diseñadora Gráfica',
		content:
			'Necesitaba una laptop potente para mi trabajo y el equipo de RenovaBit me asesoró perfectamente. El servicio técnico es excepcional.',
		rating: 5,
		verified: true,
		product: 'MacBook Pro M3',
	},
	{
		id: 3,
		name: 'José Quispe',
		role: 'Estudiante de Ingeniería',
		content:
			'Armé mi primera PC con la ayuda de RenovaBit. Me explicaron cada componente y me dieron el mejor precio. Garantía cumplida al 100%.',
		rating: 5,
		verified: true,
		product: 'Componentes PC',
	},
	{
		id: 4,
		name: 'Ana Lucia Torres',
		role: 'Emprendedora',
		content:
			'Equipé toda mi oficina con RenovaBit. Desde computadoras hasta monitores, todo de excelente calidad. El delivery fue súper rápido.',
		rating: 5,
		verified: true,
		product: 'Equipamiento Oficina',
	},
	{
		id: 5,
		name: 'Roberto Silva',
		role: 'Contador',
		content:
			'Mi laptop antigua se malogró y en RenovaBit me consiguieron el reemplazo perfecto en tiempo récord. Atención por WhatsApp impecable.',
		rating: 5,
		verified: true,
		product: 'Laptop Lenovo',
	},
	{
		id: 6,
		name: 'Claudia Morales',
		role: 'Fotografa',
		content:
			'Los accesorios y periféricos que compré superaron mis expectativas. Calidad premium a precios justos. RenovaBit es mi tienda de confianza.',
		rating: 5,
		verified: true,
		product: 'Monitor 4K + Accesorios',
	},
]

export function TestimonialsSection() {
	return (
		<section className="py-16 bg-background">
			<div className="container">
				<div className="text-center mb-12">
					<Badge className="mb-4">Testimonios Reales</Badge>
					<h2 className="text-3xl lg:text-4xl font-bold mb-4">
						Lo que Dicen Nuestros Clientes
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Miles de clientes satisfechos confían en RenovaBit para sus
						necesidades tecnológicas
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{testimonials.map((testimonial) => (
						<Card
							key={testimonial.id}
							className="relative overflow-hidden group hover:shadow-lg transition-shadow"
						>
							<CardContent className="p-6">
								<div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
									<Quote className="w-8 h-8" />
								</div>

								<div className="flex items-center gap-1 mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star
											key={`${testimonial.id}-star-${i}`}
											className="w-4 h-4 text-yellow-500 fill-current"
										/>
									))}
								</div>

								<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
									"{testimonial.content}"
								</p>

								<div className="mb-4">
									<Badge variant="outline" className="text-xs">
										{testimonial.product}
									</Badge>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<div className="flex items-center gap-2">
											<h4 className="font-semibold text-sm">
												{testimonial.name}
											</h4>
											{testimonial.verified && (
												<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
													<div className="w-2 h-2 bg-white rounded-full" />
												</div>
											)}
										</div>
										<p className="text-xs text-muted-foreground">
											{testimonial.role}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-12 text-center">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="space-y-2">
							<div className="text-2xl font-bold text-primary">500+</div>
							<div className="text-sm text-muted-foreground">
								Clientes Satisfechos
							</div>
						</div>
						<div className="space-y-2">
							<div className="text-2xl font-bold text-primary">1000+</div>
							<div className="text-sm text-muted-foreground">
								Productos Vendidos
							</div>
						</div>
						<div className="space-y-2">
							<div className="text-2xl font-bold text-primary">4.9★</div>
							<div className="text-sm text-muted-foreground">
								Calificación Promedio
							</div>
						</div>
						<div className="space-y-2">
							<div className="text-2xl font-bold text-primary">3 Años</div>
							<div className="text-sm text-muted-foreground">En el Mercado</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
