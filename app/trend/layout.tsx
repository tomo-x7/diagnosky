import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "trend",
	description: "埋め込み用",
	robots: { index: false, follow: false },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" style={{ overflow: "hidden" }}>
			<body style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", width: "480px", overflow: "hidden" }}>
				{children}
			</body>
		</html>
	);
}
