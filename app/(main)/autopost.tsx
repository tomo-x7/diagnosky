"use client";

import type { Dispatch, SetStateAction } from "react";

export function AutoPost({close}:{close:()=>void}) {
	return (
		<>
			<div
				id="autopostbackground"
				className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-40 bg-black bg-opacity-50 w-[100vw] h-[100vh]"
			>
				<div className="relative bg-white flex flex-col justify-start [&>*]:w-fit [&_input]:border-solid invalid:[&_input]:border-red-600">
					<h2>Blueskyに投稿する</h2>
					<button
						type="button"
						className="absolute top-0 right-0 bg-transparent text-gray-500 font-black border-none text-xl p-0"
						onClick={() => {
							close()
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