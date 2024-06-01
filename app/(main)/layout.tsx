import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./header";

export const metadata: Metadata = {
	title: "diagnosky",
	description: "Bluesky向けの診断メーカーです。",
	openGraph: {
		type: "website",
		locale: "ja_JP",
		siteName: "diagnosky",
		title: "diagnosky",
		description: "Bluesky向けの診断メーカーです。",
		images: { url: "https://diagnosky.vercel.app/ogp.png" },
	},
	icons: { icon: "/favicon.ico" },
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<div id="background" />
				<div id="vp" >
					<Header />
					<main className="w-full mt-[42px] mb-[72px] bg-white rounded-[10px] p-[10px] sp:mt-[30px]">{children}</main>
				</div>
				<footer className="sp:text-xs">
					developed by{" "}
					<a href="https://bsky.app/profile/did:plc:qcwvyds5tixmcwkwrg3hxgxd" target="_blank" rel="noopener noreferrer">
						@tomo-x
					</a>
					<br />
					このプロジェクトはオープンソースです。
					<a href="https://github.com/tomo-x7/diagnosky" target="_blank" rel="noopener noreferrer">
						リポジトリ
					</a><br />
				</footer>
			</body>
		</html>
	);
}
