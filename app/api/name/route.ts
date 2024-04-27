import type * as mytype from "../../mytype";
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const supabase = createClient(process.env.SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
export async function POST(rawreq: NextRequest) {
	const req: { description: string; template: string; type: mytype.generatetype; random: string[][]; title: string } =
		await rawreq.json();
	let iserror = false;
	let error = "";
	let id = 0;
	await supabase
		.from("diagnosky_name")
		.insert(req)
		.select()
		.then((data) => {
			if (!/2../.test(data.status.toString())) {
				iserror = true;
				error = data.statusText;
			}
			if (data.data) {
				id = data.data[0].id;
			}
		});
	revalidatePath(`/name/${id}`);
	await redis.lpush("latest", `name_${id}`);
	if (iserror) return NextResponse.json({ error: error }, { status: 400 });
	if (id === 0) return NextResponse.json(undefined, { status: 500 });
	return NextResponse.json({ id: id }, { status: 200 });
}
