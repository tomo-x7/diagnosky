import type { NextResponse } from "next/server";

export function setcookies(res: NextResponse, { did, refreshJwt, accessJwt }: { did?: string; refreshJwt?: string; accessJwt?: string }) {
	if (did) {
		res.cookies.set("did", did, {
			maxAge: 7770000,
			httpOnly: false,
			secure: true,
		});
	}
	if (refreshJwt) {
		res.cookies.set("refreshJwt", refreshJwt, {
			maxAge: 7770000,
			httpOnly: true,
			secure: true,
		});
	}
	if (accessJwt) {
		res.cookies.set("accessJwt", accessJwt, {
			maxAge: 7000,
			httpOnly: false,
			secure: true,
		});
	}

	return res;
}
export function deletecookies(res:NextResponse){
	res.cookies.set("did","")
	res.cookies.set("refreshJwt","")
	res.cookies.set("accessJwt","")
}