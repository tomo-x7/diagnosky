"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type generatetype = "fixed" | "rondom";
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);
export default function Page({ params }: { params: { id: string } }) {
	const [nakami, setnakami] = useState(<div>loading</div>);
	let iserror = false;
	let data: {
		id: number;
		rondom: Array<Array<string>>;
		template: string;
		type: generatetype;
	};
	const click = () => {
		setnakami(<div>generate</div>)
		console.log("click");
		const name = (document.getElementById("name") as HTMLInputElement).value;
		const result = generate(name, data.type, data.rondom);
		console.log(result)
		setnakami(<div>result:{result}</div>);
	};
	supabase
		.from("sinndann_name")
		.select()
		.eq("id", params.id)
		.then((rawdata) => {
			if (!/2../.test(rawdata.status.toString()) || !rawdata.data || !rawdata.data[0]) {
				iserror = true;
				setnakami(<div>404</div>);
				return;
			}
			data = rawdata.data[0];
			setnakami(
				<div>
					<input id="name" type="text" placeholder="名前を入力" />
					<button type="button" onClick={click}>
						診断！
					</button>
				</div>,
			);
		});
	return nakami;
}

const generate = (name: string, type: generatetype, length: string[][]) => {
	return name;
};
