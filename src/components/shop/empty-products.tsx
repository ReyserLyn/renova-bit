import { EmptyState } from '@/components/ui/empty-state'
import {
	Filter,
	Package,
	Search,
	ShoppingBag,
	Sparkles,
	Tag,
} from 'lucide-react'

export function EmptyCategory({ categoryName }: { categoryName: string }) {
	return (
		<EmptyState
			icon={Package}
			title={`Sin productos en ${categoryName}`}
			description={`Actualmente no tenemos productos disponibles en la categoría "${categoryName}". Te invitamos a explorar nuestras otras categorías.`}
			actionLabel="Ver todas las categorías"
			actionHref="/"
		/>
	)
}

export function EmptyBrand({ brandName }: { brandName: string }) {
	return (
		<EmptyState
			icon={ShoppingBag}
			title={`Sin productos de ${brandName}`}
			description={`No encontramos productos de la marca "${brandName}" en este momento. Explora otras marcas disponibles en nuestro catálogo.`}
			actionLabel="Ver todas las marcas"
			actionHref="/"
		/>
	)
}

export function EmptySearch({ searchTerm }: { searchTerm: string }) {
	return (
		<EmptyState
			icon={Search}
			title="Sin resultados de búsqueda"
			description={`No encontramos productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda o explora nuestras categorías.`}
			actionLabel="Explorar catálogo"
			actionHref="/"
		/>
	)
}

export function EmptyOffers() {
	return (
		<EmptyState
			icon={Tag}
			title="Sin ofertas disponibles"
			description="Actualmente no tenemos ofertas especiales disponibles. ¡Mantente atento porque pronto tendremos nuevas promociones!"
			actionLabel="Ver productos"
			actionHref="/"
		/>
	)
}

export function EmptyFiltered() {
	return (
		<EmptyState
			icon={Filter}
			title="Sin productos con estos filtros"
			description="No encontramos productos que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de búsqueda."
			actionLabel="Ver todos los productos"
			actionHref="/"
		/>
	)
}

export function EmptyFeatured() {
	return (
		<EmptyState
			icon={Sparkles}
			title="Sin productos destacados"
			description="Actualmente no tenemos productos destacados disponibles. Explora nuestro catálogo completo para encontrar lo que buscas."
			actionLabel="Ver catálogo"
			actionHref="/"
		/>
	)
}
