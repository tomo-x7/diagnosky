"use client";

import type * as mytype from "./mytype";
import { useState } from "react";
import generate from "./generate";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export default function Sinndann({ id, DBdata }: { id: string, DBdata: mytype.DBdata }) {
	const [pages, setpages] = useState(1);
	const [error, seterror] = useState("");
	const [ans, setans] = useState("");
	const defaultname = localStorage?.getItem("name") ?? ""
	const clickgenerate = () => {
		const name = (document.getElementById("name") as HTMLInputElement).value;
		localStorage?.setItem("name", name);
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
					case 1:
						return (
							<>
								<input
									type="text"
									id="name"
									placeholder="名前を入力"
									defaultValue={defaultname}
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
