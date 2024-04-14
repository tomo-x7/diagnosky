import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import background from "./background.png";

export function GET(req: NextRequest) {
	const params = new URL(req.url).searchParams;
    let title = decodeURIComponent(params.get("title")??'')
    if(title.length>35){
        title=`${title.substring(0,35)}…`
    }

	const elem = (
		<>
			<div style={{ display: "flex", position: "relative", width: "1200px", height: "630px" }}>
				<img
					style={{ display: "flex", position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
					src={`${req.url.replace(/\/api\/OGP.*/, "")}${background.src}`}
					alt="background"
				/>
				<div style={{ display: "flex",fontSize:'100px',height:'420px',padding:"10px 50px"}}>{title}</div>
			</div>
		</>
	);
	return new ImageResponse(elem, { width: 1200, height: 630 });
}
