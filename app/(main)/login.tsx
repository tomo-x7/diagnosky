"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { LoadSpin } from "./loadspin";

export function Logincomp({
	setlogincomp,
	changeLogin,
}: { setlogincomp: Dispatch<SetStateAction<JSX.Element | undefined>>; changeLogin: () => void }) {
	const [LoginButton, setLoginButton] = useState<JSX.Element | string>("Login");
	const [errormessage, seterrormessage] = useState<string | undefined>();
	const login = async () => {
		setLoginButton(<LoadSpin width={20} color="#000" />);
		seterrormessage(undefined);
		const handle = (document.getElementById("handle") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		const PDS = (document.getElementById("selectPDS") as HTMLInputElement | undefined)?.value ?? "bsky.social";
		localStorage.setItem("PDS", PDS);
		await fetch("/api/session/login", { method: "POST", body: JSON.stringify({ handle: handle, password: password, PDS: PDS }) }).then(
			async (res) => {
				if (res.ok) {
					setlogincomp(undefined);
					changeLogin();
				} else {
					try {
						const data = await res.json();
						seterrormessage(data.message ?? data.error ?? `${res.status} : ${res.statusText}`);
					} catch {
						seterrormessage(`${res.status} : ${res.statusText}`);
					}
					setLoginButton('Login')
				}
			},
		);
	};
	return (
		<>
			<div
				id="loginbackground"
				className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-40 bg-black bg-opacity-50 w-[100vw] h-[100vh]"
			>
				<div className="relative bg-white flex flex-col justify-start [&>*]:w-fit [&_input]:border-solid invalid:[&_input]:border-red-600">
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
						<input
							className="border-solid invalid:border-red-600"
							required
							type="text"
							defaultValue="bsky.social"
							placeholder="bsky.social"
							pattern="^([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$"
						/>
					</div>
					<div>
						ハンドル:
						<input
							id="handle"
							type="text"
							placeholder="example.bsky.social"
							pattern="^([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$"
							required
						/>
					</div>
					<div>
						App password:
						<input id="password" type="password" required />
					</div>
					<div>{errormessage}</div>
					<button type="button" onClick={login}>
						{LoginButton}
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
