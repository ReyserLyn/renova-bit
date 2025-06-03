import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { processLegalContent } from '@/lib/legal-utils'
import type { LegalSection } from '@/types/legal'
import type { LucideIcon } from 'lucide-react'
import { Calendar, FileText } from 'lucide-react'
import type { ReactNode } from 'react'

interface LegalPageLayoutProps {
	breadcrumbLabel: string
	title: string
	description: string
	icon: LucideIcon
	lastUpdated: string
	version: string
	sections: LegalSection[]
	headerComponent?: ReactNode
	footerComponent?: ReactNode
}

export default function LegalPageLayout({
	breadcrumbLabel,
	title,
	description,
	icon: Icon,
	lastUpdated,
	version,
	sections,
	headerComponent,
	footerComponent,
}: LegalPageLayoutProps) {
	const breadcrumbItems = [{ label: breadcrumbLabel, isActive: true }]

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-4">
						<Icon className="h-8 w-8 text-primary" />
						<h1 className="text-4xl lg:text-5xl font-bold">{title}</h1>
					</div>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{description}
					</p>
				</div>

				{/* Header Component adicional (para principios de privacidad, etc.) */}
				{headerComponent}

				{/* Información de Actualización */}
				<Card className="mb-8 bg-muted/30">
					<CardContent className="p-6">
						<div className="flex items-center gap-6 text-sm">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-primary" />
								<span className="font-medium">Última actualización:</span>
								<span className="text-muted-foreground">{lastUpdated}</span>
							</div>
							<div className="flex items-center gap-2">
								<FileText className="h-4 w-4 text-primary" />
								<span className="font-medium">Versión:</span>
								<span className="text-muted-foreground">{version}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Índice de Contenidos - Solo en móviles, arriba del contenido */}
				<Card className="mb-8 lg:hidden">
					<CardHeader>
						<CardTitle className="text-lg">Índice de Contenidos</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{sections.map((section) => (
								<a
									key={section.id}
									href={`#${section.id}`}
									className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-primary/5 border border-transparent hover:border-primary/20"
								>
									{section.title}
								</a>
							))}
						</nav>
					</CardContent>
				</Card>

				{/* Contenido Principal */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Índice de Contenidos - Solo en desktop, con sticky */}
					<Card className="hidden lg:block lg:col-span-1 h-fit lg:sticky lg:top-8">
						<CardHeader>
							<CardTitle className="text-lg">Índice de Contenidos</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<nav className="space-y-2">
								{sections.map((section) => (
									<a
										key={section.id}
										href={`#${section.id}`}
										className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
									>
										{section.title}
									</a>
								))}
							</nav>
						</CardContent>
					</Card>

					{/* Contenido */}
					<div className="col-span-1 lg:col-span-3 space-y-8">
						{sections.map((section) => (
							<Card key={section.id} id={section.id} className="scroll-mt-20">
								<CardHeader>
									<CardTitle className="text-xl">{section.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="prose prose-sm max-w-none text-muted-foreground">
										{processLegalContent(section.content)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Footer Component (para contacto, acciones rápidas, etc.) */}
				{footerComponent}
			</div>
		</div>
	)
}
