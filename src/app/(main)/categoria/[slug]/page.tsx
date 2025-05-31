import { getCategoryBySlug } from '@/database/queries/categories'
import Image from 'next/image'

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const category = await getCategoryBySlug(slug)

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{category[0].name}</h1>

			{category[0].products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{category[0].products.map((product) => (
						<div key={product.id} className="border rounded-lg p-4">
							<h2 className="text-xl font-semibold">{product.name}</h2>
							<Image
								src={product.image_url}
								alt={product.name}
								width={300}
								height={300}
								className="w-full h-48 object-cover rounded-lg"
							/>
							<a
								href={`/producto/${product.slug}`}
								className="text-blue-600 hover:underline mt-2 inline-block"
							>
								Ver producto
							</a>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500">No hay productos en esta categoría.</p>
			)}
		</div>
	)
}
