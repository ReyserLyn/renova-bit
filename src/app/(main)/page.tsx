'use client'

import HeaderMiddle from '@/components/layout/header-middle'
import HeaderTop from '@/components/layout/header-top'
import InputSearch from '@/components/layout/input-search'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<HeaderTop />
			<HeaderMiddle />
			<InputSearch className="block md:hidden max-w-full" />
			<main className="container">
				<h1 className="hidden">RenovaBit</h1>

				<section className="flex justify-end items-center p-4 gap-4 h-16">
					<div className="flex items-center gap-4">
						<Link href="/">Home</Link>
						<Link href="/about">About</Link>
						<Link href="/contact">Contact</Link>
					</div>
				</section>
			</main>
		</>
	)
}
