import { type NextRequest, NextResponse } from "next/server";
import { setcookies } from "../setcookie";

export async function GET(rawreq: NextRequest) {
	const cookies = rawreq.cookies;
	if (!cookies.get("refreshJwt")) {
		return NextResponse.json({}, { status: 401 });
	}
	let iserror = false;
	const data: { accessJwt: string; refreshJwt: string; did: string } = await fetch(
		"https://bsky.social/xrpc/com.atproto.server.refreshSession",
		{
			method: "POST",
			headers: { Authorization: `Bearer ${cookies.get("refreshJwt")?.value}` },
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
	if (iserror) {
		return new NextResponse(null, { status: 400 });
	}
	const res = new NextResponse();

	setcookies(res, data);

	return res;
}
