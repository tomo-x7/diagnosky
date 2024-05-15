"use client";
import logo from "./logo.png";
import localstyle from "./layout.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
	const [height, setheight] = useState(0);
	const [testwidth,settestwidth]=useState("0x0")
	useEffect(() => {
		setheight((document.documentElement.clientHeight / 40) * 100);
		settestwidth(`${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`)
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
					: { backgroundColor: '#c8ceca' }
			}
		>
			<a href="/">
				<Image className="my-[2px]" src={logo.src} width={91} height={40} alt="logo" />
			</a>
			<a href="/search/" className="">人気</a>
			<a href="/search/latest/" className="">最新</a>
			<a className={`${localstyle.create} shadow-lg hover:shadow-none`} href="/create">
				診断を作る
			</a>
			<div style={{position:"fixed",right:0,bottom:0}}>{testwidth}</div>
		</header>
	);
}
