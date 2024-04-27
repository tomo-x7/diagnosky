import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(rawreq: NextRequest) {
	const req = await rawreq.json();
	const key = `name_${req.id}`;
	const newc = await redis.zincrby('trend',1,key)
	return NextResponse.json({ count: newc })
}


