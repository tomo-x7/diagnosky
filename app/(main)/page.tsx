export const dynamic = "force-static";
export default function Home() {
	const jsonld = {
		"@context": "http://schema.org",
		"@type": "WebSite",
		name: "diagnosky",
		url: "https://diagnosky.vercel.app/",
		headline: "diagnosky",
		description: "Bluesky向けの診断メーカーです。",
		image: {
			"@type": "ImageObject",
			url: "/favicon.ico",
		},
	};
	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
			<h1>diagnosky</h1>
			<p>
				Bluesky向けの診断メーカーです。
				<br />
				各種サードパーティークライアントにも対応しています。
			</p>
		</>
	);
}
