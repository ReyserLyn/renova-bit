import { Card, CardContent } from '@/components/ui/card'

interface ContactFooterProps {
	title: string
	description: string
	emailLabel: string
	emailAddress: string
	showPrivacyEmail?: boolean
}

export default function ContactFooter({
	title,
	description,
	emailLabel,
	emailAddress,
	showPrivacyEmail = false,
}: ContactFooterProps) {
	return (
		<Card className="mt-8 bg-primary/5">
			<CardContent className="p-8 text-center">
				<h3 className="text-xl font-semibold mb-4">{title}</h3>
				<p className="text-muted-foreground mb-6">{description}</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
					{showPrivacyEmail && (
						<div className="flex items-center gap-2">
							<span className="font-medium">Email de Privacidad:</span>
							<a
								href="mailto:privacidad@renovabit.com"
								className="text-primary hover:underline"
							>
								privacidad@renovabit.com
							</a>
						</div>
					)}
					<div className="flex items-center gap-2">
						<span className="font-medium">{emailLabel}:</span>
						<a
							href={`mailto:${emailAddress}`}
							className="text-primary hover:underline"
						>
							{emailAddress}
						</a>
					</div>
					<div className="flex items-center gap-2">
						<span className="font-medium">WhatsApp:</span>
						<a
							href="https://wa.me/51987471074"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							+51 987 471 074
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
