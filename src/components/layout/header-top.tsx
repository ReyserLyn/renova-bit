import { Mail } from 'lucide-react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import { ToogleTheme } from '../ui/toogle-theme'

export default function HeaderTop() {
	return (
		<aside className="bg-gray-800 hidden md:block py-2">
			<div className="container">
				<div className="flex items-center justify-between gap-4 text-white">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 border-r border-white/20 pr-4">
							<FaWhatsapp className="w-4" />
							<span className="text-sm">987471074</span>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="w-4" />
							<span className="text-sm">info@renovabit.com</span>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<ToogleTheme />

						<div className="flex items-center gap-2">
							<span>Síguenos en:</span>
							<Link href="https://www.facebook.com/renovabit" target="_blank">
								<FaFacebook className="w-4" />
							</Link>
							<Link href="https://www.tiktok.com/@renovabit" target="_blank">
								<FaTiktok className="w-4" />
							</Link>
							<Link href="https://www.instagram.com/renovabit" target="_blank">
								<FaInstagram className="w-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
