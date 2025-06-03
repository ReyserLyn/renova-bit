import type { Metadata } from 'next'

export const legalMetadata = {
	termsAndConditions: {
		title: 'Términos y Condiciones - RenovaBit',
		description:
			'Términos y condiciones de uso de RenovaBit. Conoce nuestras políticas de compra, uso del sitio web y servicios.',
		keywords: 'términos, condiciones, políticas, RenovaBit, legal',
	} satisfies Metadata,

	privacyPolicy: {
		title: 'Política de Privacidad - RenovaBit',
		description:
			'Política de privacidad de RenovaBit. Conoce cómo protegemos y utilizamos tus datos personales.',
		keywords: 'privacidad, datos personales, protección, RGPD, RenovaBit',
	} satisfies Metadata,
} as const
