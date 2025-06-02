import { createProduct } from '@/actions/products'
import { createInterface } from 'node:readline'

// Colores para la consola
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	gray: '\x1b[90m',
}

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
})

function colorize(text: string, color: keyof typeof colors): string {
	return `${colors[color]}${text}${colors.reset}`
}

function printHeader() {
	console.clear()
	console.log(
		colorize(
			'═══════════════════════════════════════════════════════════════',
			'cyan',
		),
	)
	console.log(
		colorize('                🚀  IMPORTAR PRODUCTOS MASIVAMENTE', 'bright'),
	)
	console.log(colorize('                      RenovaBit - Moquegua', 'gray'))
	console.log(
		colorize(
			'═══════════════════════════════════════════════════════════════',
			'cyan',
		),
	)
	console.log()
}

function question(prompt: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(`${colorize('❓', 'yellow')} ${prompt}`, resolve)
	})
}

// Descripción larga por defecto para productos
const DEFAULT_LONG_DESCRIPTION =
	'La memoria RAM (Memoria de Acceso Aleatorio) es un componente esencial en cualquier sistema informático, encargado de almacenar temporalmente los datos y programas que están siendo utilizados por el procesador. Su principal característica es la velocidad, ya que permite acceder de forma casi instantánea a la información que contiene, lo que mejora significativamente el rendimiento del sistema. A diferencia del almacenamiento permanente, como discos duros o SSDs, la RAM es volátil, lo que significa que pierde toda su información al apagar el equipo.'

// CONFIGURACIÓN: Edita esta categoría según los productos que estés importando
const CATEGORY_NAME = 'Placa Madre' // ← CAMBIA ESTO por: "Monitores", "Accesorios", "Laptops", etc.

// Aquí pega tu array de productos scraped
const SCRAPED_PRODUCTS = [
	{
		id: '7031',
		title: 'MBB, A520M ROG GAMING X',
		price: 198,
		normalPrice: 200,
		image: 'https://rematazo.pe/fotos/7031.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7031',
	},
	{
		id: '7895',
		title: 'MBB,GIGABYTE, A520M K V2 AM4',
		price: 218,
		normalPrice: 220,
		image: 'https://rematazo.pe/fotos/7895.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7895',
	},
	{
		id: '7732',
		title: 'MBB, BIOSTAR, H610MHP DDR4 LGA 1700',
		price: 257,
		normalPrice: 260,
		image: 'https://rematazo.pe/fotos/7732.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7732',
	},
	{
		id: '8221',
		title: 'MBB, CGMS, H610 X DDR5',
		price: 272,
		normalPrice: 275,
		image: 'https://rematazo.pe/fotos/8221.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8221',
	},
	{
		id: '8282',
		title: 'MBB, GIGABYTE, H610M-K S/V/L DDR4',
		price: 282,
		normalPrice: 285,
		image: 'https://rematazo.pe/fotos/8282.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8282',
	},
	{
		id: '6930',
		title: 'MBB, MSI, A620M.E SVL DDR5 AM5',
		price: 304,
		normalPrice: 307,
		image: 'https://rematazo.pe/fotos/6930.png',
		stock: '5',
		url: 'https://rematazo.pe/detalleprod.php?prod=6930',
	},
	{
		id: '7942',
		title: 'MBB, MSI, B650M-B DDR5 AM5',
		price: 315,
		normalPrice: 318,
		image: 'https://rematazo.pe/fotos/7942.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7942',
	},
	{
		id: '7842',
		title: 'MBB, MSI, B550M-A PRO SVL AM4 DDR4',
		price: 317,
		normalPrice: 320,
		image: 'https://rematazo.pe/fotos/7842.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7842',
	},
	{
		id: '8216',
		title: 'MBB, GIGABYTE, B550M-K DDR4 AM4',
		price: 322,
		normalPrice: 325,
		image: 'https://rematazo.pe/fotos/8216.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8216',
	},
	{
		id: '7927',
		title: 'MBB, ASROCK, A620M-HDV/M.2 4.0',
		price: 332,
		normalPrice: 335,
		image: 'https://rematazo.pe/fotos/7927.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7927',
	},
	{
		id: '8197',
		title: 'MBB, ASROCK, H610M-HDV/AC DDR4',
		price: 348,
		normalPrice: 352,
		image: 'https://rematazo.pe/fotos/8197.png',
		stock: '6',
		url: 'https://rematazo.pe/detalleprod.php?prod=8197',
	},
	{
		id: '7336',
		title: 'MBB, MSI, PRO B760M-E S/V/L DDR4 LGA 1700',
		price: 365,
		normalPrice: 369,
		image: 'https://rematazo.pe/fotos/7336.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7336',
	},
	{
		id: '8100',
		title: 'MBB, GIGABYTE, B760M-K DDR4 INTEL',
		price: 386,
		normalPrice: 390,
		image: 'https://rematazo.pe/fotos/8100.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8100',
	},
	{
		id: '6415',
		title: 'MBB, MSI, B760M -P DDR4 LGA1700 PCIe 4.0',
		price: 415,
		normalPrice: 419,
		image: 'https://rematazo.pe/fotos/6415.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=6415',
	},
	{
		id: '8022',
		title: 'MBB, GIGABYTE, B760M D3HP S/V/L DDR4',
		price: 425,
		normalPrice: 429,
		image: 'https://rematazo.pe/fotos/8022.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8022',
	},
	{
		id: '7920',
		title: 'MBB, GIGABYTE, B650M-D3HP S/V/L DDR5',
		price: 435,
		normalPrice: 439,
		image: 'https://rematazo.pe/fotos/7920.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7920',
	},
	{
		id: '7141',
		title: 'MBB, MSI, PRO B650M-P SVL DDR5',
		price: 450,
		normalPrice: 455,
		image: 'https://rematazo.pe/fotos/7141.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7141',
	},
	{
		id: '8630',
		title: 'MBB, GIGABYTE, B760M GAMING PLUS WIFI DDR4',
		price: 470,
		normalPrice: 475,
		image: 'https://rematazo.pe/fotos/8630.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8630',
	},
	{
		id: '8220',
		title: 'MBB, GIGABYTE, B760M -D3HP WIFI DDR5',
		price: 494,
		normalPrice: 499,
		image: 'https://rematazo.pe/fotos/8220.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8220',
	},
	{
		id: '8392',
		title: 'MBB,  GIGABYTE, B860M D3HP DDR5 4DIMM',
		price: 494,
		normalPrice: 499,
		image: 'https://rematazo.pe/fotos/8392.png',
		stock: '5',
		url: 'https://rematazo.pe/detalleprod.php?prod=8392',
	},
	{
		id: '7296',
		title: 'MBB, MSI, PRO B760M- P LGA1700 DDR5',
		price: 500,
		normalPrice: 505,
		image: 'https://rematazo.pe/fotos/7296.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7296',
	},
	{
		id: '4311',
		title: 'MBB, MSI, B550 GAMING PLUS MPG',
		price: 648,
		normalPrice: 655,
		image: 'https://rematazo.pe/fotos/4311.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=4311',
	},
	{
		id: '5361',
		title: 'MBB,ASUS, ROG STRIX B550-A GAMING DDR4',
		price: 722,
		normalPrice: 729,
		image: 'https://rematazo.pe/fotos/5361.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=5361',
	},
	{
		id: '8355',
		title: 'MBB, ASUS, PRIME B840M-A WIFI AM5 DDR5',
		price: 722,
		normalPrice: 729,
		image: 'https://rematazo.pe/fotos/8355.png',
		stock: '4',
		url: 'https://rematazo.pe/detalleprod.php?prod=8355',
	},
	{
		id: '8074',
		title: 'MBB, MSI, B760 GAMING PLUS WIFI DDR5',
		price: 728,
		normalPrice: 735,
		image: 'https://rematazo.pe/fotos/8074.png',
		stock: '7',
		url: 'https://rematazo.pe/detalleprod.php?prod=8074',
	},
	{
		id: '7772',
		title: 'MBB, GIGABYTE, Z790S SVL DDR4',
		price: 751,
		normalPrice: 759,
		image: 'https://rematazo.pe/fotos/7772.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=7772',
	},
	{
		id: '7356',
		title: 'MBB, MSI, PRO Z790-P WIFI DDR5 LGA1700',
		price: 761,
		normalPrice: 769,
		image: 'https://rematazo.pe/fotos/7356.png',
		stock: '8',
		url: 'https://rematazo.pe/detalleprod.php?prod=7356',
	},
	{
		id: '7510',
		title: 'MBB, ASUS, TUF GAMING, B760 ATX PLUS WIFI DDR5 LGA1700',
		price: 841,
		normalPrice: 849,
		image: 'https://rematazo.pe/fotos/7510.png',
		stock: '>10',
		url: 'https://rematazo.pe/detalleprod.php?prod=7510',
	},
	{
		id: '3908',
		title: 'MBB Z590 A PRO SVL MSI ATX DDR4',
		price: 842,
		normalPrice: 850,
		image: 'https://rematazo.pe/fotos/3908.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=3908',
	},
	{
		id: '6413',
		title: 'MBB, MSI, B760M MORTAR WIFI LGA 1700 DDR4 PCIe 5.0',
		price: 880,
		normalPrice: 889,
		image: 'https://rematazo.pe/fotos/6413.png',
		stock: '4',
		url: 'https://rematazo.pe/detalleprod.php?prod=6413',
	},
	{
		id: '8019',
		title: 'MBB, GIGABYTE, Z890M GAMING X',
		price: 880,
		normalPrice: 889,
		image: 'https://rematazo.pe/fotos/8019.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=8019',
	},
	{
		id: '8135',
		title: 'MBB, NZXT, Z790 ATX DDR5 WIFI',
		price: 890,
		normalPrice: 899,
		image: 'https://rematazo.pe/fotos/8135.png',
		stock: '9',
		url: 'https://rematazo.pe/detalleprod.php?prod=8135',
	},
	{
		id: '8134',
		title: 'MBB, GIGABYTE, Z790S SVL DDR4',
		price: 890,
		normalPrice: 899,
		image: 'https://rematazo.pe/fotos/8134.png',
		stock: '3',
		url: 'https://rematazo.pe/detalleprod.php?prod=8134',
	},
	{
		id: '8356',
		title: 'MBB, ASUS, TUF GAMING, B860M-PLUS WIFI LGA 1851',
		price: 920,
		normalPrice: 929,
		image: 'https://rematazo.pe/fotos/8356.png',
		stock: '5',
		url: 'https://rematazo.pe/detalleprod.php?prod=8356',
	},
	{
		id: '6980',
		title: 'MBB, MSI, B760 TOMAHAWK LGA1700 DDR5 WIFI',
		price: 920,
		normalPrice: 929,
		image: 'https://rematazo.pe/fotos/6980.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=6980',
	},
	{
		id: '8155',
		title: 'MBB, ASUS, Z890M-PLUS WIFI PRIME',
		price: 930,
		normalPrice: 939,
		image: 'https://rematazo.pe/fotos/8155.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8155',
	},
	{
		id: '8042',
		title: 'MBB, MSI, B760M PROYECT ZERO AM5',
		price: 930,
		normalPrice: 939,
		image: 'https://rematazo.pe/fotos/8042.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8042',
	},
	{
		id: '8072',
		title: 'MBB,MSI, B650M PROJECT ZERO ZERO DDR5',
		price: 930,
		normalPrice: 939,
		image: 'https://rematazo.pe/fotos/8072.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8072',
	},
	{
		id: '8359',
		title: 'MBB, ASUS, TUF GAMING, B860-PLUS WIFI ATX DDR5',
		price: 969,
		normalPrice: 979,
		image: 'https://rematazo.pe/fotos/8359.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8359',
	},
	{
		id: '8357',
		title: 'MBB, ASUS, TUF GAMING, B850M-PLUS WIFI DDR5',
		price: 979,
		normalPrice: 989,
		image: 'https://rematazo.pe/fotos/8357.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8357',
	},
	{
		id: '8048',
		title: 'MBB, GIGABYTE, Z790 AORUS ELITE AX  DDR5',
		price: 1009,
		normalPrice: 1019,
		image: 'https://rematazo.pe/fotos/8048.png',
		stock: '10',
		url: 'https://rematazo.pe/detalleprod.php?prod=8048',
	},
	{
		id: '7786',
		title: 'MBB, ASUS, PRIME X870-P WIFI AMD DDR5 3PCL, 4.0 USB, BLUETOOTH M.2',
		price: 1009,
		normalPrice: 1019,
		image: 'https://rematazo.pe/fotos/7786.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=7786',
	},
	{
		id: '8358',
		title: 'MBB, ASUS, TUF GAMING, B850-PLUS WIFI ATX DDR5',
		price: 1019,
		normalPrice: 1029,
		image: 'https://rematazo.pe/fotos/8358.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=8358',
	},
	{
		id: '8281',
		title: 'MBB, GIGABYTE, B650 AERO G S/V/L DDR5',
		price: 1019,
		normalPrice: 1029,
		image: 'https://rematazo.pe/fotos/8281.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=8281',
	},
	{
		id: '7597',
		title: 'MBB, ASUS, Z790 TUF GMG PLUS WF DDR5 LGA1700',
		price: 1019,
		normalPrice: 1029,
		image: 'https://rematazo.pe/fotos/7597.png',
		stock: '2',
		url: 'https://rematazo.pe/detalleprod.php?prod=7597',
	},
	{
		id: '7834',
		title: 'MBB, MSI, PRO X870-P WIFI AM5 DDR5',
		price: 1078,
		normalPrice: 1089,
		image: 'https://rematazo.pe/fotos/7834.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=7834',
	},
	{
		id: '7692',
		title: 'MBB, GIGABYTE, Z790 GAMING PLUS  AX DDR5 LGA1700 WIFI',
		price: 1104,
		normalPrice: 1115,
		image: 'https://rematazo.pe/fotos/7692.png',
		stock: '5',
		url: 'https://rematazo.pe/detalleprod.php?prod=7692',
	},
	{
		id: '6193',
		title: 'MBB, GIGABYTE, B650M AORUS ELITE AX DDR5 128GB',
		price: 1108,
		normalPrice: 1119,
		image: 'https://rematazo.pe/fotos/6193.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=6193',
	},
	{
		id: '4564',
		title: 'MBB, ASUS, Z590-E ROG STRIX GAMING WIFI LGA1200 DDR4',
		price: 1128,
		normalPrice: 1139,
		image: 'https://rematazo.pe/fotos/4564.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=4564',
	},
	{
		id: '7833',
		title: 'MBB, MSI, Z890-P PRO WIFI DDR5 LGA 1851',
		price: 1134,
		normalPrice: 1145,
		image: 'https://rematazo.pe/fotos/7833.png',
		stock: '1',
		url: 'https://rematazo.pe/detalleprod.php?prod=7833',
	},
]

interface ScrapedProduct {
	id: string
	title: string
	price: number
	normalPrice: number
	image: string
	stock: string
	url: string
}

function processStock(stock: string): number {
	if (stock === '>10') {
		return 15
	}
	const stockNum = Number.parseInt(stock)
	return Number.isNaN(stockNum) ? 0 : stockNum
}

function transformProduct(
	scraped: ScrapedProduct,
	brandName: string,
	categoryName: string,
) {
	return {
		name: scraped.title,
		imageUrl: scraped.image,
		shortDescription: scraped.title,
		longDescription: DEFAULT_LONG_DESCRIPTION,
		stock: processStock(scraped.stock),
		priceWeb: scraped.price,
		price: scraped.normalPrice,
		brandName,
		categoryName,
		conditionId: 'N' as const, // Nuevo por defecto
	}
}

async function confirmImport(products: ScrapedProduct[]): Promise<boolean> {
	console.log()
	console.log(colorize('📋 RESUMEN DE IMPORTACIÓN:', 'cyan'))
	console.log(colorize('═══════════════════════════════════════════', 'cyan'))
	console.log(
		`${colorize('📦 Total de productos:', 'blue')} ${products.length}`,
	)
	console.log(
		`${colorize('📂 Categoría (configurada):', 'blue')} ${CATEGORY_NAME}`,
	)
	console.log(`${colorize('🔧 Condición:', 'blue')} Nuevo`)
	console.log(
		`${colorize('📄 Descripción larga:', 'blue')} Texto por defecto (memoria RAM)`,
	)
	console.log()

	console.log(colorize('📝 PRIMEROS 5 PRODUCTOS:', 'yellow'))
	products.slice(0, 5).forEach((product, index) => {
		console.log(`${colorize(`${index + 1}.`, 'gray')} ${product.title}`)
		console.log(
			`   ${colorize('💰', 'cyan')} S/ ${product.price} → S/ ${product.normalPrice}`,
		)
		console.log(
			`   ${colorize('📦', 'cyan')} Stock: ${processStock(product.stock)}`,
		)
		console.log()
	})

	if (products.length > 5) {
		console.log(colorize(`... y ${products.length - 5} productos más`, 'gray'))
		console.log()
	}

	const confirm = await question(
		colorize('¿Confirmar importación masiva? (s/N): ', 'yellow'),
	)
	return confirm.toLowerCase().startsWith('s')
}

async function importProducts() {
	try {
		printHeader()

		console.log(colorize('📊 DATOS DETECTADOS:', 'green'))
		console.log(
			`${colorize('✅ Productos encontrados:', 'cyan')} ${SCRAPED_PRODUCTS.length}`,
		)
		console.log()

		if (SCRAPED_PRODUCTS.length === 0) {
			console.log(
				colorize('❌ No se encontraron productos para importar', 'red'),
			)
			console.log(
				colorize(
					'💡 Edita el archivo y reemplaza SCRAPED_PRODUCTS con tu array',
					'yellow',
				),
			)
			return
		}

		// Mostrar ejemplo del primer producto
		const firstProduct = SCRAPED_PRODUCTS[0]
		console.log(colorize('📝 EJEMPLO DEL PRIMER PRODUCTO:', 'yellow'))
		console.log(`${colorize('Título:', 'blue')} ${firstProduct.title}`)
		console.log(`${colorize('Precio Web:', 'blue')} S/ ${firstProduct.price}`)
		console.log(
			`${colorize('Precio Normal:', 'blue')} S/ ${firstProduct.normalPrice}`,
		)
		console.log(
			`${colorize('Stock Original:', 'blue')} ${firstProduct.stock} → ${processStock(firstProduct.stock)}`,
		)
		console.log()

		// Confirmar antes de procesar
		if (!(await confirmImport(SCRAPED_PRODUCTS))) {
			console.log(colorize('❌ Importación cancelada', 'yellow'))
			return
		}

		// Procesar productos
		console.log()
		console.log(colorize('🔄 INICIANDO IMPORTACIÓN...', 'cyan'))
		console.log(colorize('─'.repeat(60), 'gray'))

		let successCount = 0
		let errorCount = 0
		const errors: string[] = []

		for (let i = 0; i < SCRAPED_PRODUCTS.length; i++) {
			const scraped = SCRAPED_PRODUCTS[i]

			// Preguntar por la marca para cada producto
			console.log()
			console.log(
				colorize(`📝 PRODUCTO ${i + 1}/${SCRAPED_PRODUCTS.length}:`, 'yellow'),
			)
			console.log(`${colorize('Título:', 'blue')} ${scraped.title}`)
			const brandName = await question('Ingresa la marca para este producto: ')

			if (!brandName.trim()) {
				console.log(
					colorize('⚠️  Saltando producto - No se ingresó marca', 'yellow'),
				)
				errorCount++
				errors.push(`${scraped.title}: No se especificó marca`)
				continue
			}

			const productData = transformProduct(
				scraped,
				brandName.trim(),
				CATEGORY_NAME,
			)

			process.stdout.write(`Procesando: ${scraped.title.substring(0, 50)}...`)

			try {
				const result = await createProduct(productData)

				if (result.success) {
					console.log(` ${colorize('✅', 'green')}`)
					successCount++
				} else {
					console.log(` ${colorize('❌', 'red')}`)
					errorCount++
					errors.push(`${scraped.title}: ${result.error}`)
				}
			} catch (error) {
				console.log(` ${colorize('💥', 'red')}`)
				errorCount++
				errors.push(`${scraped.title}: Error inesperado - ${error}`)
			}

			// Pequeña pausa para no sobrecargar la BD
			await new Promise((resolve) => setTimeout(resolve, 100))
		}

		// Mostrar resultados
		console.log()
		console.log(colorize('🎉 IMPORTACIÓN COMPLETADA', 'green'))
		console.log(colorize('═══════════════════════════════════════', 'green'))
		console.log(`${colorize('✅ Productos creados:', 'green')} ${successCount}`)
		console.log(`${colorize('❌ Errores:', 'red')} ${errorCount}`)
		console.log(
			`${colorize('📊 Total procesados:', 'cyan')} ${SCRAPED_PRODUCTS.length}`,
		)

		if (errors.length > 0) {
			console.log()
			console.log(colorize('📋 ERRORES DETALLADOS:', 'red'))
			errors.slice(0, 10).forEach((error, index) => {
				console.log(`${colorize(`${index + 1}.`, 'gray')} ${error}`)
			})
			if (errors.length > 10) {
				console.log(colorize(`... y ${errors.length - 10} errores más`, 'gray'))
			}
		}

		console.log()
		console.log(
			colorize('🚀 ¡Los productos están listos para testing!', 'green'),
		)
	} catch (error) {
		console.log()
		console.log(colorize('❌ ERROR INESPERADO EN IMPORTACIÓN', 'red'))
		console.log(colorize(`💥 ${error}`, 'red'))
	} finally {
		rl.close()
	}
}

// Manejo de interrupción
process.on('SIGINT', () => {
	console.log()
	console.log(colorize('👋 Importación cancelada por el usuario', 'yellow'))
	rl.close()
	process.exit(0)
})

importProducts().catch((error) => {
	console.error(colorize('Error fatal:', 'red'), error)
	process.exit(1)
})
