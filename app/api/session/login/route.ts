import { type NextRequest, NextResponse } from "next/server";
import { setcookies } from "../setcookie";

export async function POST(rawreq: NextRequest) {
	const req: { handle: string; password: string,PDS:string } = await rawreq.json();
	let iserror = false;
	if(!(/^([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(req.PDS))){
		return NextResponse.json({error:'wrong PDS'},{status:400})
	}
	const data: { accessJwt: string; refreshJwt: string; did: string } = await fetch(
		`https://${req.PDS}/xrpc/com.atproto.server.createSession`,
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
			return NextResponse.json({error:'ハンドルまたはパスワードが間違っています'},{status:400})
		}
	const res = new NextResponse();

	setcookies(res, data);

	return res;
}
