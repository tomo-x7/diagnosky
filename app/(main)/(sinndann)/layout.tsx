import { Trend } from "../trend";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div id="sinndann">{children}</div>
			<Trend />
		</>
	);
}
