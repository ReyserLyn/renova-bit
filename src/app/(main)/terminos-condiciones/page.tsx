import ContactFooter from '@/components/legal/contact-footer'
import LegalPageLayout from '@/components/legal/legal-page-layout'
import { useLegalContent } from '@/hooks/use-legal-content'
import { legalMetadata } from '@/lib/legal-metadata'
import { Scale } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = legalMetadata.termsAndConditions

export default function TermsPage() {
	const { sections, lastUpdated, version } =
		useLegalContent('termsAndConditions')

	const footerComponent = (
		<ContactFooter
			title="¿Tienes preguntas sobre estos términos?"
			description="Nuestro equipo está disponible para aclarar cualquier duda sobre nuestros términos y condiciones."
			emailLabel="Email"
			emailAddress="info@renovabit.com"
		/>
	)

	return (
		<LegalPageLayout
			breadcrumbLabel="Términos y Condiciones"
			title="Términos y Condiciones"
			description="Estos términos y condiciones regulan el uso de nuestro sitio web y la compra de productos en RenovaBit."
			icon={Scale}
			lastUpdated={lastUpdated}
			version={version}
			sections={sections}
			footerComponent={footerComponent}
		/>
	)
}
