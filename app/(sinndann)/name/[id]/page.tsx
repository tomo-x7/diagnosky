//"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import type * as mytype from "./mytype";
import generate from "./generate";
import style from "./style.module.css";
import type { Metadata } from "next";
import Sinndann from "./client";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);

export const revalidate=Infinity

export default async function Page({ params }: { params: { id: string } }) {
	const DBdata: mytype.DBdata = await supabase
		.from("diagnosky_name")
		.select()
		.eq("id", params.id)
		.then((data) => {
			if (!data.data?.[0]) {
				throw new Error(data.statusText);
			}
			return data.data[0];
		});
	return (
		<>
			<div className={style.description}>
				<h2>{DBdata.title}</h2>
				<div>{DBdata.description}</div>
			</div>
			<div className={style.content}>
				<Sinndann id={params.id} DBdata={DBdata} />
			</div>
		</>
	);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const DBdata: mytype.DBdata = await supabase
		.from("diagnosky_name")
		.select()
		.eq("id", params.id)
		.then((data) => {
			if (!data.data?.[0]) {
				throw new Error(data.statusText);
			}
			return data.data[0];
		});

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
