import { ThemeProvider } from '@/components/theme-provider'
import { esES } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import './styles/globals.css'

const outfit = Outfit({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	adjustFontFallback: true,
})

export const metadata: Metadata = {
	title: 'RenovaBit',
	description: 'RenovaBit',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider localization={esES}>
			<html lang="es" suppressHydrationWarning>
				<body className={`${outfit.className} antialiased`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Providers>{children}</Providers>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
