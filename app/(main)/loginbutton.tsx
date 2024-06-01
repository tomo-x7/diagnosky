"use client";
import { Logincomp } from "./login";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserSelectMenu } from "./userselectmenu";

export function LoginButton() {
	const [Login, setLogin] = useState<JSX.Element>();
	const [buttonAndAvatar, setbuttonAndAvatar] = useState<"Login" | URL>("Login");
	useEffect(() => {
		const cookies = document.cookie.split(";");
		const encodeddid = cookies.find((value) => /did=/.test(value))?.split("=")[1];
		if (encodeddid) {
			fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeddid}`)
				.then((res) => res.json())
				.then((data) => data.avatar)
				.then((avatar) => {
					const avatarURL = new URL(avatar);
					setbuttonAndAvatar(avatarURL);
				});
		} else {
		}
	}, []);
	const whenchangeloginstate = () => {
		const cookies = document.cookie.split(";");
		const encodeddid = cookies.find((value) => /did=/.test(value))?.split("=")[1];
		if (encodeddid) {
			fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeddid}`)
				.then((res) => res.json())
				.then((data) => data.avatar)
				.then((avatar) => {
					const avatarURL = new URL(avatar);
					setbuttonAndAvatar(avatarURL);
				});
		} else {
			setbuttonAndAvatar('Login')
		}
	};
	return buttonAndAvatar === "Login" ? (
		<>
			<button
				type="button"
				onClick={() => {
					setLogin(<Logincomp setlogincomp={setLogin} changeLogin={whenchangeloginstate} />);
				}}
				className="flex items-center justify-center h-[32px] text-white no-underline bg-green rounded-full px-[7px] py-[7px] m-[5px] shadow-lg hover:shadow-none sp:text-xs sp:px-[4.6px] sp:py-[4.6px] sp:h-[22px] sp:my-[3px]"
			>
				ログイン
			</button>
			{Login}
		</>
	) : (
		<UserSelectMenu avatarURL={buttonAndAvatar} changeLogin={whenchangeloginstate} />
	);
}
