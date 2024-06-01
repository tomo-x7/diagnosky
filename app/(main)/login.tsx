"use client";

import type { Dispatch, SetStateAction } from "react";

export function Logincomp({
	setlogincomp,
	changeLogin,
}: { setlogincomp: Dispatch<SetStateAction<JSX.Element | undefined>>; changeLogin: () => void }) {
	const login = async () => {
		const handle = (document.getElementById("handle") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		const PDS = (document.getElementById("selectPDS") as HTMLInputElement | undefined)?.value ?? "bsky.social";
		localStorage.setItem('PDS',PDS)
		await fetch("/api/session/login", { method: "POST", body: JSON.stringify({ handle: handle, password: password, PDS: PDS }) });
		setlogincomp(undefined);
		changeLogin();
	};
	return (
		<>
			<div
				id="loginbackground"
				className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-40 bg-black bg-opacity-50 w-[100vw] h-[100vh]"
			>
				<div className="relative bg-white flex flex-col justify-start [&>*]:w-fit">
					<h2>Login with Bluesky account</h2>
					<label>
						<input
							type="checkbox"
							id="optionalPDS"
							onChange={(ev) => {
								const elem = document.getElementById("selectPDS");
								if (!elem) return;
								if (ev.target.checked) {
									elem.style.display = "block";
								} else {
									elem.style.display = "none";
								}
							}}
						/>
						(オプション)PDSを選択する
					</label>
					<div id="selectPDS" style={{ display: "none" }}>
						PDS:
						<input type="text" defaultValue="bsky.social" />
					</div>
					<div>
						ハンドル:
						<input id="handle" type="text" />
					</div>
					<div>
						App password:
						<input id="password" type="password" />
					</div>
					<button type="button" onClick={login}>
						Login
					</button>
					<button
						type="button"
						className="absolute top-0 right-0 bg-transparent text-gray-500 font-black border-none text-xl p-0"
						onClick={() => {
							setlogincomp(undefined);
						}}
					>
						<svg
							version="1.1"
							id="_x32_"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 512 512"
							style={{ width: "20px", height: "20px" }}
							xmlSpace="preserve"
						>
							<title>close</title>
							<g>
								<polygon
									points="512,89.75 422.256,0.005 256.004,166.256 89.754,0.005 0,89.75 166.255,256 0,422.25 89.754,511.995 
		256.004,345.745 422.26,511.995 512,422.25 345.744,256 	"
									style={{ fill: "#4B4B4B" }}
								/>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
