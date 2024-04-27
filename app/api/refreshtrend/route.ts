import { Receiver } from "@upstash/qstash";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { Redis, type ScoreMember } from "@upstash/redis";

const redis = Redis.fromEnv();
const receiver = new Receiver({
	currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "",
	nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "",
});

// ... in your request handler
export async function POST(req: NextRequest) {
	const signature = req.headers.get("Upstash-Signature");
	if (!signature) {
		return new NextResponse(undefined, { status: 401 });
	}
	const body = await req.text();

	const isValid = await receiver.verify({
		body,
		signature,
		url: "https://diagnosky.vercel.app/api/refreshtrend",
	});
	if (!isValid) {
		return new NextResponse(undefined, { status: 403 });
	}

	revalidatePath("/trend");
	await new Promise((r) => setTimeout(r, 100));
	await fetch("https://diagnosky.vercel.app/trend");
	await new Promise((r) => setTimeout(r, 100));
	await fetch("https://diagnosky.vercel.app/trend");

	const olddata: Array<string> = await redis.zrange("trend", 0, -1, { withScores: true });
	const backupdata: Array<ScoreMember<string>> = [];
	for (let i = 0; i < olddata.length / 2; i++) {
		backupdata.push({ member: olddata[2 * i], score: Number.parseInt(olddata[2 * i + 1]) });
	}
	await redis.zadd("trendbackup", { member: "nodata", score: -5 }, ...backupdata);
	await redis.del("trend");

	const latestlen = await redis.llen("latest");
	if (latestlen > 21) {
		await redis.rpop("latest", latestlen - 20);
	}

	return new NextResponse();
}
