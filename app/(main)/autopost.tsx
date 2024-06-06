"use client";

import { BskyAgent, RichText } from "@atproto/api";
import { useState } from "react";
import { LoadSpin } from "./loadspin";

export function AutoPost({ close, sharetext }: { close: () => void; sharetext: string }) {
	const [ButtonText,setButtonText]=useState<'投稿する'|JSX.Element>('投稿する')
	const [error,seterror]=useState<string|undefined>(undefined)
	const post = async () => {
		setButtonText(<LoadSpin width={16} color="#000000" />)
		const service = `https://${localStorage.getItem("PDS") ?? "bsky.social"}`;
		const cookies = document.cookie.split(";");
		const encodeddid = cookies.find((value) => /did=/.test(value))?.split("=")[1];
		let encodedaccessJwt = cookies.find((value) => /accessJwt=/.test(value))?.split("=")[1];
		if (!encodedaccessJwt) {
			await fetch("/api/session/refresh");
			encodedaccessJwt = cookies.find((value) => /accessJwt=/.test(value))?.split("=")[1];
		}
		const text = new RichText({ text: "テスト #テスト\n@tomo-x.bsky.social https://example.com" });
		const agent = new BskyAgent({ service: service });
		await text.detectFacets(agent);
		// await fetch(`${service}/xrpc/com.atproto.repo.createRecord`, {
		// 	body: JSON.stringify({
		// 		collection: "app.bsky.feed.post",
		// 		repo: decodeURIComponent(encodeddid ?? ""),
		// 		record: { text: text.text, facets: text.facets, createdAt: new Date().toISOString(), $type: "app.bsky.feed.post" },
		// 	}),
		// 	method: "POST",
		// 	headers:{Authorization: `Bearer ${decodeURIComponent(encodedaccessJwt??"")}`,"Content-Type":"application/json"}
		// });
	};
	return (
		<>
			<div
				id="autopostbackground"
				className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-40 bg-black bg-opacity-50 w-[100vw] h-[100vh]"
			>
				<div className="relative bg-white flex flex-col justify-start [&>*]:w-fit [&_input]:border-solid invalid:[&_input]:border-red-600">
					<h2>Blueskyに投稿する</h2>
					<textarea id="comment" placeholder="追加したいコメントはここへ" maxLength={300 - sharetext.length} />
					<div className="text-red-600">{error}</div>
					<button type="button" onClick={post}>
						{ButtonText}
					</button>
					<button
						type="button"
						className="absolute top-0 right-0 bg-transparent text-gray-500 font-black border-none text-xl p-0"
						onClick={() => {
							close();
						}}
					>
						<svg
							version="1.1"
							id="_x32_"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 512 512"
							style={{ width: "20px", height: "20px" }}
							xmlSpace="preserve"
						>
							<title>close</title>
							<g>
								<polygon
									points="512,89.75 422.256,0.005 256.004,166.256 89.754,0.005 0,89.75 166.255,256 0,422.25 89.754,511.995 
		256.004,345.745 422.26,511.995 512,422.25 345.744,256 	"
									style={{ fill: "#4B4B4B" }}
								/>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
