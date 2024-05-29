"use client";

import type { Dispatch, SetStateAction } from "react";

export function AutoPost() {
	return (
		<>
			<div
				id="loginbackground"
				className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-40 bg-black bg-opacity-50 w-[100vw] h-[100vh]"
			>
				<div className="bg-white">
					<h2>Login with Bluesky account</h2>
					<textarea />
					<button
						type="button"
					>
						close
					</button>
				</div>
			</div>
		</>
	);
}