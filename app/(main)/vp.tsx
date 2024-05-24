"use client";

import { useEffect, useState } from "react";

export function VP({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let vp: HTMLElement | null
	if (typeof document !== "undefined") {
		vp = document.getElementById("vp");
	}
	const [testscale, settestscale] = useState('0')
	let [width,setwidth] = useState(0)
	const setwidth = () => {
		if (typeof window !== "undefined") {
			if (vp) {
				const scale = (window.innerWidth > 500 ? 1 : Math.sqrt(window.innerWidth / 500)).toString()
				vp.style.scale = scale;
				settestscale(scale)
				setwidth(window.innerWidth)
			}
		}
	};
	useEffect(() => {
		setwidth();
		window.addEventListener("resize", setwidth);
	});
	return (
		<div id="vp" style={{ maxWidth: 500, width: "98vw", transformOrigin: "top center" }}>
			{children}
			<div>width:{width}scale:{testscale}</div>
		</div>
	);
}
