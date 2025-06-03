import { createInterface } from 'node:readline'
import { createProduct } from '@/actions/products'

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
	console.log(colorize('                  🛍️  AGREGAR NUEVO PRODUCTO', 'bright'))
	console.log(colorize('                      RenovaBit - Moquegua', 'gray'))
	console.log(
		colorize(
			'═══════════════════════════════════════════════════════════════',
			'cyan',
		),
	)
	console.log()
}

function printFieldInfo() {
	console.log(colorize('📋 INFORMACIÓN DE CAMPOS:', 'yellow'))
	console.log(
		`${colorize('   ✅ Obligatorios: ', 'green')}Nombre, Imagen URL, Descripción Corta, Precio Web, Precio, Marca, Categoría, Condición`,
	)
	console.log(
		`${colorize('   📝 Opcionales: ', 'cyan')}Descripción Larga, Stock (default: 0)`,
	)
	console.log(
		`${colorize('   🏷️  Condiciones: ', 'blue')}N=Nuevo, U=Usado, R=Reacondicionado`,
	)
	console.log()
	console.log(
		colorize(
			'💡 Nota: El precio web debe ser menor o igual al precio regular',
			'gray',
		),
	)
	console.log()
}

function question(prompt: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(`${colorize('❓', 'yellow')} ${prompt}`, resolve)
	})
}

function validateUrl(url: string): boolean {
	try {
		new URL(url)
		return true
	} catch {
		return false
	}
}

function validatePrice(price: string): number | null {
	const num = Number.parseFloat(price)
	return !Number.isNaN(num) && num >= 0 ? num : null
}

function validateCondition(condition: string): 'N' | 'U' | 'R' | null {
	const upper = condition.toUpperCase()
	return ['N', 'U', 'R'].includes(upper) ? (upper as 'N' | 'U' | 'R') : null
}

async function getInput(
	fieldName: string,
	required = true,
	validator?: (value: string) => boolean,
	defaultValue?: string,
): Promise<string> {
	while (true) {
		const requiredText = required
			? colorize('*', 'red')
			: colorize('(opcional)', 'gray')
		const defaultText = defaultValue
			? colorize(` [${defaultValue}]`, 'gray')
			: ''
		const value = await question(`${fieldName} ${requiredText}${defaultText}: `)

		if (!value.trim() && defaultValue) {
			return defaultValue
		}

		if (!value.trim() && required) {
			console.log(colorize('❌ Este campo es obligatorio', 'red'))
			continue
		}

		if (!value.trim() && !required) {
			return ''
		}

		if (validator && !validator(value)) {
			console.log(colorize('❌ Valor inválido', 'red'))
			continue
		}

		return value.trim()
	}
}

async function confirmData(data: any): Promise<boolean> {
	console.log()
	console.log(colorize('📋 RESUMEN DEL PRODUCTO A CREAR:', 'cyan'))
	console.log(colorize('═══════════════════════════════════════════', 'cyan'))
	console.log(`${colorize('📦 Nombre:', 'blue')} ${data.name}`)
	console.log(`${colorize('🖼️  Imagen:', 'blue')} ${data.imageUrl}`)
	console.log(
		`${colorize('📝 Descripción Corta:', 'blue')} ${data.shortDescription}`,
	)
	if (data.longDescription) {
		console.log(
			`${colorize('📄 Descripción Larga:', 'blue')} ${data.longDescription}`,
		)
	}
	console.log(`${colorize('📦 Stock:', 'blue')} ${data.stock}`)
	console.log(`${colorize('💰 Precio Web:', 'blue')} S/ ${data.priceWeb}`)
	console.log(`${colorize('💵 Precio Regular:', 'blue')} S/ ${data.price}`)
	console.log(`${colorize('🏷️  Marca:', 'blue')} ${data.brandName}`)
	console.log(`${colorize('📂 Categoría:', 'blue')} ${data.categoryName}`)
	console.log(
		`${colorize('🔧 Condición:', 'blue')} ${data.conditionId === 'N' ? 'Nuevo' : data.conditionId === 'U' ? 'Usado' : 'Reacondicionado'}`,
	)
	console.log()

	const confirm = await question(
		colorize('¿Confirmar creación del producto? (s/N): ', 'yellow'),
	)
	return confirm.toLowerCase().startsWith('s')
}

async function createProductFlow(): Promise<boolean> {
	console.log(
		colorize('🚀 Iniciando proceso de creación de producto...', 'green'),
	)
	console.log()

	// Campos obligatorios
	const name = await getInput('Nombre del producto')

	const imageUrl = await getInput('URL de la imagen', true, validateUrl)

	const shortDescription = await getInput('Descripción corta')

	// Campo opcional
	const longDescription = await getInput('Descripción larga', false)

	// Stock con valor por defecto
	const stockInput = await getInput('Stock', false, undefined, '0')
	const stock = Number.parseInt(stockInput) || 0

	// Precios
	let priceWeb: number
	while (true) {
		const priceWebInput = await getInput('Precio web (S/)')
		const parsed = validatePrice(priceWebInput)
		if (parsed !== null) {
			priceWeb = parsed
			break
		}
		console.log(
			colorize('❌ Ingrese un precio válido (mayor o igual a 0)', 'red'),
		)
	}

	let price: number
	while (true) {
		const priceInput = await getInput('Precio regular (S/)')
		const parsed = validatePrice(priceInput)
		if (parsed !== null) {
			if (parsed >= priceWeb) {
				price = parsed
				break
			}
			console.log(
				colorize(
					'❌ El precio regular debe ser mayor o igual al precio web',
					'red',
				),
			)
		} else {
			console.log(
				colorize('❌ Ingrese un precio válido (mayor o igual a 0)', 'red'),
			)
		}
	}

	const brandName = await getInput('Marca')
	const categoryName = await getInput('Categoría')

	// Condición
	let conditionId: 'N' | 'U' | 'R'
	while (true) {
		console.log(colorize('Opciones de condición:', 'blue'))
		console.log(colorize('  N = Nuevo', 'cyan'))
		console.log(colorize('  U = Usado', 'cyan'))
		console.log(colorize('  R = Reacondicionado', 'cyan'))

		const conditionInput = await getInput('Condición (N/U/R)')
		const parsed = validateCondition(conditionInput)
		if (parsed) {
			conditionId = parsed
			break
		}
		console.log(colorize('❌ Ingrese N, U o R', 'red'))
	}

	const productData = {
		name,
		imageUrl,
		shortDescription,
		longDescription,
		stock,
		priceWeb,
		price,
		brandName,
		categoryName,
		conditionId,
	}

	// Confirmar datos
	if (!(await confirmData(productData))) {
		console.log(colorize('❌ Operación cancelada', 'yellow'))
		return false
	}

	// Crear producto
	console.log()
	console.log(colorize('🔄 Creando producto...', 'cyan'))

	const result = await createProduct(productData)

	if (result.success) {
		console.log()
		console.log(colorize('✅ ¡PRODUCTO CREADO EXITOSAMENTE!', 'green'))
		console.log(colorize('═══════════════════════════════════════', 'green'))
		console.log(`${colorize('🆔 ID:', 'cyan')} ${result.product?.id}`)
		console.log(`${colorize('📦 Nombre:', 'cyan')} ${result.product?.name}`)
		console.log(`${colorize('🔗 Slug:', 'cyan')} ${result.product?.slug}`)
		console.log(
			`${colorize('💰 Precio Web:', 'cyan')} S/ ${result.product?.price_web}`,
		)
		console.log(
			`${colorize('💵 Precio Regular:', 'cyan')} S/ ${result.product?.price}`,
		)
		console.log()
		console.log(
			colorize('🎉 El producto ya está disponible en la tienda!', 'green'),
		)
		return true
	}
	console.log()
	console.log(colorize('❌ ERROR AL CREAR PRODUCTO', 'red'))
	console.log(colorize('═══════════════════════════════════', 'red'))
	console.log(colorize(`💥 ${result.error}`, 'red'))
	return false
}

async function main() {
	try {
		printHeader()
		printFieldInfo()

		let continueAdding = true

		while (continueAdding) {
			const success = await createProductFlow()

			if (success) {
				console.log()
				console.log(colorize('─'.repeat(50), 'gray'))

				const addAnother = await question(
					colorize('¿Desea agregar otro producto? (s/N): ', 'yellow'),
				)

				if (addAnother.toLowerCase().startsWith('s')) {
					console.log()
					console.log(colorize('🔄 Iniciando nuevo producto...', 'cyan'))
					console.log()
					// Limpiar pantalla y mostrar header nuevamente
					printHeader()
					printFieldInfo()
					continue
				}

				continueAdding = false
				console.log()
				console.log(colorize('👋 ¡Gracias por usar RenovaBit!', 'green'))
				console.log(
					colorize(
						'🎉 Todos los productos han sido agregados exitosamente.',
						'cyan',
					),
				)
				continue
			}

			console.log()
			const retry = await question(
				colorize('¿Desea intentar crear otro producto? (s/N): ', 'yellow'),
			)

			if (retry.toLowerCase().startsWith('s')) {
				console.log()
				console.log(colorize('🔄 Iniciando nuevo intento...', 'cyan'))
				console.log()
				// Limpiar pantalla y mostrar header nuevamente
				printHeader()
				printFieldInfo()
				continue
			}

			continueAdding = false
			console.log()
			console.log(colorize('👋 Hasta luego!', 'yellow'))
		}
	} catch (error) {
		console.log()
		console.log(colorize('❌ ERROR INESPERADO', 'red'))
		console.log(colorize(`💥 ${error}`, 'red'))
		process.exit(1)
	} finally {
		rl.close()
	}
}

// Manejo de interrupción
process.on('SIGINT', () => {
	console.log()
	console.log(colorize('👋 Operación cancelada por el usuario', 'yellow'))
	rl.close()
	process.exit(0)
})

main().catch((error) => {
	console.error(colorize('Error fatal:', 'red'), error)
	process.exit(1)
})
