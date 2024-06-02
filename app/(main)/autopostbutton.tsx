"use client";
import Image from "next/image";
import { AutoPost } from "./autopost";
import Bluesky from "@/app/static/Bluesky.png";
import { useState } from "react";
import { Logincomp } from "./login";

export function AutoPostButton() {
	const [autopostelem, setautopostelem] = useState<JSX.Element>();
	const autoPostClick = () => {
		const cookies = document.cookie.split(";");
		const encodeddid = cookies.find((value) => /did=/.test(value))?.split("=")[1];
		if(encodeddid){
			setautopostelem(<AutoPost close={()=>{setautopostelem(undefined)}}/>)
		}else{
			setautopostelem(<Logincomp setlogincomp={setautopostelem} changeLogin={()=>{setautopostelem(<AutoPost close={()=>{setautopostelem(undefined)}} />)}} />)
		}
	};

	return (
		<>
			<button type="button" onClick={autoPostClick}>
				<Image src={Bluesky.src} width={32} height={32} alt="" />
				Blueskyに投稿する(ログインが必要)
			</button>
			{autopostelem}
		</>
	);
}
