import { Receiver } from "@upstash/qstash";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const receiver = new Receiver({
	currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "",
	nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "",
});

// ... in your request handler
export async function POST(req: NextRequest) {
	const signature = req.headers.get("Upstash-Signature");
	if(!signature){
		return new NextResponse(undefined,{status:401})
	}
	const body = await req.text();

	const isValid = await receiver.verify({
		body,
		signature,
		url: "https://diagnosky.vercel.app/api/refreshtrend",
	});
	if(!isValid){
		return new NextResponse(undefined,{status:403})
	}
	revalidatePath('/trend')
	await new Promise((r) => setTimeout(r, 500));
	await fetch('https://diagnosky.vercel.app/trend')
	return new NextResponse();
}
