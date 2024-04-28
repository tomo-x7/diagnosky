"use client";

import type * as mytype from "../../../../mytype";
import { useState, useEffect } from "react";
import generate from "./generate";

export default function Sinndann({ id, DBdata }: { id: string; DBdata: mytype.DBdata }) {
	const [pages, setpages] = useState(1);
	const [error, seterror] = useState("");
	const [ans, setans] = useState("");
	const [defaultname, setdefaultname] = useState("");
	useEffect(() => {
		const _name = localStorage.getItem("name");
		if (_name) {
			setdefaultname(_name);
		}
	}, []);
	const clickgenerate = () => {
		fetch("/api/name/trend", { method: "POST", body: JSON.stringify({ id: id }) });
		const name = (document.getElementById("name") as HTMLInputElement).value;
		localStorage?.setItem("name", name);
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
								<button type="button" onClick={clickgenerate} className="bg-red">
									診断
								</button>
							</>
						);
					case 2: {
						const encodesharestring = encodeURIComponent(
							`${ans}\n#diagnosky #${DBdata.title}\nhttps://diagnosky.vercel.app/name/${id}`,
						);
						const encodesharetext = encodeURIComponent(`${ans}#diagnosky #${DBdata.title}`);
						const encodeshareurl = encodeURIComponent(`https://diagnosky.vercel.app/name/${id}`);
						return (
							<>
								<div >{ans}</div>
								<div >
									<div>結果をシェアする</div>
									<a
										href={`https://bsky.app/intent/compose?text=${encodesharestring}`}
										target="_blank"
										rel="noopener noreferrer"
										
									>
										Bluesky
									</a>
									<a
										href={`https://tokimeki.blue/shared?text=${encodesharestring}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										TOKIMEKI
									</a>
									<a
										href={`https://skyshare.uk/app/?sharedText=${encodesharetext}&sharedUrl=${encodeshareurl}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										Skyshare
									</a>
								</div>
								<button
									type="button"
									
									onClick={() => {
										setpages(1);
									}}
								>
									戻る
								</button>
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
