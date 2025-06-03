import type { ReactNode } from 'react'

/**
 * Procesa una línea de contenido legal y devuelve el elemento JSX apropiado
 */
export function processContentLine(
	paragraph: string,
	idx: number,
): ReactNode | null {
	const trimmed = paragraph.trim()

	if (trimmed === '') return null

	// Elementos de lista
	if (trimmed.startsWith('•')) {
		return (
			<li key={idx} className="ml-4 mb-1">
				{trimmed.substring(1).trim()}
			</li>
		)
	}

	// Títulos en negrita
	if (trimmed.startsWith('**')) {
		return (
			<h4 key={idx} className="font-semibold text-foreground mb-2">
				{trimmed.replace(/\*\*/g, '').replace(':', '')}
			</h4>
		)
	}

	// Párrafos normales
	return (
		<p key={idx} className="mb-3 leading-relaxed">
			{trimmed}
		</p>
	)
}

/**
 * Divide el contenido en líneas y procesa cada una
 */
export function processLegalContent(content: string): ReactNode[] {
	return content
		.split('\n')
		.map(processContentLine)
		.filter((element): element is ReactNode => element !== null)
}
