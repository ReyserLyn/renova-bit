import { Separator } from '@/components/ui/separator'
import {
	CreditCard,
	HeadphonesIcon,
	Mail,
	MapPin,
	Phone,
	RotateCcw,
	Shield,
	Truck,
} from 'lucide-react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'

export default function Footer() {
	const currentYear = new Date().getFullYear()

	const footerSections = [
		{
			title: 'Tienda',
			links: [
				{ label: 'Computadoras', href: '/categoria/computadoras' },
				{ label: 'Laptops', href: '/categoria/laptops' },
				{ label: 'Componentes', href: '/' },
				{ label: 'Periféricos', href: '/categoria/mouses' },
				{ label: 'Monitores', href: '/categoria/monitores' },
				{ label: 'Ofertas', href: '/ofertas' },
			],
		},
		{
			title: 'Servicio al Cliente',
			links: [
				{ label: 'Mi Cuenta', href: '/' },
				{ label: 'Pedidos', href: '/' },
				{ label: 'Lista de Deseos', href: '/' },
				{ label: 'Seguimiento', href: '/' },
				{ label: 'Centro de Ayuda', href: '/' },
				{ label: 'Contacto', href: '/' },
			],
		},
		{
			title: 'Información',
			links: [
				{ label: 'Sobre Nosotros', href: '/' },
				{ label: 'Términos y Condiciones', href: '/' },
				{ label: 'Política de Privacidad', href: '/' },
				{ label: 'Política de Envíos', href: '/' },
				{ label: 'Política de Devoluciones', href: '/' },
				{ label: 'Garantías', href: '/' },
			],
		},
	]

	const features = [
		{
			icon: Truck,
			title: 'Delivery Gratis',
			description: 'Todos los fines de semana',
		},
		{
			icon: Shield,
			title: 'Compra Segura',
			description: 'Protección de datos SSL',
		},
		{
			icon: RotateCcw,
			title: 'Garantía',
			description: 'Garantía por 1 año',
		},
		{
			icon: HeadphonesIcon,
			title: 'Soporte 24/7',
			description: 'Atención especializada',
		},
	]

	const paymentMethods = [
		//'Visa',
		//'Mastercard',
		'Yape',
		'Plin',
		'BCP',
		'Interbank',
		'BBVA',
		//'Scotiabank',
	]

	return (
		<footer className="bg-background border-t mt-auto">
			<div className="bg-muted/30">
				<div className="container py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature) => (
							<div key={feature.title} className="flex items-center gap-3">
								<div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
									<feature.icon className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-semibold text-sm">{feature.title}</h4>
									<p className="text-xs text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="container py-12">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div>
							<h2 className="text-2xl font-bold text-primary mb-4">
								RenovaBit
							</h2>
							<p className="text-muted-foreground text-sm leading-relaxed mb-4">
								Tu tienda de tecnología de confianza en Moquegua, Perú.
								Ofrecemos los mejores productos tecnológicos con garantía, envío
								rápido y atención personalizada para particulares y empresas.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="font-semibold text-base mb-3">Contacto</h3>
							<div className="space-y-2">
								<div className="flex items-center gap-3 text-sm">
									<Phone className="w-4 h-4 text-primary flex-shrink-0" />
									<span>+51 987 471 074</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Mail className="w-4 h-4 text-primary flex-shrink-0" />
									<span>info@renovabit.com</span>
								</div>
								<div className="flex items-start gap-3 text-sm">
									<MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
									<span>Moquegua, Perú</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<FaWhatsapp className="w-4 h-4 text-green-500 flex-shrink-0" />
									<Link
										href="https://wa.me/51987471074"
										className="hover:text-green-500 transition-colors"
										target="_blank"
									>
										WhatsApp: 987 471 074
									</Link>
								</div>
							</div>
						</div>

						<div>
							<h3 className="font-semibold text-base mb-3">Síguenos</h3>
							<div className="flex items-center gap-3">
								<Link
									href="https://www.facebook.com/renovabit"
									target="_blank"
									className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
								>
									<FaFacebook className="w-5 h-5 text-blue-600" />
								</Link>
								<Link
									href="https://www.instagram.com/renovabit"
									target="_blank"
									className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
								>
									<FaInstagram className="w-5 h-5 text-pink-600" />
								</Link>
								<Link
									href="https://www.tiktok.com/@renovabit"
									target="_blank"
									className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
								>
									<FaTiktok className="w-5 h-5 text-gray-800 dark:text-white" />
								</Link>
							</div>
						</div>
					</div>

					{footerSections.map((section) => (
						<div key={section.title} className="space-y-4">
							<h3 className="font-semibold text-base">{section.title}</h3>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-sm text-muted-foreground hover:text-foreground transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<Separator className="my-8" />

				<div className="space-y-4">
					<h3 className="font-semibold text-base">Métodos de Pago</h3>
					<div className="flex flex-wrap items-center gap-3">
						<CreditCard className="w-8 h-8 text-muted-foreground" />
						{paymentMethods.map((method) => (
							<div
								key={method}
								className="px-3 py-1.5 bg-muted rounded text-xs font-medium"
							>
								{method}
							</div>
						))}
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
					<div className="text-center md:text-left">
						<p>© {currentYear} RenovaBit. Todos los derechos reservados.</p>
						<p className="text-xs mt-1">
							Desarrollado con ❤️ en Moquegua, Perú para amantes de la tecnología
						</p>
					</div>
					<div className="flex items-center gap-4 text-xs">
						<Link href="/privacidad" className="hover:text-foreground">
							Privacidad
						</Link>
						<Link href="/terminos" className="hover:text-foreground">
							Términos
						</Link>
						<Link href="/cookies" className="hover:text-foreground">
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
