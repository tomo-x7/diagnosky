"use client";

import { useEffect } from "react";

export function Trend() {
	useEffect(() => {
		const elm = document.getElementById("iframe") as HTMLIFrameElement;

		// 子画面のコンテンツサイズに合わせてサイズを変更する関数
		function changeParentHeight() {
			console.log("change height");
			elm.height = `${(elm.contentWindow?.document.body.offsetHeight ?? 150) + 10}px`;
			elm.style.visibility = "visible";
		}
		changeParentHeight();
	}, []);

	return (
		<>
			<h2>最近人気の診断</h2>
			<iframe
				id="iframe"
				src="/trend"
				scrolling="no"
				title="trend"
				style={{ visibility: "hidden" }}
				className="m-0 border-none w-full overflow-hidden "
			/>
		</>
	);
}
