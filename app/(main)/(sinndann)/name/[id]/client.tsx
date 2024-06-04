"use client";

import type * as mytype from "@/app/mytype";
import { useState, useEffect } from "react";
import generate from "./generate";
import Image from "next/image";
import style from "./style.module.css";
import { AutoPostButton } from "@/app/(main)/autopostbutton";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

import Bluesky from "@/app/static/Bluesky.png";
import skyshare from "@/app/static/skyshare.png";
import tokimeki from "@/app/static/tokimeki.png";
import Twitter from "@/app/static/Twitter.png";
import copy from "@/app/static/copy.svg";
import check from "@/app/static/check.png";
import share from "@/app/static/share.png";

const settrendper = 1; // 1/nの確率でトレンドカウント

export default function Sinndann({ id, DBdata }: { id: string; DBdata: mytype.DBdata }) {
	const [pages, setpages] = useState(1);
	const [error, seterror] = useState("");
	const [ans, setans] = useState("");
	const [defaultname, setdefaultname] = useState("");
	if (typeof window === "object") {
		const _name = localStorage.getItem("name");
		if (_name && defaultname !== _name) {
			setdefaultname(_name);
		}
	}
	const clickgenerate = () => {
		if (Math.floor(Math.random() * settrendper) === 0) {
			fetch("/api/name/trend", { method: "POST", body: JSON.stringify({ id: id }) });
		}
		let name = (document.getElementById("name") as HTMLInputElement).value;
		if (name === "") {
			name = "名無しの権兵衛";
		} else {
			localStorage?.setItem("name", name);
		}
		setdefaultname(name);
		setans(
			generate(name, DBdata.type, {
				id: Number.parseInt(id),
				template: DBdata.template,
				list: DBdata.random,
			}),
		);
		setpages(2);
	};
	const [copysrc, setcopysrc] = useState<string | StaticImport>(copy.src);
	switch (pages) {
		case 1:
			return (
				<div className="flex flex-col min-h-[165px] mt-[5px] justify-center items-center px-8 gap-4">
					<input
						type="text"
						id="name"
						placeholder="名前を入力"
						defaultValue={defaultname}
						className="h-12 text-2xl py-6 px-3 w-full"
						onKeyDown={(e) => {
							if (e.key === "Enter") clickgenerate();
						}}
					/>
					<button
						type="button"
						onClick={clickgenerate}
						className="bg-green text-white h-10 rounded-full text-3xl px-16 shadow-lg hover:shadow-none"
					>
						診断
					</button>
				</div>
			);
		case 2: {
			const sharestring = `${ans}\n#diagnosky #${DBdata.title}\nhttps://diagnosky.vercel.app/name/${id}`;
			const sharetext = `${ans}#diagnosky #${DBdata.title}`;
			const shareurl = `https://diagnosky.vercel.app/name/${id}`;
			const encodesharestring = encodeURIComponent(sharestring);
			const encodesharetext = encodeURIComponent(sharetext);
			const encodeshareurl = encodeURIComponent(shareurl);
			const shareiconsize = 32;
			return (
				<div className="flex flex-col justify-between h-full min-h-[170px]">
					<div className="text-lg">{ans}</div>
					<div>
						<div>
							<AutoPostButton />
							<div>結果をシェアする</div>
							<div className={`${style.share} gap-2 `}>
								<a
									title="Bluesky"
									href={`https://bsky.app/intent/compose?text=${encodesharestring}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image src={Bluesky.src} width={shareiconsize} height={shareiconsize} alt="Bluesky" />
								</a>
								<a
									title="TOKIMEKI"
									href={`https://tokimeki.blue/shared?text=${encodesharestring}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image src={tokimeki.src} width={shareiconsize} height={shareiconsize} alt="TOKIMEKI" />
								</a>
								<a
									title="Skyshare"
									href={`https://skyshare.uk/app/?sharedText=${encodesharetext}&sharedUrl=${encodeshareurl}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image src={skyshare.src} width={shareiconsize} height={shareiconsize} alt="Skyshare" />
								</a>
								<a
									title="Twitter"
									href={`https://twitter.com/intent/tweet?text=${encodesharestring}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image src={Twitter.src} width={shareiconsize} height={shareiconsize} alt="Twitter" />
								</a>
								<button
									title="Copy"
									className="bg-white border-none p-0 rounded-none"
									type="button"
									onClick={async () => {
										await navigator.clipboard.writeText(sharestring);
										setcopysrc(check.src);
										setTimeout(() => {
											setcopysrc(copy.src);
										}, 1000);
									}}
								>
									<Image src={copysrc} width={shareiconsize} height={shareiconsize} alt="copy" />
								</button>
								<button
									title="Share"
									className="bg-white border-none p-0 rounded-none"
									type="button"
									onClick={async () => {
										seterror("");
										const sharebody: ShareData = { text: sharetext, url: shareurl };
										await navigator.share(sharebody);
									}}
								>
									<Image src={share.src} width={shareiconsize} height={shareiconsize} alt="share" />
								</button>
							</div>
						</div>
						<button
							className="w-fit bg-green text-white pr-2"
							type="button"
							onClick={() => {
								seterror("");
								setpages(1);
							}}
						>
							＜{"  "}戻る
						</button>
					</div>
					<span className="text-red-600">{error}</span>
				</div>
			);
		}
		case -1:
			return <div>{error}</div>;
		default:
			return <>error</>;
	}
}
