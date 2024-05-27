import { type NextRequest, NextResponse } from "next/server";


export async function POST(rawreq: NextRequest) {
	const req: { handle: string, password: string } = await rawreq.json();
	const data: { accessJwt: string, refreshJwt: string, did: string } = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
		method: 'POST', body: JSON.stringify({
			"identifier": req.handle,
			"password": req.password
		})
	}).then(res => res.json())

	const res = NextResponse.json({})

	res.cookies.set('did', data.did, {
		httpOnly: false,
		Secure: true
	})
	res.cookies.set('refreshJwt', data.refreshJwt, {
		maxAge: 7770000,
		httpOnly: true,
		Secure: true
	})
	res.cookies.set('accessJwt', data.accessJwt, {
		maxAge: 7770000,
		httpOnly: false,
		Secure: true
	})
	return res;
}


