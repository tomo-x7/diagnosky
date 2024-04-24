import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get("id") ?? 0;
	revalidatePath(`/name/${id}`);
	return NextResponse.redirect(url.toString().replace(/api.*/, `/name/${id}`));
}
