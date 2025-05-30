import type * as React from 'react'

import AuthButton from '@/components/auth/auth-button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import {
	Box,
	Computer,
	CreditCard,
	Laptop,
	Microchip,
	Mouse,
	PhoneCall,
	Tag,
} from 'lucide-react'
import { TbBrandAmd } from 'react-icons/tb'
import { SidebarNavMain } from './sidebar-nav-main'
import { SidebarNavSecondary } from './sidebar-nav-secondary'

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
		{
			title: 'Laptops',
			url: '#',
			icon: Laptop,
			items: [
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
		},
		{
			title: 'Marcas',
			url: '#',
			icon: TbBrandAmd,
			items: [
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
		},
	],
	navSecondary: [
		{
			name: 'Ofertas!',
			url: '#',
			icon: Tag,
		},
		{
			name: 'Proformas / Ensambles',
			url: '#',
			icon: Box,
		},
		{
			name: 'Formas de pago',
			url: '#',
			icon: CreditCard,
		},
		{
			name: 'Atención al cliente',
			url: '#',
			icon: PhoneCall,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h1 className="text-2xl font-bold px-4 py-2">RenovaBit</h1>
				<hr className="border-t border-border mx-2 -mt-px" />
			</SidebarHeader>

			<SidebarContent>
				<SidebarNavMain items={data.navMain} />
				<SidebarNavSecondary projects={data.navSecondary} />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<AuthButton />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
