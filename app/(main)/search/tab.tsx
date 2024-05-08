import type { ReactNode } from "react";

export function Tab({ current }: { current: string }) {
	return <></>
	// biome-ignore lint/correctness/noUnreachable: <explanation>
	const tab: Array<ReactNode> = [];
	const list: Array<[name: string, URL: string]> = [
		["人気", "/search"],
		["最新", "/search/latest"],
	];
	list.map((value, index) => {
		if (current === value[0]) {
			tab.push(<span key={index.toString()}>{value[0]}</span>);
		} else {
			tab.push(
				<a href={value[1]} key={index.toString()}>
					{value[0]}
				</a>,
			);
		}
	});
	return <div className="flex gap-5">{tab}</div>;
}
