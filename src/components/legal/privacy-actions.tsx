import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Lock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyActions() {
	return (
		<Card className="mt-12">
			<CardContent className="p-8">
				<div className="text-center mb-6">
					<h3 className="text-2xl font-semibold mb-4">
						Gestiona tu Privacidad
					</h3>
					<p className="text-muted-foreground">
						Ejercita tus derechos o contacta con nosotros para cualquier
						consulta sobre privacidad.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Button asChild variant="outline" className="h-auto p-4">
						<Link href="mailto:privacidad@renovabit.com">
							<div className="text-center">
								<Shield className="w-5 h-5 mx-auto mb-2" />
								<div className="font-medium">Ejercer Derechos</div>
								<div className="text-xs text-muted-foreground">
									Acceso, rectificación, supresión
								</div>
							</div>
						</Link>
					</Button>
					<Button asChild variant="outline" className="h-auto p-4">
						<Link href="/contacto">
							<div className="text-center">
								<Eye className="w-5 h-5 mx-auto mb-2" />
								<div className="font-medium">Consultas Privacidad</div>
								<div className="text-xs text-muted-foreground">
									Dudas sobre tratamiento
								</div>
							</div>
						</Link>
					</Button>
					<Button asChild variant="outline" className="h-auto p-4">
						<Link href="#cookies">
							<div className="text-center">
								<Lock className="w-5 h-5 mx-auto mb-2" />
								<div className="font-medium">Gestionar Cookies</div>
								<div className="text-xs text-muted-foreground">
									Personalizar preferencias
								</div>
							</div>
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
