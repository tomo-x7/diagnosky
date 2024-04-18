"use client";

import type * as mytype from "./mytype";
import { useState } from "react";
import generate from "./generate";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export default function Sinndann({ id }: { id: string }) {
	const [pages, setpages] = useState(0);
	const [DBdata, setDBdata] = useState<mytype.DBdata>({
		id: 0,
		template: "",
		description: "",
		type: "random",
		random: [],
		title: "",
	});
	const [error, seterror] = useState("");
	const [ans, setans] = useState("");
	//loading
	if (DBdata.title === "") {
		const supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
		);
		supabase
			.from("diagnosky_name")
			.select()
			.eq("id", id)
			.then((data) => {
				if (!/2../.test(data.status.toString())) {
					seterror(`${data.status}:${data.statusText}`);
					setpages(-1);
					return;
				}
				if (!data.data?.[0]) {
					seterror("404 not found");
					setpages(-1);
					return;
				}
				setDBdata(data.data[0]);
				setpages(1);
			});
	}

	const clickgenerate = () => {
		const name = (document.getElementById("name") as HTMLInputElement).value;
		localStorage.setItem("name", name);
		setans(
			generate(name, DBdata.type, {
				id: Number.parseInt(id),
				template: DBdata.template,
				list: DBdata.random,
			}),
		);
		setpages(2);
	};
	return (
		<>
			{(() => {
				switch (pages) {
					case 0:
						return <>loading</>;
					case 1:
						return (
							<>
								<input
									type="text"
									id="name"
									placeholder="名前を入力"
									defaultValue={localStorage.getItem("name") ?? ""}
								/>
								<button type="button" onClick={clickgenerate}>
									診断
								</button>
							</>
						);
					case 2: {
						const encodesharetext = encodeURIComponent(
							`${ans}\n\n#diagnosky #${DBdata.title}\nhttps://diagnosky.vercel.app/name/${id}`,
						);
						return (
							<>
								<div>{ans}</div>
								<a
									href={`https://bsky.app/intent/compose?text=${encodesharetext}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Blueskyでシェア
								</a>
								<a
									href={`https://tokimeki.blue/shared?text=${encodesharetext}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									TOKIMEKIでシェア
								</a>
							</>
						);
					}
					case -1:
						return <div>{error}</div>;
					default:
						break;
				}
			})()}
		</>
	);
}
