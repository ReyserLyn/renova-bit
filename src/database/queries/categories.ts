import { eq } from 'drizzle-orm'
import { db } from '../index'
import { categories } from '../schema'

export async function getCategoryBySlug(slug: string) {
	return db.query.categories.findMany({
		where: eq(categories.slug, slug),
		with: {
			products: {
				orderBy: (products: { price: any }, { asc }: any) => [
					asc(products.price),
				],
				with: {
					brand: true,
				},
			},
		},
	})
}
