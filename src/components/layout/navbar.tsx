import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Box, Computer, Microchip, Mouse } from 'lucide-react'
import Link from 'next/link'
import type * as React from 'react'
import { Button } from '../ui/button'

const data = {
	navMain: [
		{
			title: 'Equipos',
			url: '#',
			icon: Computer,
			items: [
				{
					title: 'Computadoras',
					url: '#',
				},
				{
					title: 'Laptops',
					url: '#',
				},
				{
					title: 'Impresoras',
					url: '#',
				},
				{
					title: 'Sillas Gamer',
					url: '#',
				},
				{
					title: 'Monitores',
					url: '#',
				},
				{
					title: 'All in One',
					url: '#',
				},
				{
					title: 'Proyectores',
					url: '#',
				},
				{
					title: 'Tablets',
					url: '#',
				},
				{
					title: 'Puntos de venta',
					url: '#',
				},
			],
		},
		{
			title: 'Componentes CPU',
			url: '#',
			icon: Microchip,
			isActive: true,
			items: [
				{
					title: 'Procesadores',
					url: '#',
				},
				{
					title: 'Placas Madre',
					url: '#',
				},
				{
					title: 'Memorias RAM',
					url: '#',
				},
				{
					title: 'Almacenamiento',
					url: '#',
				},
				{
					title: 'Tarjetas Gráficas',
					url: '#',
				},
				{
					title: 'Cases',
					url: '#',
				},
				{
					title: 'Fuentes de poder',
					url: '#',
				},
				{
					title: 'Refrigeración líquida',
					url: '#',
				},
				{
					title: 'Refrigeración Aire',
					url: '#',
				},
				{
					title: 'Pasta térmica',
					url: '#',
				},
			],
		},
		{
			title: 'Periféricos',
			url: '#',
			icon: Mouse,
			items: [
				{
					title: 'Mouses',
					url: '#',
				},
				{
					title: 'Teclados',
					url: '#',
				},
				{
					title: 'Audífonos',
					url: '#',
				},
				{
					title: 'Parlantes',
					url: '#',
				},
				{
					title: 'Webcams',
					url: '#',
				},
				{
					title: 'Micrófonos',
					url: '#',
				},
				{
					title: 'Mousepad',
					url: '#',
				},
			],
		},
		{
			title: 'Productos',
			url: '#',
			icon: Box,
			items: [
				{
					title: 'Red - WiFi',
					url: '#',
				},
				{
					title: 'Estabilizadores',
					url: '#',
				},
				{
					title: 'UPS',
					url: '#',
				},
				{
					title: 'Accesorios PC',
					url: '#',
				},
				{
					title: 'Accesorios Laptop',
					url: '#',
				},
			],
		},
	],
	marcas: [
		{
			title: '1st PLayer',
			url: '#',
		},
		{
			title: 'Acer',
			url: '#',
		},
		{
			title: 'AMD',
			url: '#',
		},
		{
			title: 'Antryx',
			url: '#',
		},
		{
			title: 'Asrock',
			url: '#',
		},
		{
			title: 'Asus',
			url: '#',
		},
		{
			title: 'Dahua',
			url: '#',
		},
		{
			title: 'Dell',
			url: '#',
		},
		{
			title: 'Gigabyte',
			url: '#',
		},
		{
			title: 'Havit',
			url: '#',
		},
		{
			title: 'HP',
			url: '#',
		},
		{
			title: 'Intel',
			url: '#',
		},
		{
			title: 'Lenovo',
			url: '#',
		},
		{
			title: 'Lg',
			url: '#',
		},
		{
			title: 'Micronics',
			url: '#',
		},
		{
			title: 'MSI',
			url: '#',
		},
		{
			title: 'NVIDIA',
			url: '#',
		},
		{
			title: 'Patriot',
			url: '#',
		},
		{
			title: 'Samsung',
			url: '#',
		},
		{
			title: 'Teros',
			url: '#',
		},
		{
			title: 'Vulcan',
			url: '#',
		},
		{
			title: 'wacom',
			url: '#',
		},
		{
			title: 'Xioami',
			url: '#',
		},
		{
			title: 'XPG',
			url: '#',
		},
	],
	laptops: [
		{
			title: 'Todas',
			url: '#',
		},
		{
			title: 'Laptops Gamer',
			url: '#',
		},
		{
			title: 'Ryzen 3 / Intel i3',
			url: '#',
		},
		{
			title: 'Ryzen 5 / Intel i5',
			url: '#',
		},
		{
			title: 'Ryzen 7 / Intel i7',
			url: '#',
		},
		{
			title: 'Ryzen 9 / Intel i9',
			url: '#',
		},
	],
}

export default function Navbar({ className }: { className?: string }) {
	return (
		<div className={cn('container', className)}>
			<div className="flex w-full items-center justify-between py-2">
				<NavigationMenu className="flex-1 justify-start" viewport={false}>
					<NavigationMenuList className="flex-nowrap gap-1">
						<NavigationMenuItem>
							<NavigationMenuTrigger>Productos</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4 md:w-[600px] lg:w-[900px] ">
									{data.navMain.map((component) => (
										<div className="px-2" key={component.title}>
											<h6 className="font-semibold uppercase text-sm text-muted-foreground">
												{component.title}
											</h6>
											<ul className="mt-2.5 grid gap-3">
												{component.items.map((item) => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.url}
													/>
												))}
											</ul>
										</div>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Marcas</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div className="pl-4">
									<h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">
										Marcas
									</h6>
									<ul className="mt-2.5 grid w-[200px] gap-3 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
										{data.marcas.map((item) => (
											<ListItem
												key={item.title}
												title={item.title}
												href={item.url}
											/>
										))}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Laptops</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div>
									<h6 className="font-semibold uppercase text-sm text-muted-foreground">
										Laptops
									</h6>
									<ul className="mt-2.5 grid w-[170px] gap-1">
										{data.laptops.map((item) => (
											<ListItem
												key={item.title}
												title={item.title}
												href={item.url}
											/>
										))}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu viewport={false} className="flex-1 justify-end">
					<NavigationMenuList className="flex items-center gap-5">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button asChild className="hover:bg-green-200">
									<Link href="/proformas">Proformas</Link>
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button asChild className="hover:bg-amber-200">
									<Link href="/ofertas">Ofertas!</Link>
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}

function ListItem({
	className,
	title,
	href,
	...props
}: React.ComponentPropsWithoutRef<'a'> & { href: string }) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="tracking-tight leading-none flex items-center gap-2">
						{title}
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
