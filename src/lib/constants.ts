'use client'

import {
	Box,
	Computer,
	CreditCard,
	FileText,
	HelpCircle,
	Info,
	Laptop,
	type LucideIcon,
	MessageCircle,
	Microchip,
	Mouse,
	Shield,
	Tag,
	Truck,
	Users,
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
	category?: 'tienda' | 'servicio' | 'empresa' | 'legal'
	description?: string
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
		// Tienda y Servicios
		{
			name: 'Ofertas!',
			url: '/ofertas',
			icon: Tag,
			category: 'tienda',
			description: 'Mejores descuentos y promociones',
		},
		{
			name: 'Proformas',
			url: '/proforma',
			icon: Box,
			category: 'tienda',
			description: 'Cotizaciones y ensambles personalizados',
		},
		{
			name: 'Formas de Pago',
			url: '/formas-de-pago',
			icon: CreditCard,
			category: 'servicio',
			description: 'Métodos de pago disponibles',
		},
		{
			name: 'Envíos',
			url: '/politica-envios',
			icon: Truck,
			category: 'servicio',
			description: 'Delivery gratis fines de semana',
		},
		{
			name: 'Devoluciones',
			url: '/politica-devoluciones',
			icon: Shield,
			category: 'servicio',
			description: 'Garantías y política de cambios',
		},

		// Empresa y Contacto
		{
			name: 'Sobre Nosotros',
			url: '/sobre-nosotros',
			icon: Users,
			category: 'empresa',
			description: 'Conoce nuestra historia y misión',
		},
		{
			name: 'Contacto',
			url: '/contacto',
			icon: MessageCircle,
			category: 'empresa',
			description: 'Atención al cliente y soporte técnico',
		},
		{
			name: 'Ayuda',
			url: '/contacto',
			icon: HelpCircle,
			category: 'servicio',
			description: 'Centro de ayuda y soporte',
		},

		// Legal y Políticas
		{
			name: 'Términos y Condiciones',
			url: '/terminos-condiciones',
			icon: FileText,
			category: 'legal',
			description: 'Condiciones de uso y compra',
		},
		{
			name: 'Política de Privacidad',
			url: '/politica-privacidad',
			icon: Shield,
			category: 'legal',
			description: 'Protección de datos personales',
		},
		{
			name: 'Información Legal',
			url: '/terminos-condiciones',
			icon: Info,
			category: 'legal',
			description: 'Información legal y normativas',
		},
	],
}

// Función helper para filtrar por categoría
export const getNavItemsByCategory = (
	category: navSecondaryItemType['category'],
) => {
	return navOptions.navSecondary.filter((item) => item.category === category)
}

// Función helper para obtener todas las páginas legales
export const getLegalPages = () => {
	return [
		{
			name: 'Términos y Condiciones',
			url: '/terminos-condiciones',
			description: 'Condiciones de uso del sitio web y compra de productos',
		},
		{
			name: 'Política de Privacidad',
			url: '/politica-privacidad',
			description: 'Cómo protegemos y utilizamos tus datos personales',
		},
		{
			name: 'Política de Envíos',
			url: '/politica-envios',
			description: 'Información sobre entregas y delivery gratuito',
		},
		{
			name: 'Política de Devoluciones',
			url: '/politica-devoluciones',
			description: 'Garantías, cambios y servicio post-venta',
		},
	]
}
