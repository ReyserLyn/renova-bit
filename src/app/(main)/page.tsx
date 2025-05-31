'use client'

import Link from 'next/link'

export default function Home() {
	return (
		<main className="container h-full">
			<h1 className="hidden">RenovaBit</h1>

			<section className="flex justify-end items-center p-4 gap-4 h-16">
				<div className="flex items-center gap-4">
					<Link href="/">Home</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>
			</section>
		</main>
	)
}
