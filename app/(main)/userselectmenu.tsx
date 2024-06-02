"use client";
import Image from "next/image";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { LoadSpin } from "./loadspin";

export function UserSelectMenu({ avatarURL, changeLogin }: { avatarURL: URL; changeLogin: () => void }) {
    const [logouttext,setlogouttext]=useState<JSX.Element|string>('ログアウト')
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
	const logout = async (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('close')
		ev.stopPropagation();
        setlogouttext(<div className="w-full h-hull flex justify-center items-center"><LoadSpin width={14} color="#666" /></div>)
		await fetch("/api/session/logout", { method: "POST" }).then((res) => {
			if (res.ok) {
				changeLogin();
                const menu = document.getElementById("userselectmenu-menu");
                if (menu) menu.style.display = "none";
			} else {
				window.alert(`${res.status} : ${res.statusText}`);
			}
		});
        setlogouttext('ログアウト')
	};
	return (
		<div className="relative">
			<button type="button" className="border-none bg-transparent m-0 p-0 ml-2" onClick={openmenu}>
				<Image
					src={avatarURL.href}
					alt="usericon"
					width={32}
					height={32}
					className="rounded-full border border-black sp:h-[24px] sp:w-[24px]"
				/>
			</button>
			<div
				id="userselectmenu-menu"
				style={{ display: "none" }}
				className="absolute rounded py-0.5 w-32 right-0 bg-white flex flex-col border border-black"
			>
				<button
					type="button"
					onClick={(ev)=>{ev.stopPropagation();logout(ev)}}
					className="rounded-none p-0 mx-0 my-0.5 bg-transparent text-left border-none hover:bg-green hover:text-white w-full"
				>
					{logouttext}
				</button>
			</div>
		</div>
	);
}
