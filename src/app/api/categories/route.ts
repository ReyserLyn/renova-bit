import { getCategoriesWithCount } from '@/database/queries/products'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await getCategoriesWithCount()
		return NextResponse.json(categories)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json([], { status: 500 })
	}
}
