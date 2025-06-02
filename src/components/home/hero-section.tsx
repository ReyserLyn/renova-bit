'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import {
	ArrowRight,
	Computer,
	Cpu,
	Laptop,
	Monitor,
	Shield,
	Star,
	Truck,
} from 'lucide-react'
import Link from 'next/link'

const heroSlides = [
	{
		id: 1,
		title: '¡Nueva Colección de Laptops!',
		subtitle: 'Gaming y Profesionales',
		description:
			'Descubre las mejores laptops para trabajo y gaming con la última tecnología Intel y AMD',
		image: '/images/hero/laptops-hero.jpg',
		cta: 'Ver Laptops',
		link: '/categoria/laptops',
		badge: 'Hasta 25% OFF',
		icon: Laptop,
		gradient: 'from-blue-600 to-purple-600',
	},
	{
		id: 2,
		title: 'Componentes de Última Generación',
		subtitle: 'Arma tu PC Ideal',
		description:
			'Procesadores, tarjetas gráficas, RAM y más. Todo lo que necesitas para el setup perfecto',
		image: '/images/hero/components-hero.jpg',
		cta: 'Ver Componentes',
		link: '/categoria/procesadores',
		badge: 'Envío Gratis',
		icon: Cpu,
		gradient: 'from-orange-500 to-red-600',
	},
	{
		id: 3,
		title: 'Monitores Gaming 4K',
		subtitle: 'Experiencia Visual Suprema',
		description:
			'Monitores gaming de alta resolución con tecnología HDR y tasas de refresco ultra rápidas',
		image: '/images/hero/monitors-hero.jpg',
		cta: 'Ver Monitores',
		link: '/categoria/monitores',
		badge: 'Nuevos Modelos',
		icon: Monitor,
		gradient: 'from-green-500 to-teal-600',
	},
	{
		id: 4,
		title: 'Computadoras Completas',
		subtitle: 'Listas para Usar',
		description:
			'PCs armadas y optimizadas para gaming, oficina y diseño. Con garantía completa',
		image: '/images/hero/computers-hero.jpg',
		cta: 'Ver Computadoras',
		link: '/categoria/computadoras',
		badge: '12 Cuotas sin Interés',
		icon: Computer,
		gradient: 'from-violet-500 to-pink-600',
	},
]

const features = [
	{
		icon: Truck,
		title: 'Delivery Gratis',
		description: 'Envío gratuito todos los fines de semana',
	},
	{
		icon: Shield,
		title: 'Garantía Extendida',
		description: 'Hasta 1 año de garantía en todos los productos',
	},
	{
		icon: Star,
		title: 'Calidad Premium',
		description: 'Solo marcas reconocidas y productos originales',
	},
]

export function HeroSection() {
	return (
		<section className="relative">
			<Carousel
				className="w-full"
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 5000,
					}),
				]}
			>
				<CarouselContent>
					{heroSlides.map((slide, index) => (
						<CarouselItem key={slide.id}>
							<div
								className={`relative h-[60vh] lg:h-[70vh] bg-gradient-to-r ${slide.gradient} overflow-hidden`}
							>
								<div className="absolute inset-0 bg-black/20">
									<div
										className="absolute inset-0 opacity-50"
										style={{
											backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
										}}
									/>
								</div>

								<div className="container relative h-full flex items-center">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
										<motion.div
											initial={{ opacity: 0, x: -50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.6, delay: index * 0.1 }}
											className="text-white space-y-6"
										>
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
											>
												<Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1">
													{slide.badge}
												</Badge>
											</motion.div>

											<div className="space-y-2">
												<motion.h1
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{
														duration: 0.6,
														delay: 0.3 + index * 0.1,
													}}
													className="text-4xl lg:text-6xl font-bold leading-tight"
												>
													{slide.title}
												</motion.h1>
												<motion.h2
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{
														duration: 0.6,
														delay: 0.4 + index * 0.1,
													}}
													className="text-xl lg:text-2xl font-medium text-white/90"
												>
													{slide.subtitle}
												</motion.h2>
											</div>

											<motion.p
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
												className="text-lg text-white/80 max-w-lg leading-relaxed"
											>
												{slide.description}
											</motion.p>

											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
												className="flex gap-4"
											>
												<Button
													asChild
													size="lg"
													className="bg-white text-gray-900 hover:bg-white/90 font-semibold group"
												>
													<Link href={slide.link}>
														{slide.cta}
														<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
													</Link>
												</Button>
												<Button
													variant="outline"
													size="lg"
													className="border-white/60 bg-white/5 text-white hover:bg-white/20 hover:border-white/80 backdrop-blur-sm transition-all"
													asChild
												>
													<Link href="/ofertas">Ver Ofertas</Link>
												</Button>
											</motion.div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
											className="hidden lg:flex justify-center items-center"
										>
											<div className="relative">
												<div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
													<slide.icon className="w-24 h-24 text-white" />
												</div>
												<div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
													<Star className="w-6 h-6 text-yellow-300 fill-current" />
												</div>
											</div>
										</motion.div>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-4 lg:left-8 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" />
				<CarouselNext className="right-4 lg:right-8 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" />
			</Carousel>

			<div className="bg-background border-t">
				<div className="container py-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
							>
								<div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
									<feature.icon className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground">
										{feature.title}
									</h3>
									<p className="text-sm text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
