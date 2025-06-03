import { SearchLoader } from '@/components/ui/page-loader'

export default function SearchLoading() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<SearchLoader />
			</div>
		</div>
	)
}
