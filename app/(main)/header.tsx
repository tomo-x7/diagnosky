"use client";
import logo from "./logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoginButton } from "./loginbutton";

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
			className="fixed top-0 flex w-[484px] justify-end h-11 py-px z-30 items-end sp:w-[calc(100%-16px)] sp:h-[30px]"
			style={
				height !== 0
					? { background: `linear-gradient(to bottom, #c8ceca 0%, #eadeb9, #e2a872 ${height}%)` }
					: { backgroundColor: "#c8ceca" }
			}
		>
			<div className="flex justify-between grow items-end">
				<a href="/">
					<Image className="my-[2px] sp:h-[26px] sp:w-[60px]" src={logo.src} width={91} height={40} alt="logo" />
				</a>
				<a href="/search/" className="sp:text-xs">
					人気
				</a>
				<a href="/search/latest/" className="sp:text-xs">
					最新
				</a>
				<a
					className="flex items-center justify-center h-[32px] text-white no-underline bg-green rounded-full px-[15px] py-[7px] m-[5px] shadow-lg hover:shadow-none sp:text-xs sp:px-[10px] sp:py-[4.6px] sp:h-[22px] sp:my-[3px]"
					href="/create"
				>
					診断を作る
				</a>
			</div>
			<LoginButton />
		</header>
	);
}
