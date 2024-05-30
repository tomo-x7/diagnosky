/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.bsky.app",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
