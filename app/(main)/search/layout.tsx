export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div>
				<a href="/search/">人気</a>
				<a href="/search/latest">最新</a>
			</div>
			{children}
		</>
	);
}
