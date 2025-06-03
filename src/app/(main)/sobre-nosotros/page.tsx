import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Award,
	Clock,
	Heart,
	Shield,
	Star,
	Target,
	Truck,
	Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Sobre Nosotros - RenovaBit',
	description:
		'Conoce la historia de RenovaBit, tu tienda de tecnología de confianza en Moquegua. Nuestra misión es democratizar la tecnología en Perú.',
	keywords:
		'RenovaBit, historia, misión, visión, tecnología, Moquegua, empresa peruana',
}

export default function AboutPage() {
	const breadcrumbItems = [{ label: 'Sobre Nosotros', isActive: true }]

	const values = [
		{
			icon: Shield,
			title: 'Confianza',
			description:
				'Productos originales con garantía completa y atención personalizada.',
		},
		{
			icon: Heart,
			title: 'Pasión',
			description:
				'Amamos la tecnología y queremos compartir esa pasión contigo.',
		},
		{
			icon: Target,
			title: 'Excelencia',
			description:
				'Nos esforzamos por ofrecer la mejor calidad en productos y servicio.',
		},
		{
			icon: Users,
			title: 'Cercanía',
			description:
				'Tratamos a cada cliente como parte de nuestra familia tecnológica.',
		},
	]

	const achievements = [
		{
			icon: Star,
			number: '1000+',
			label: 'Clientes Satisfechos',
			description: 'En toda la región de Moquegua',
		},
		{
			icon: Award,
			number: '3+',
			label: 'Años de Experiencia',
			description: 'Sirviendo a la comunidad local',
		},
		{
			icon: Truck,
			number: '500+',
			label: 'Entregas Realizadas',
			description: 'Con delivery gratuito los fines de semana',
		},
		{
			icon: Clock,
			number: '24/7',
			label: 'Soporte Disponible',
			description: 'Atención vía WhatsApp cuando nos necesites',
		},
	]

	const team = [
		{
			name: 'Fundador y CEO',
			role: 'Visionario Tecnológico',
			description:
				'Apasionado por la tecnología desde joven, creó RenovaBit para acercar las mejores soluciones tecnológicas a Moquegua.',
		},
		{
			name: 'Equipo de Ventas',
			role: 'Asesores Especializados',
			description:
				'Nuestro equipo está capacitado para asesorarte en la mejor decisión de compra según tus necesidades.',
		},
		{
			name: 'Soporte Técnico',
			role: 'Expertos en Soluciones',
			description:
				'Técnicos certificados que brindan soporte post-venta y garantizan tu satisfacción.',
		},
	]

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl lg:text-6xl font-bold mb-6">
						Sobre{' '}
						<span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
							RenovaBit
						</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Somos una empresa peruana apasionada por la tecnología, dedicada a
						democratizar el acceso a productos tecnológicos de calidad en
						Moquegua y todo el Perú.
					</p>
				</div>

				{/* Nuestra Historia */}
				<Card className="mb-16">
					<CardContent className="p-8 lg:p-12">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
								<div className="space-y-4 text-muted-foreground">
									<p>
										RenovaBit nació en 2021 con una visión clara:{' '}
										<strong className="text-foreground">
											hacer que la tecnología sea accesible para todos
										</strong>
										. Comenzamos como un pequeño emprendimiento en Moquegua, con
										el sueño de ofrecer productos tecnológicos de calidad a
										precios justos.
									</p>
									<p>
										Desde nuestros inicios, nos hemos enfocado en{' '}
										<strong className="text-foreground">
											construir relaciones duraderas
										</strong>{' '}
										con nuestros clientes, brindando no solo productos
										excepcionales, sino también un servicio personalizado que
										realmente marca la diferencia.
									</p>
									<p>
										Hoy, somos orgullosos de ser la{' '}
										<strong className="text-foreground">
											tienda tecnológica de confianza
										</strong>{' '}
										para cientos de familias y empresas en Moquegua, y
										continuamos creciendo para servir mejor a nuestra comunidad.
									</p>
								</div>
							</div>
							<Card className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30 border-0">
								<CardContent className="p-8">
									<div className="text-center">
										<div className="text-6xl mb-4">🚀</div>
										<h3 className="text-xl font-semibold mb-3">
											Nuestra Misión
										</h3>
										<p className="text-muted-foreground">
											Democratizar la tecnología, ofreciendo productos de
											calidad con atención personalizada, para que cada persona
											y empresa pueda aprovechar al máximo las oportunidades que
											brinda la innovación tecnológica.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>

				{/* Nuestros Valores */}
				<div className="mb-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Los principios que guían cada decisión que tomamos y cada
							interacción que tenemos con nuestros clientes.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{values.map((value) => (
							<Card
								key={value.title}
								className="text-center hover:shadow-lg transition-shadow"
							>
								<CardContent className="p-6">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<value.icon className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-lg font-semibold mb-3">{value.title}</h3>
									<p className="text-sm text-muted-foreground">
										{value.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Logros y Números */}
				<Card className="mb-16 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30 border-0">
					<CardContent className="p-8 lg:p-12">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-4">
								Nuestros Logros en Números
							</h2>
							<p className="text-muted-foreground">
								El crecimiento constante es reflejo de la confianza que
								depositan en nosotros.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{achievements.map((achievement) => (
								<div key={achievement.label} className="text-center">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<achievement.icon className="w-8 h-8 text-primary" />
									</div>
									<div className="text-3xl font-bold text-primary mb-2">
										{achievement.number}
									</div>
									<div className="font-semibold mb-1">{achievement.label}</div>
									<div className="text-sm text-muted-foreground">
										{achievement.description}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Nuestro Equipo */}
				<div className="mb-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Un equipo apasionado y comprometido con brindarte la mejor
							experiencia en tecnología.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{team.map((member) => (
							<Card key={member.name} className="text-center">
								<CardHeader>
									<div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
										<Users className="w-10 h-10 text-primary" />
									</div>
									<CardTitle className="text-lg">{member.name}</CardTitle>
									<p className="text-sm text-primary font-medium">
										{member.role}
									</p>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										{member.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Visión y Futuro */}
				<Card className="mb-16">
					<CardContent className="p-8 lg:p-12 text-center">
						<div className="max-w-3xl mx-auto">
							<div className="text-4xl mb-6">🔮</div>
							<h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
							<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
								Ser la principal referencia tecnológica en el sur del Perú,
								reconocidos por nuestra excelencia en servicio, innovación
								constante y compromiso inquebrantable con el desarrollo
								tecnológico de nuestras comunidades.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
								<div className="p-4 bg-muted/50 rounded-lg">
									<div className="font-semibold mb-2">🌟 Innovación</div>
									<div className="text-muted-foreground">
										Mantenernos a la vanguardia tecnológica
									</div>
								</div>
								<div className="p-4 bg-muted/50 rounded-lg">
									<div className="font-semibold mb-2">🤝 Comunidad</div>
									<div className="text-muted-foreground">
										Contribuir al desarrollo digital local
									</div>
								</div>
								<div className="p-4 bg-muted/50 rounded-lg">
									<div className="font-semibold mb-2">🚀 Crecimiento</div>
									<div className="text-muted-foreground">
										Expandir nuestro alcance responsablemente
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Call to Action */}
				<Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-0">
					<CardContent className="p-8 lg:p-12 text-center">
						<h2 className="text-3xl font-bold mb-4">
							¿Listo para ser parte de nuestra historia?
						</h2>
						<p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
							Únete a nuestra comunidad tecnológica y descubre por qué somos la
							elección favorita en Moquegua para todas las necesidades
							tecnológicas.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="text-primary hover:text-primary"
							>
								<Link href="/busqueda">Explorar Productos</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="text-primary hover:text-primary"
							>
								<Link href="/contacto">Contáctanos</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
