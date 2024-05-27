import { type NextRequest, NextResponse } from "next/server";

export async function GET(rawreq: NextRequest) {
    const cookies = rawreq.cookies
    if (!cookies.get('refreshJwt')) {
        return NextResponse.json({}, { status: 401 })
    }
    const data: { accessJwt: string, refreshJwt: string, did: string } = await fetch('https://bsky.social/xrpc/com.atproto.server.refreshSession', {
        method: 'POST', headers: { Authorization: `Bearer ${cookies.get('refreshJwt')}` }
    }).then(res => res.json())

    const res = NextResponse.json({})

    res.cookies.set('did', data.did, {
        httpOnly: false,
        secure: true
    })
    res.cookies.set('refreshJwt', data.refreshJwt, {
        maxAge: 7770000,
        httpOnly: true,
        secure: true
    })
    res.cookies.set('accessJwt', data.accessJwt, {
        maxAge: 7770000,
        httpOnly: false,
        secure: true
    })
    return res;
}


