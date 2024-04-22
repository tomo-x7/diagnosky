import type { Metadata } from "next";
import "./globals.css";
import type { Viewport } from 'next';
import Image from 'next/image';
import logo from './logo.png'

export const viewport: Viewport = {
	width: "500",
}
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
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
				<div id="vp">
					<header>
						<a href="/"><Image
							src={logo.src}
							width={100}
							height={50}
							alt="logo"
						/></a>
						<a href="/create">診断を作る</a>
					</header>
					<main>{children}</main>
					<footer>
						developed by{" "}
						<a href="https://bsky.app/profile/tomo-x.bsky.social" target="_blank" rel="noopener noreferrer">
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
