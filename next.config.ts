import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{ hostname: 'rematazo.pe' },
			{ hostname: 'img.clerk.com' },
			{ hostname: 'picsum.photos' },
		],
	},
}

export default nextConfig
