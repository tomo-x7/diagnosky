import type { Metadata } from "next";
import "./globals.css";
import type { Viewport } from "next";
import { Header } from "./header";
import Head from "next/head";
import { useEffect } from "react";

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
	const script={__html:'if(window.innerWidth<500){Array.from(document.getElementsByName("viewport")).map((elem)=>{elem.setAttribute(\'content\',\'width=500\');})} '}
	return (
		<html lang="ja">
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<script dangerouslySetInnerHTML={script} />
			</head>
			<body>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<script dangerouslySetInnerHTML={script} />
				<div id="background" />
				<div id="vp">
					<Header />
					<main>{children}</main>
					<footer>
						developed by{" "}
						<a href="https://bsky.app/profile/did:plc:qcwvyds5tixmcwkwrg3hxgxd" target="_blank" rel="noopener noreferrer">
							@tomo-x
						</a>
						<br />
						このプロジェクトはオープンソースです。
						<a href="https://github.com/tomo-x7/diagnosky" target="_blank" rel="noopener noreferrer">
							リポジトリ
						</a>
					</footer>
				</div>
			</body>
		</html>
	);
}
