import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Category } from '@/types/product'
import {
	ArrowRight,
	Computer,
	Cpu,
	Gamepad2,
	Laptop,
	Monitor,
	Mouse,
} from 'lucide-react'
import Link from 'next/link'

const featuredCategories = [
	{
		name: 'Computadoras',
		slug: 'computadoras',
		description: 'PCs completas para gaming y oficina',
		icon: Computer,
		color: 'from-blue-500 to-blue-600',
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-50 dark:bg-blue-950/30',
		count: '150+ productos',
	},
	{
		name: 'Laptops',
		slug: 'laptops',
		description: 'Portátiles para trabajo y entretenimiento',
		icon: Laptop,
		color: 'from-purple-500 to-purple-600',
		textColor: 'text-purple-600',
		bgColor: 'bg-purple-50 dark:bg-purple-950/30',
		count: '200+ productos',
	},
	{
		name: 'Componentes',
		slug: 'procesadores',
		description: 'Partes y componentes para PC',
		icon: Cpu,
		color: 'from-orange-500 to-orange-600',
		textColor: 'text-orange-600',
		bgColor: 'bg-orange-50 dark:bg-orange-950/30',
		count: '300+ productos',
	},
	{
		name: 'Monitores',
		slug: 'monitores',
		description: 'Pantallas HD, 4K y gaming',
		icon: Monitor,
		color: 'from-green-500 to-green-600',
		textColor: 'text-green-600',
		bgColor: 'bg-green-50 dark:bg-green-950/30',
		count: '80+ productos',
	},
	{
		name: 'Periféricos',
		slug: 'mouses',
		description: 'Mouse, teclados y accesorios',
		icon: Mouse,
		color: 'from-red-500 to-red-600',
		textColor: 'text-red-600',
		bgColor: 'bg-red-50 dark:bg-red-950/30',
		count: '120+ productos',
	},
	{
		name: 'Gaming',
		slug: 'sillas-gamer',
		description: 'Todo para gamers profesionales',
		icon: Gamepad2,
		color: 'from-violet-500 to-violet-600',
		textColor: 'text-violet-600',
		bgColor: 'bg-violet-50 dark:bg-violet-950/30',
		count: '90+ productos',
	},
]

interface CategoriesSectionProps {
	categories?: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
	return (
		<section className="py-16 bg-muted/30">
			<div className="container">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold mb-4">
						Explora por Categorías
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Encuentra exactamente lo que necesitas en nuestras categorías
						especializadas
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{featuredCategories.map((category, index) => (
						<Card
							key={category.slug}
							className="group hover:shadow-lg transition-all duration-300 border-0 bg-background hover:scale-105"
						>
							<CardContent className="p-6">
								<Link href={`/categoria/${category.slug}`} className="block">
									<div className="space-y-4">
										<div
											className={`inline-flex p-4 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}
										>
											<category.icon
												className={`w-8 h-8 ${category.textColor}`}
											/>
										</div>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
													{category.name}
												</h3>
												<ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
											</div>
											<p className="text-muted-foreground text-sm">
												{category.description}
											</p>
											<p className="text-xs font-medium text-primary">
												{category.count}
											</p>
										</div>
									</div>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center">
					<Button variant="outline" size="lg" asChild>
						<Link href="/categorias">
							Ver Todas las Categorías
							<ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
