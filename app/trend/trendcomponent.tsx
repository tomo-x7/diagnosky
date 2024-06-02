import { createClient } from "@supabase/supabase-js";
import type * as mytype from "../mytype";
import style from "./trendcomponent.module.css";
import Link from "next/link";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

export async function TrendComponent({ id, target }: { id: string; target: string | undefined }) {
	const key = id.split("_");
	const data: mytype.DBdata | undefined = await supabase
		.from(`diagnosky_${key[0]}`)
		.select()
		.eq("id", key[1])
		.then((data) => {
			if (!(/2../.test(data.status.toString()) && data.data?.[0])) {
				console.log(data.statusText);
				return;
			}
			return data.data[0];
		});
	if (!data) {
		return (
			<>
				<div className={`${style.wrapper} ${style.notfound}`}>
					<h3 className={style.title}>見つかりません</h3>
					<p className="line-clamp-1 my-1.5 sp:my-1">削除された可能性があります</p>
				</div>
			</>
		);
	}
	return (
		<>
			<div className={style.wrapper}>
				<Link href={`/name/${data.id}`} target={target} className={style.link}>
					<h3 className={style.title}>{data.title}</h3>
					<p className="line-clamp-2 my-1.5 sp:my-1">{data.description}</p>
				</Link>
			</div>
		</>
	);
}
