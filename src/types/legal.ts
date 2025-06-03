export interface LegalSection {
	id: string
	title: string
	content: string
}

export interface LegalPageContent {
	lastUpdated: string
	version: string
	sections: LegalSection[]
}

export interface LegalContent {
	termsAndConditions: LegalPageContent
	privacyPolicy: LegalPageContent
}
