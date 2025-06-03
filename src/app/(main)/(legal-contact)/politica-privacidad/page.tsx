import ContactFooter from '@/components/legal/contact-footer'
import LegalPageLayout from '@/components/legal/legal-page-layout'
import PrivacyActions from '@/components/legal/privacy-actions'
import PrivacyPrinciples from '@/components/legal/privacy-principles'
import { useLegalContent } from '@/hooks/use-legal-content'
import { legalMetadata } from '@/lib/legal-metadata'
import { Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = legalMetadata.privacyPolicy

export default function PrivacyPage() {
	const { sections, lastUpdated, version } = useLegalContent('privacyPolicy')

	const headerComponent = <PrivacyPrinciples />

	const footerComponent = (
		<>
			<PrivacyActions />
			<ContactFooter
				title="¿Tienes preguntas sobre privacidad?"
				description="Nuestro equipo de privacidad está disponible para resolver cualquier duda."
				emailLabel="Email"
				emailAddress="info@renovabit.com"
				showPrivacyEmail={true}
			/>
		</>
	)

	return (
		<LegalPageLayout
			breadcrumbLabel="Política de Privacidad"
			title="Política de Privacidad"
			description="Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, utilizamos y protegemos tu información personal."
			icon={Shield}
			lastUpdated={lastUpdated}
			version={version}
			sections={sections}
			headerComponent={headerComponent}
			footerComponent={footerComponent}
		/>
	)
}
