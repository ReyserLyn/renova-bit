export default async function LaptopPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	return <div>Laptop: {slug}</div>
}
