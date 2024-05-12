//"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import type * as mytype from "../../../../mytype";
import generate from "./generate";
import style from "./style.module.css";
import type { Metadata } from "next";
import Sinndann from "./client";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);

export async function generateStaticParams() {
	return [{ id: '1' }]
}

export default async function Page({ params }: { params: { id: string } }) {
	let is404 = false
	const DBdata: mytype.DBdata = await supabase
		.from("diagnosky_name")
		.select()
		.eq("id", params.id)
		.then((data) => {
			if (!data.data) {
				throw new Error(data.statusText);
			}
			if (!data.data[0]) {
				is404 = true
			}
			return data.data[0];
		});
	if (is404) {
		return <><h1>404 not found</h1></>
	}
	return (
		<>
			<div className={style.description}>
				<h2>{DBdata.title}</h2>
				<div>{DBdata.description}</div>
				<div>
					<span>更新頻度：{(() => {
						switch (DBdata.type) {
							case 'fixed':
								return '固定'
							case 'random':
								return '毎回変化'
						}
					})()}</span>
				</div>
			</div>
			<div className={`${style.content} px-2 py-1`}>
				<Sinndann id={params.id} DBdata={DBdata} />
			</div>
		</>
	);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	let is404=false
	const DBdata: mytype.DBdata = await supabase
		.from("diagnosky_name")
		.select()
		.eq("id", params.id)
		.then((data) => {
			if (!data.data) {
				throw new Error(data.statusText);
			}
			if (!data.data[0]) {
				is404 = true
			}
			return data.data[0];
		});
	if(is404){
		return {
			title: "notfound - diagnosky",
			description: "お探しのページが見つかりませんでした。URLをお確かめください。",
			openGraph: {
				title: "notfound - diagnosky",
				description: "お探しのページが見つかりませんでした。URLをお確かめください。",
				siteName: "diagnosky",
				locale: "ja-JP",
				type: "website",
			},
		};
	}

	return {
		title: `${DBdata.title} - diagnosky`,
		description: DBdata.description,
		openGraph: {
			title: `${DBdata.title} - diagnosky`,
			description: DBdata.description,
			siteName: "diagnosky",
			images: [`https://diagnosky.vercel.app/api/OGP/?title=${DBdata.title}`],
			locale: "ja-JP",
			type: "website",
		},
	};
}
