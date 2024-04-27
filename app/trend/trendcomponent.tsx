import { createClient } from "@supabase/supabase-js";
import type * as mytype from "../mytype";
import style from "./trendcomponent.module.css";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);

export async function TrendComponent({ id }: { id: string }) {
	const key = id.split("_");
	const data: mytype.DBdata = await supabase
		.from(`diagnosky_${key[0]}`)
		.select()
		.eq("id", key[1])
		.then((data) => {
			if (!(/2../.test(data.status.toString()) && data.data?.[0])) {
				throw Error(data.statusText);
			}
			return data.data[0];
		});
	return (
		<>
			<div className={style.wrapper}>
				<a href={`/name/${data.id}`} target="_parent" className={style.link}>
					<h4 className={style.title}>{data.title}</h4>
					<p className={style.description}>{data.description}</p>
				</a>
			</div>
			<hr className={style.hr} />
		</>
	);
}
