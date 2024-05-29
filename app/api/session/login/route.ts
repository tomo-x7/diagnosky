import { type NextRequest, NextResponse } from "next/server";
import { setcookies } from "../setcookie";

export async function POST(rawreq: NextRequest) {
	const req: { handle: string; password: string } = await rawreq.json();
	let iserror = false;
	const data: { accessJwt: string; refreshJwt: string; did: string } = await fetch(
		"https://bsky.social/xrpc/com.atproto.server.createSession",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				identifier: req.handle,
				password: req.password,
			}),
		},
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				console.log(data);
				iserror = true;
			}
			return data;
		});
		if(iserror){
			return new NextResponse(null,{status:400})
		}
	const res = new NextResponse();

	setcookies(res, data);

	return res;
}
