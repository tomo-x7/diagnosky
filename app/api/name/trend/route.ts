import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(rawreq: NextRequest) {
	const req = await rawreq.json();
	const id = req.id;
	const newc = redis.incr(`name_${id}`);
	return NextResponse.json({ count: newc })
}


