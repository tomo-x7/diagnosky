"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import type * as mytype from "./mytype";
import generate from "./generate";
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);
export default function Page({ params }: { params: { id: string } }) {
	const [pages, setpages] = useState(0);
	const [DBdata, setDBdata] = useState<mytype.DBdata>({ id: 0, template: "", type: "random", random: [], title: "" });
	const [error,seterror]=useState('')
	const [ans,setans]=useState('')
	//loading
	if (DBdata.title === "") {
		supabase
			.from("diagnosky_name")
			.select()
			.eq("id", params.id)
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
				setpages(1)
			});
	}

	const clickgenerate = () => {
		const name=(document.getElementById('name')as HTMLInputElement ).value
		setans(generate(name,DBdata.type,{id:Number.parseInt(params.id),template:DBdata.template,list:DBdata.random}))
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
								<div>{DBdata.title}</div>
								<input type="text" id="name" placeholder="名前を入力" />
								<button type="button" onClick={clickgenerate}>
									診断
								</button>
							</>
						);
					case 2:
						console.log("2");
						return <div>{ans}</div>;
					case -1:
						return <div>{error}</div>;
					default:
						break;
				}
			})()}
		</>
	);
}
