'use client'

import {
	Box,
	Computer,
	CreditCard,
	Laptop,
	type LucideIcon,
	Microchip,
	Mouse,
	PhoneCall,
	Tag,
} from 'lucide-react'
import type { IconType } from 'react-icons/lib'
import { TbBrandAmd } from 'react-icons/tb'

export type navMainItemType = {
	title: string
	icon?: LucideIcon | IconType
	prefixUrl?: string
	isActive?: boolean
	items?: {
		title: string
		url?: string
	}[]
}
export type navSecondaryItemType = {
	name: string
	url: string
	icon: LucideIcon | IconType
}

export type NavOptionsType = {
	navMain: navMainItemType[]
	navSecondary: navSecondaryItemType[]
}

export const navOptions: NavOptionsType = {
	navMain: [
		{
			title: 'Equipos',
			prefixUrl: '/categoria',
			icon: Computer,
			items: [
				{
					title: 'Computadoras',
				},
				{
					title: 'Laptops',
				},
				{
					title: 'Impresoras',
				},
				{
					title: 'Sillas Gamer',
				},
				{
					title: 'Monitores',
				},
				{
					title: 'All in One',
				},
				{
					title: 'Proyectores',
				},
				{
					title: 'Tablets',
				},
				{
					title: 'Puntos de venta',
				},
			],
		},
		{
			title: 'Componentes CPU',
			prefixUrl: '/categoria',
			icon: Microchip,
			items: [
				{
					title: 'Procesadores',
				},
				{
					title: 'Placas Madre',
				},
				{
					title: 'Memorias RAM',
				},
				{
					title: 'Almacenamiento',
				},
				{
					title: 'Tarjetas Gráficas',
				},
				{
					title: 'Cases',
				},
				{
					title: 'Fuentes de poder',
				},
				{
					title: 'Refrigeración líquida',
				},
				{
					title: 'Refrigeración Aire',
				},
				{
					title: 'Pasta térmica',
				},
			],
		},
		{
			title: 'Periféricos',
			prefixUrl: '/categoria',
			icon: Mouse,
			items: [
				{
					title: 'Mouses',
				},
				{
					title: 'Teclados',
				},
				{
					title: 'Audífonos',
				},
				{
					title: 'Parlantes',
				},
				{
					title: 'Webcams',
				},
				{
					title: 'Micrófonos',
				},
				{
					title: 'Mousepad',
				},
			],
		},
		{
			title: 'Productos',
			prefixUrl: '/categoria',
			icon: Box,
			items: [
				{
					title: 'Red - WiFi',
				},
				{
					title: 'Estabilizadores',
				},
				{
					title: 'UPS',
				},
				{
					title: 'Accesorios PC',
				},
				{
					title: 'Accesorios Laptop',
				},
			],
		},
		{
			title: 'Marcas',
			prefixUrl: '/marca',
			icon: TbBrandAmd,
			items: [
				{
					title: '1st PLayer',
				},
				{
					title: 'Acer',
				},
				{
					title: 'AMD',
				},
				{
					title: 'Antryx',
				},
				{
					title: 'Asrock',
				},
				{
					title: 'Asus',
				},
				{
					title: 'Dahua',
				},
				{
					title: 'Dell',
				},
				{
					title: 'Gigabyte',
				},
				{
					title: 'Havit',
				},
				{
					title: 'HP',
				},
				{
					title: 'Intel',
				},
				{
					title: 'Lenovo',
				},
				{
					title: 'Lg',
				},
				{
					title: 'Micronics',
				},
				{
					title: 'MSI',
				},
				{
					title: 'NVIDIA',
				},
				{
					title: 'Patriot',
				},
				{
					title: 'Samsung',
				},
				{
					title: 'Teros',
				},
				{
					title: 'Vulcan',
				},
				{
					title: 'Wacom',
				},
				{
					title: 'Xiaomi',
				},
				{
					title: 'XPG',
				},
			],
		},
		{
			title: 'Laptops',
			prefixUrl: '/categoria/laptops',
			icon: Laptop,
			items: [
				{
					title: 'Todas',
					url: ' ',
				},
				{
					title: 'Laptops Gamer',
					url: 'gamer',
				},
				{
					title: 'Ryzen 3 / Intel i3',
				},
				{
					title: 'Ryzen 5 / Intel i5',
				},
				{
					title: 'Ryzen 7 / Intel i7',
				},
				{
					title: 'Ryzen 9 / Intel i9',
				},
			],
		},
	],
	navSecondary: [
		{
			name: 'Ofertas!',
			url: '/ofertas',
			icon: Tag,
		},
		{
			name: 'Proformas / Ensambles',
			url: '/proforma',
			icon: Box,
		},
		{
			name: 'Formas de pago',
			url: '/formas-de-pago',
			icon: CreditCard,
		},
		{
			name: 'Atención al cliente',
			url: '/atencion-al-cliente',
			icon: PhoneCall,
		},
	],
}
