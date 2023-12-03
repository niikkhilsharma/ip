/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/fingerprint',
				destination: 'https://fpnpmcdn.net/v3/EXUkcnTKp7DJJ1BeYIGB/loader_v3.8.6.js',
			},
		]
	},
}

module.exports = nextConfig
