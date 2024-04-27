import { Receiver } from "@upstash/qstash";
import { type NextRequest, NextResponse } from "next/server";

const receiver = new Receiver({
	currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "",
	nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "",
});

// ... in your request handler
export async function POST(req: NextRequest) {
	const signature = req.headers.get("Upstash-Signature") ?? "";
	const body = await req.text();

	const isValid = await receiver.verify({
		body,
		signature,
		url: "https://diagnosky.vercel.app/api/refreshtrend",
	});
	console.log(isValid)
	console.log(body)
	return NextResponse.json({ issuccess:isValid });
}
