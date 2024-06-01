"use client";
import Image from "next/image";
import { type Dispatch, type SetStateAction, useEffect } from "react";

export function UserSelectMenu({ avatarURL, changeLogin }: { avatarURL: URL; changeLogin: () => void }) {
	const openmenu = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		ev.stopPropagation();
		const menu = document.getElementById("userselectmenu-menu");
		if (menu) menu.style.display = "flex";
		console.log("open menu");
	};
	useEffect(() => {
		const closemenu = (ev: MouseEvent) => {
			console.log("close menu");
			const menu = document.getElementById("userselectmenu-menu");
			if (menu) menu.style.display = "none";
		};
		document.body.addEventListener("click", closemenu);
		return () => {
			document.body.removeEventListener("click", closemenu);
		};
	}, []);
	const logout = async () => {
		await fetch("/api/session/logout", { method: "POST" }).then((res) => {
			if (res.ok) {
				changeLogin()
			} else {
				window.alert(`${res.status} : ${res.statusText}`);
			}
		});
	};
	return (
		<div className="relative">
			<button type="button" className="border-none bg-transparent m-0 p-0 ml-2" onClick={openmenu}>
				<Image src={avatarURL.href} alt="usericon" width={32} height={32} className="rounded-full border border-black sp:h-[24px] sp:w-[24px]" />
			</button>
			<div id="userselectmenu-menu" style={{ display: "none" }} className="absolute rounded py-0.5 w-32 right-0 bg-white flex flex-col border border-black">
				<button type="button" onClick={logout} className="rounded-none p-0 mx-0 my-0.5 bg-transparent text-left border-none hover:bg-green hover:text-white w-full">
					ログアウト
				</button>
			</div>
		</div>
	);
}
