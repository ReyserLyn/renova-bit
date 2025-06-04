'use client'

import { useQuery } from '@tanstack/react-query'

interface UseProductsOptions {
	categories?: string[]
	search?: string
	brands?: string[]
	minPrice?: number
	maxPrice?: number
	onlyInStock?: boolean
}

interface Product {
	id: string
	name: string
	slug: string
	image_url: string
	short_description: string
	price: string
	price_web: string
	stock: number
	brand: {
		id: string
		name: string
		slug: string
	}
	category: {
		id: string
		name: string
		slug: string
	}
	rating?: string
}

// Datos de ejemplo hasta que se implemente la API real
const mockProducts: Product[] = [
	// CPUs
	{
		id: '1',
		name: 'AMD Ryzen 5 5600X',
		slug: 'amd-ryzen-5-5600x',
		image_url: 'https://picsum.photos/200/200?random=1',
		short_description: 'Procesador AMD Ryzen 5 5600X, 6 núcleos, 12 hilos',
		price: '899.00',
		price_web: '799.00',
		stock: 15,
		brand: { id: '1', name: 'AMD', slug: 'amd' },
		category: { id: '1', name: 'Procesadores', slug: 'procesadores' },
		rating: '4.8',
	},
	{
		id: '2',
		name: 'Intel Core i5-12400F',
		slug: 'intel-core-i5-12400f',
		image_url: 'https://picsum.photos/200/200?random=2',
		short_description: 'Procesador Intel Core i5-12400F, 6 núcleos, 12 hilos',
		price: '759.00',
		price_web: '699.00',
		stock: 8,
		brand: { id: '2', name: 'Intel', slug: 'intel' },
		category: { id: '1', name: 'Procesadores', slug: 'procesadores' },
		rating: '4.7',
	},
	{
		id: '3',
		name: 'AMD Ryzen 7 5800X3D',
		slug: 'amd-ryzen-7-5800x3d',
		image_url: 'https://picsum.photos/200/200?random=3',
		short_description: 'Procesador AMD Ryzen 7 5800X3D Gaming, 8 núcleos',
		price: '1299.00',
		price_web: '1199.00',
		stock: 6,
		brand: { id: '1', name: 'AMD', slug: 'amd' },
		category: { id: '1', name: 'Procesadores', slug: 'procesadores' },
		rating: '4.9',
	},
	// Placas madre
	{
		id: '4',
		name: 'ASUS ROG STRIX B550-F GAMING',
		slug: 'asus-rog-strix-b550-f',
		image_url: 'https://picsum.photos/200/200?random=4',
		short_description: 'Placa madre ASUS ROG STRIX B550-F GAMING (WiFi)',
		price: '699.00',
		price_web: '649.00',
		stock: 5,
		brand: { id: '3', name: 'ASUS', slug: 'asus' },
		category: { id: '2', name: 'Placas Madre', slug: 'placas-madre' },
		rating: '4.6',
	},
	{
		id: '5',
		name: 'MSI MAG B550 TOMAHAWK',
		slug: 'msi-mag-b550-tomahawk',
		image_url: 'https://picsum.photos/200/200?random=5',
		short_description: 'Placa madre MSI MAG B550 TOMAHAWK',
		price: '599.00',
		price_web: '549.00',
		stock: 10,
		brand: { id: '4', name: 'MSI', slug: 'msi' },
		category: { id: '2', name: 'Placas Madre', slug: 'placas-madre' },
		rating: '4.5',
	},
	{
		id: '6',
		name: 'Gigabyte B550 AORUS PRO',
		slug: 'gigabyte-b550-aorus-pro',
		image_url: 'https://picsum.photos/200/200?random=6',
		short_description: 'Placa madre Gigabyte B550 AORUS PRO WiFi',
		price: '749.00',
		price_web: '689.00',
		stock: 7,
		brand: { id: '5', name: 'Gigabyte', slug: 'gigabyte' },
		category: { id: '2', name: 'Placas Madre', slug: 'placas-madre' },
		rating: '4.4',
	},
	// RAMs
	{
		id: '7',
		name: 'Corsair Vengeance LPX 16GB DDR4-3200',
		slug: 'corsair-vengeance-lpx-16gb',
		image_url: 'https://picsum.photos/200/200?random=7',
		short_description: 'Memoria RAM Corsair Vengeance LPX 16GB DDR4-3200',
		price: '399.00',
		price_web: '359.00',
		stock: 20,
		brand: { id: '6', name: 'Corsair', slug: 'corsair' },
		category: { id: '3', name: 'Memorias RAM', slug: 'memorias-ram' },
		rating: '4.7',
	},
	{
		id: '8',
		name: 'G.Skill Ripjaws V 32GB DDR4-3600',
		slug: 'gskill-ripjaws-v-32gb',
		image_url: 'https://picsum.photos/200/200?random=8',
		short_description: 'Memoria RAM G.Skill Ripjaws V 32GB DDR4-3600',
		price: '799.00',
		price_web: '729.00',
		stock: 12,
		brand: { id: '7', name: 'G.Skill', slug: 'gskill' },
		category: { id: '3', name: 'Memorias RAM', slug: 'memorias-ram' },
		rating: '4.8',
	},
	{
		id: '9',
		name: 'Kingston Fury Beast 8GB DDR4-3200',
		slug: 'kingston-fury-beast-8gb',
		image_url: 'https://picsum.photos/200/200?random=9',
		short_description: 'Memoria RAM Kingston Fury Beast 8GB DDR4-3200',
		price: '199.00',
		price_web: '179.00',
		stock: 30,
		brand: { id: '8', name: 'Kingston', slug: 'kingston' },
		category: { id: '3', name: 'Memorias RAM', slug: 'memorias-ram' },
		rating: '4.5',
	},
	// Almacenamiento
	{
		id: '10',
		name: 'Samsung 980 PRO 1TB NVMe SSD',
		slug: 'samsung-980-pro-1tb',
		image_url: 'https://picsum.photos/200/200?random=10',
		short_description: 'SSD Samsung 980 PRO 1TB NVMe PCIe 4.0',
		price: '599.00',
		price_web: '549.00',
		stock: 18,
		brand: { id: '9', name: 'Samsung', slug: 'samsung' },
		category: { id: '4', name: 'Almacenamiento', slug: 'almacenamiento' },
		rating: '4.9',
	},
	{
		id: '11',
		name: 'WD Black SN770 500GB NVMe',
		slug: 'wd-black-sn770-500gb',
		image_url: 'https://picsum.photos/200/200?random=11',
		short_description: 'SSD WD Black SN770 500GB NVMe PCIe 4.0',
		price: '299.00',
		price_web: '269.00',
		stock: 25,
		brand: { id: '10', name: 'Western Digital', slug: 'wd' },
		category: { id: '4', name: 'Almacenamiento', slug: 'almacenamiento' },
		rating: '4.6',
	},
	{
		id: '12',
		name: 'Seagate Barracuda 2TB HDD',
		slug: 'seagate-barracuda-2tb',
		image_url: 'https://picsum.photos/200/200?random=12',
		short_description: 'Disco duro Seagate Barracuda 2TB 7200RPM',
		price: '349.00',
		price_web: '299.00',
		stock: 15,
		brand: { id: '11', name: 'Seagate', slug: 'seagate' },
		category: { id: '4', name: 'Almacenamiento', slug: 'almacenamiento' },
		rating: '4.3',
	},
	// Cases
	{
		id: '13',
		name: 'NZXT H510 Elite',
		slug: 'nzxt-h510-elite',
		image_url: 'https://picsum.photos/200/200?random=13',
		short_description: 'Case NZXT H510 Elite con panel de vidrio templado',
		price: '699.00',
		price_web: '629.00',
		stock: 7,
		brand: { id: '12', name: 'NZXT', slug: 'nzxt' },
		category: { id: '5', name: 'Cases', slug: 'cases' },
		rating: '4.7',
	},
	{
		id: '14',
		name: 'Corsair 4000D Airflow',
		slug: 'corsair-4000d-airflow',
		image_url: 'https://picsum.photos/200/200?random=14',
		short_description: 'Case Corsair 4000D Airflow Mid-Tower',
		price: '499.00',
		price_web: '449.00',
		stock: 12,
		brand: { id: '6', name: 'Corsair', slug: 'corsair' },
		category: { id: '5', name: 'Cases', slug: 'cases' },
		rating: '4.8',
	},
	// Fuentes
	{
		id: '15',
		name: 'Corsair RM750x 750W 80+ Gold',
		slug: 'corsair-rm750x-750w',
		image_url: 'https://picsum.photos/200/200?random=15',
		short_description: 'Fuente Corsair RM750x 750W 80+ Gold Modular',
		price: '599.00',
		price_web: '539.00',
		stock: 14,
		brand: { id: '6', name: 'Corsair', slug: 'corsair' },
		category: { id: '6', name: 'Fuentes de Poder', slug: 'fuentes-de-poder' },
		rating: '4.8',
	},
	{
		id: '16',
		name: 'EVGA SuperNOVA 650 G5',
		slug: 'evga-supernova-650-g5',
		image_url: 'https://picsum.photos/200/200?random=16',
		short_description: 'Fuente EVGA SuperNOVA 650W 80+ Gold',
		price: '449.00',
		price_web: '399.00',
		stock: 9,
		brand: { id: '13', name: 'EVGA', slug: 'evga' },
		category: { id: '6', name: 'Fuentes de Poder', slug: 'fuentes-de-poder' },
		rating: '4.7',
	},
	// Refrigeración
	{
		id: '17',
		name: 'Corsair H100i RGB PLATINUM',
		slug: 'corsair-h100i-rgb-platinum',
		image_url: 'https://picsum.photos/200/200?random=17',
		short_description: 'Refrigeración líquida Corsair H100i RGB PLATINUM',
		price: '699.00',
		price_web: '629.00',
		stock: 8,
		brand: { id: '6', name: 'Corsair', slug: 'corsair' },
		category: {
			id: '7',
			name: 'Refrigeración Líquida',
			slug: 'refrigeración-líquida',
		},
		rating: '4.6',
	},
	{
		id: '18',
		name: 'Noctua NH-D15',
		slug: 'noctua-nh-d15',
		image_url: 'https://picsum.photos/200/200?random=18',
		short_description: 'Cooler Noctua NH-D15 Dual Tower',
		price: '399.00',
		price_web: '359.00',
		stock: 11,
		brand: { id: '14', name: 'Noctua', slug: 'noctua' },
		category: {
			id: '8',
			name: 'Refrigeración Aire',
			slug: 'refrigeración-aire',
		},
		rating: '4.9',
	},
	// Periféricos - Mouse
	{
		id: '19',
		name: 'Logitech G502 HERO',
		slug: 'logitech-g502-hero',
		image_url: 'https://picsum.photos/200/200?random=19',
		short_description: 'Mouse Gaming Logitech G502 HERO 25K DPI',
		price: '399.00',
		price_web: '349.00',
		stock: 30,
		brand: { id: '15', name: 'Logitech', slug: 'logitech' },
		category: { id: '9', name: 'Mouses', slug: 'mouses' },
		rating: '4.8',
	},
	{
		id: '20',
		name: 'Razer DeathAdder V3',
		slug: 'razer-deathadder-v3',
		image_url: 'https://picsum.photos/200/200?random=20',
		short_description: 'Mouse Gaming Razer DeathAdder V3',
		price: '349.00',
		price_web: '299.00',
		stock: 22,
		brand: { id: '16', name: 'Razer', slug: 'razer' },
		category: { id: '9', name: 'Mouses', slug: 'mouses' },
		rating: '4.7',
	},
	// Teclados
	{
		id: '21',
		name: 'Corsair K70 RGB MK.2',
		slug: 'corsair-k70-rgb-mk2',
		image_url: 'https://picsum.photos/200/200?random=21',
		short_description: 'Teclado Mecánico Corsair K70 RGB MK.2',
		price: '899.00',
		price_web: '799.00',
		stock: 6,
		brand: { id: '6', name: 'Corsair', slug: 'corsair' },
		category: { id: '10', name: 'Teclados', slug: 'teclados' },
		rating: '4.7',
	},
	{
		id: '22',
		name: 'Logitech G915 TKL',
		slug: 'logitech-g915-tkl',
		image_url: 'https://picsum.photos/200/200?random=22',
		short_description: 'Teclado Mecánico Logitech G915 TKL',
		price: '1199.00',
		price_web: '1099.00',
		stock: 4,
		brand: { id: '15', name: 'Logitech', slug: 'logitech' },
		category: { id: '10', name: 'Teclados', slug: 'teclados' },
		rating: '4.8',
	},
	// Audio
	{
		id: '23',
		name: 'HyperX Cloud II',
		slug: 'hyperx-cloud-ii',
		image_url: 'https://picsum.photos/200/200?random=23',
		short_description: 'Audífonos Gaming HyperX Cloud II 7.1',
		price: '499.00',
		price_web: '449.00',
		stock: 22,
		brand: { id: '17', name: 'HyperX', slug: 'hyperx' },
		category: { id: '11', name: 'Audífonos', slug: 'audífonos' },
		rating: '4.6',
	},
	{
		id: '24',
		name: 'Logitech Z623 2.1',
		slug: 'logitech-z623-21',
		image_url: 'https://picsum.photos/200/200?random=24',
		short_description: 'Parlantes Logitech Z623 2.1 400W THX',
		price: '799.00',
		price_web: '719.00',
		stock: 8,
		brand: { id: '15', name: 'Logitech', slug: 'logitech' },
		category: { id: '12', name: 'Parlantes', slug: 'parlantes' },
		rating: '4.5',
	},
	// Monitores
	{
		id: '25',
		name: 'ASUS TUF Gaming VG27AQ',
		slug: 'asus-tuf-vg27aq',
		image_url: 'https://picsum.photos/200/200?random=25',
		short_description: 'Monitor ASUS TUF Gaming 27" 1440p 165Hz IPS',
		price: '1499.00',
		price_web: '1349.00',
		stock: 8,
		brand: { id: '3', name: 'ASUS', slug: 'asus' },
		category: { id: '13', name: 'Monitores', slug: 'monitores' },
		rating: '4.8',
	},
	{
		id: '26',
		name: 'Samsung Odyssey G5 27"',
		slug: 'samsung-odyssey-g5-27',
		image_url: 'https://picsum.photos/200/200?random=26',
		short_description: 'Monitor Samsung Odyssey G5 27" 1440p 144Hz Curvo',
		price: '1299.00',
		price_web: '1199.00',
		stock: 5,
		brand: { id: '9', name: 'Samsung', slug: 'samsung' },
		category: { id: '13', name: 'Monitores', slug: 'monitores' },
		rating: '4.7',
	},
]

async function getAllProducts(
	options: UseProductsOptions = {},
): Promise<Product[]> {
	// Simulamos una llamada a la API
	return new Promise((resolve) => {
		setTimeout(() => {
			let filtered = [...mockProducts]

			// Filtrar por categorías
			if (options.categories && options.categories.length > 0) {
				filtered = filtered.filter((product) =>
					options.categories!.some(
						(cat) =>
							product.category.slug.includes(cat) ||
							product.category.name.toLowerCase().includes(cat.toLowerCase()),
					),
				)
			}

			// Filtrar por búsqueda
			if (options.search) {
				const searchLower = options.search.toLowerCase()
				filtered = filtered.filter(
					(product) =>
						product.name.toLowerCase().includes(searchLower) ||
						product.brand.name.toLowerCase().includes(searchLower) ||
						product.short_description.toLowerCase().includes(searchLower),
				)
			}

			// Filtrar por stock
			if (options.onlyInStock) {
				filtered = filtered.filter((product) => product.stock > 0)
			}

			resolve(filtered)
		}, 300) // Simular delay de red
	})
}

export function useProducts(options: UseProductsOptions = {}) {
	return useQuery({
		queryKey: ['products', options],
		queryFn: () => getAllProducts(options),
		staleTime: 5 * 60 * 1000, // 5 minutos
		gcTime: 10 * 60 * 1000, // 10 minutos
	})
}
