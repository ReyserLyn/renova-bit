import { legalContent } from '@/lib/legal-content'
import type { LegalPageContent } from '@/types/legal'

export function useLegalContent(
	pageType: 'termsAndConditions' | 'privacyPolicy',
): LegalPageContent {
	return legalContent[pageType]
}
