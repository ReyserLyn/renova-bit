import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { HeroSection } from '@/components/home/hero-section'
import {
	CTASection,
	OffersSection,
	WhatsAppSection,
} from '@/components/home/promo-sections'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { getAllCategories } from '@/database/queries/categories'
import {
	getFeaturedProducts,
	getLatestProducts,
} from '@/database/queries/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'RenovaBit - Tu Tienda Tecnológica en Moquegua',
	description:
		'Descubre los mejores productos tecnológicos en Moquegua. Computadoras, laptops, componentes y periféricos con garantía y envío gratis los fines de semana.',
	keywords:
		'tecnología, computadoras, laptops, componentes PC, Moquegua, Perú, gaming, oficina',
	openGraph: {
		title: 'RenovaBit - Tu Tienda Tecnológica en Moquegua',
		description:
			'Descubre los mejores productos tecnológicos en Moquegua. Computadoras, laptops, componentes y periféricos con garantía.',
		type: 'website',
		locale: 'es_PE',
	},
}

export const revalidate = 3600

export default async function HomePage() {
	const [categories, featuredProducts, latestProducts] = await Promise.all([
		getAllCategories(),
		getFeaturedProducts(8),
		getLatestProducts(8),
	])

	return (
		<div className="min-h-screen">
			<HeroSection />

			<CategoriesSection categories={categories} />

			<FeaturedProducts
				products={featuredProducts}
				title="Productos Destacados"
				subtitle="Los productos más populares y mejor valorados por nuestros clientes"
			/>

			<OffersSection />

			<FeaturedProducts
				products={latestProducts}
				title="Últimos Productos"
				subtitle="Las novedades más recientes en tecnología disponibles en nuestra tienda"
				showAll={false}
			/>

			<TestimonialsSection />

			<WhatsAppSection />

			<CTASection />
		</div>
	)
}
