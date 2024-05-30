"use client";
import { Logincomp } from "./login";
import { useEffect, useState } from "react";
import Image from "next/image";

export function LoginButton() {
	const [Login, setLogin] = useState(<div />);
	const [buttonAndAvatar,setbuttonAndAvatar]=useState<'Login'|URL>('Login')
	useEffect(() => {
		console.log("effect");
		const cookies = document.cookie.split(";");
		const encodeddid = cookies.find((value) => /did=/.test(value))?.split("=")[1];
		if (encodeddid) {
			fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeddid}`)
				.then((res) => res.json())
				.then((data) => data.avatar)
				.then((avatar) => {
					const avatarURL = new URL(avatar)
					setbuttonAndAvatar(avatarURL)
				});
		} else {
		}
	}, []);
	return buttonAndAvatar==='Login' ? (
		<>
			<button
				type="button"
				onClick={() => {
					setLogin(<Logincomp setlogincomp={setLogin} />);
				}}
				className="flex items-center justify-center h-[32px] text-white no-underline bg-green rounded-full px-[15px] py-[7px] m-[5px] shadow-lg hover:shadow-none sp:text-xs sp:px-[10px] sp:py-[4.6px] sp:h-[22px] sp:my-[3px]"
			>
				login
			</button>
			{Login}
		</>
	) : (
		<Image src={buttonAndAvatar.href} alt="usericon" width={32} height={32} className="rounded-full border border-black" />
	);
}
