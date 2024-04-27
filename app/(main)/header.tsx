"use client";
import logo from "./logo.png";
import localstyle from "./layout.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
	const [height, setheight] = useState(0);
	useEffect(() => {
		setheight((document.documentElement.clientHeight / 40) * 100);
		const evf = () => {
			setheight((document.documentElement.clientHeight / 40) * 100);
		};
		window.addEventListener("resize", evf);
		return () => {
			window.removeEventListener("resize", evf);
		};
	}, []);
	return (
		<header
			style={
				height !== 0
					? { background: `linear-gradient(to bottom, #c8ceca 0%, #eadeb9, #e2a872 ${height}%)` }
					: {backgroundColor:'#c8ceca'}
			}
		>
			<script>

			</script>
			<a href="/">
				<Image src={logo.src} width={91} height={40} alt="logo" />
			</a>
			<a className={localstyle.create} href="/create">
				診断を作る
			</a>
		</header>
	);
}
