import { textToSlug } from '@/lib/utils'
import { db } from './index'
import { brands, categories, conditions } from './schema'

const seedData = {
	categories: [
		{
			name: 'Computadoras',
		},
		{
			name: 'Laptops',
		},
		{
			name: 'Impresoras',
		},
		{
			name: 'Sillas Gamer',
		},
		{
			name: 'Monitores',
		},
		{
			name: 'All in One',
		},
		{
			name: 'Proyectores',
		},
		{
			name: 'Tablets',
		},
		{
			name: 'Puntos de venta',
		},

		{
			name: 'Procesadores',
		},
		{
			name: 'Placas Madre',
		},
		{
			name: 'Memorias RAM',
		},
		{
			name: 'Almacenamiento',
		},
		{
			name: 'Tarjetas Gráficas',
		},
		{
			name: 'Cases',
		},
		{
			name: 'Fuentes de poder',
		},
		{
			name: 'Refrigeración líquida',
		},
		{
			name: 'Refrigeración Aire',
		},
		{
			name: 'Pasta térmica',
		},

		{
			name: 'Mouses',
		},
		{
			name: 'Teclados',
		},
		{
			name: 'Audífonos',
		},
		{
			name: 'Parlantes',
		},
		{
			name: 'Webcams',
		},
		{
			name: 'Micrófonos',
		},
		{
			name: 'Mousepad',
		},

		{
			name: 'Red - WiFi',
		},
		{
			name: 'Estabilizadores',
		},
		{
			name: 'UPS',
		},
		{
			name: 'Accesorios PC',
		},
		{
			name: 'Accesorios Laptop',
		},
	],
	marcas: [
		{
			name: '1st PLayer',
		},
		{
			name: 'Acer',
		},
		{
			name: 'AMD',
		},
		{
			name: 'Antryx',
		},
		{
			name: 'Asrock',
		},
		{
			name: 'Asus',
		},
		{
			name: 'Dahua',
		},
		{
			name: 'Dell',
		},
		{
			name: 'Gigabyte',
		},
		{
			name: 'Havit',
		},
		{
			name: 'HP',
		},
		{
			name: 'Intel',
		},
		{
			name: 'Lenovo',
		},
		{
			name: 'Lg',
		},
		{
			name: 'Micronics',
		},
		{
			name: 'MSI',
		},
		{
			name: 'NVIDIA',
		},
		{
			name: 'Patriot',
		},
		{
			name: 'Samsung',
		},
		{
			name: 'Teros',
		},
		{
			name: 'Vulcan',
		},
		{
			name: 'Wacom',
		},
		{
			name: 'Xioami',
		},
		{
			name: 'XPG',
		},
	],
}

const main = async () => {
	console.log('[i] Insertando datos iniciales...')

	await db
		.insert(conditions)
		.values([
			{ id: 'N', name: 'Nuevo' },
			{ id: 'U', name: 'Usado' },
			{ id: 'R', name: 'Reacondicionado' },
		])
		.onConflictDoNothing()

	await db
		.insert(categories)
		.values(
			seedData.categories.map((category) => ({
				id: crypto.randomUUID(),
				name: category.name,
				slug: textToSlug(category.name),
			})),
		)
		.onConflictDoNothing()

	await db
		.insert(brands)
		.values(
			seedData.marcas.map((marca) => ({
				id: crypto.randomUUID(),
				name: marca.name,
				slug: textToSlug(marca.name),
			})),
		)
		.onConflictDoNothing()

	console.log('[+] Datos insertados con éxito')

	await db.$client.end()
	process.exit(0)
}

main().catch((err) => {
	console.error('[!] Error al insertar datos:', err)
	process.exit(1)
})
