'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useViewMode } from '@/hooks/use-view-mode'
import { ArrowUpDownIcon, Grid3X3Icon, ListIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface SearchToolbarProps {
	totalProducts: number
	priceRange: {
		min: number
		max: number
	}
	sortBy: string
}

export function SearchToolbar({
	totalProducts,
	priceRange,
	sortBy,
}: SearchToolbarProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { viewMode, setViewMode } = useViewMode()

	const getUrlWithParams = useCallback(
		(newParams: Record<string, string>) => {
			const currentParams = new URLSearchParams(searchParams.toString())

			for (const [key, value] of Object.entries(newParams)) {
				if (value) currentParams.set(key, value)
				else currentParams.delete(key)
			}

			return `${pathname}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`
		},
		[searchParams, pathname],
	)

	const handleSortChange = useCallback(
		(value: string) => {
			const newUrl = getUrlWithParams({ orden: value })
			router.push(newUrl)
		},
		[getUrlWithParams, router],
	)

	const handleViewChange = useCallback(
		(view: string) => {
			setViewMode(view as 'grid' | 'list')
		},
		[setViewMode],
	)

	return (
		<Card className="mb-6">
			<CardContent className="p-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span className="font-medium text-foreground">{totalProducts}</span>
						{totalProducts === 1
							? 'producto encontrado'
							: 'productos encontrados'}
						{priceRange.min !== priceRange.max && (
							<>
								<Separator orientation="vertical" className="h-4" />
								<span>
									S/ {priceRange.min.toLocaleString()} - S/{' '}
									{priceRange.max.toLocaleString()}
								</span>
							</>
						)}
					</div>

					<div className="flex items-center gap-3">
						<Select value={sortBy} onValueChange={handleSortChange}>
							<SelectTrigger className="w-40">
								<ArrowUpDownIcon className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Ordenar por" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="relevancia">Relevancia</SelectItem>
								<SelectItem value="precio-asc">
									Precio: Menor a Mayor
								</SelectItem>
								<SelectItem value="precio-desc">
									Precio: Mayor a Menor
								</SelectItem>
								<SelectItem value="nombre">Nombre A-Z</SelectItem>
								<SelectItem value="rating">Mejor Calificados</SelectItem>
								<SelectItem value="ofertas">Ofertas Primero</SelectItem>
							</SelectContent>
						</Select>

						<div className="hidden sm:flex items-center border rounded-md">
							<Button
								variant={viewMode === 'grid' ? 'default' : 'ghost'}
								size="sm"
								className="rounded-r-none"
								onClick={() => handleViewChange('grid')}
							>
								<Grid3X3Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === 'list' ? 'default' : 'ghost'}
								size="sm"
								className="rounded-l-none border-l"
								onClick={() => handleViewChange('list')}
							>
								<ListIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
