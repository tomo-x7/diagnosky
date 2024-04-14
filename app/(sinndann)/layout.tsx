import "./sinndann.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div id="sinndann">{children}</div>
			<div id="trend" />
		</>
	);
}
