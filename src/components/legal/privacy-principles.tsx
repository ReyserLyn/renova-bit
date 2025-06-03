import { Card, CardContent } from '@/components/ui/card'
import { Eye, Lock, Shield, UserCheck } from 'lucide-react'

const principles = [
	{
		icon: Shield,
		title: 'Protección',
		description: 'Tus datos están seguros con nosotros',
	},
	{
		icon: Eye,
		title: 'Transparencia',
		description: 'Te explicamos qué datos recopilamos y por qué',
	},
	{
		icon: Lock,
		title: 'Control',
		description: 'Tú decides cómo usar tus datos',
	},
	{
		icon: UserCheck,
		title: 'Derechos',
		description: 'Respetamos todos tus derechos sobre tus datos',
	},
]

export default function PrivacyPrinciples() {
	return (
		<Card className="mb-12 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30 border-0">
			<CardContent className="p-8">
				<h2 className="text-2xl font-bold text-center mb-8">
					Nuestros Principios de Privacidad
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{principles.map((principle) => (
						<div key={principle.title} className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<principle.icon className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">{principle.title}</h3>
							<p className="text-sm text-muted-foreground">
								{principle.description}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
