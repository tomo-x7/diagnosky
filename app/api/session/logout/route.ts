import { type NextRequest, NextResponse } from "next/server";
import { deletecookies } from "../setcookie";

export async function POST(rawreq: NextRequest) {
	const cookies = rawreq.cookies;
	if (!cookies.get("refreshJwt")) {
		return new NextResponse(undefined, { status: 200 });
	}
	let iserror = false;
	await fetch("https://bsky.social/xrpc/com.atproto.server.deleteSession", {
		method: "POST",
		headers: { Authorization: `Bearer ${cookies.get("refreshJwt")?.value}` },
	})
		.then((res) =>{
            if(res.ok){
                return "ok"
            }
                return res.json()
        })
		.then((data) => {
            if(data==="ok"){
                return;
            }
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

	deletecookies(res);

	return res;
}
