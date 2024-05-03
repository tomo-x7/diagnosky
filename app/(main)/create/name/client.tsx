"use client"
import { useState } from "react";
const lists: Array<React.ReactNode> = [];
export function Client() {
	const [forcerend, setforcerend] = useState(false);
	const forcerender = () => {
		setforcerend(!forcerend)
	}
	const list = (num: number) => (
		<div>
			<h4>list_{num + 1}</h4>
			<textarea className="list w-48" rows={8} id={`list_${num + 1}`} />
		</div>
	);

	const addlists = () => {
		lists.push(list(lists.length));
		forcerender();
	};
	const removelist = () => {
		lists.pop()
		forcerender()
	}
	if (lists.length === 0) {
		addlists();
	}
	const add = (str: string, select?: number, selectend?: number) => {
		const textarea = document.getElementById("template") as HTMLTextAreaElement;
		const value = textarea.value;
		const selectstart = textarea.selectionStart;
		textarea.value = value.substring(0, selectstart) + str + value.substring(textarea.selectionEnd);
		if (select) {
			console.log("setselect");
			textarea.focus();
			textarea.setSelectionRange(selectstart + select, selectstart + (selectend ?? select));
		}
	};

	const send = () => {
		const body = {
			title: (document.getElementById("title") as HTMLInputElement).value,
			type: (document.getElementById("type") as HTMLSelectElement).value,
			template: (document.getElementById("template") as HTMLInputElement).value,
			description: (document.getElementById('description') as HTMLInputElement).value,
			random: Array.from(document.getElementsByClassName("list") as HTMLCollectionOf<HTMLInputElement>)
				.map((elem) => elem.value)
				.map((str) => {
					return str.split("\n").filter((item) => item !== undefined && item !== "");
				})
				.filter((item) => item !== undefined && item.length !== 0),
		};
		if (!(body.title && body.template && body.type)) console.log(body);
		const reg = /\{list_(\d+?)\}/g;
		let iserror: boolean | string = false;
		let isfin = false;
		do {
			const execres = reg.exec(body.template);
			if (execres === null) {
				isfin = true;
				break;
			}
			if (Number.parseInt(execres[1]) > body.random.length) {
				iserror = "テンプレートに、まだ中身が設定されていない{list}があります";
				break;
			}
		} while (!(iserror || isfin));
		if (iserror) {
			window?.alert(iserror);
			return;
		}
		fetch("/api/name", { method: "POST", body: JSON.stringify(body) })
			.then((data) => {
				if (!data.ok) {
					window?.alert(`${data.status}:${data.statusText}`);
				}
				return data.json();
			})
			.then((data) => {
				window?.alert("作成しました！\n作成したページにリダイレクトします");
				location.href = `/name/${data.id}`;
			});
	};
	return (
		<>
			<h2>名前診断</h2>
			<h3>タイトル(30文字以内推奨)</h3>
			<input type="text" id="title" className="w-72" />
			<h3>説明</h3>
			<textarea id="description" className="w-72" rows={4} />
			<h3>更新頻度</h3>
			<select id="type">
				<option value="random">毎回変化</option>
				<option value="fixed">変化しない</option>
			</select>
			<h3>結果の文章</h3>
			<div>
				{"{name}"}で名前、{"{list_○}"}で生成された結果を埋め込めます
			</div>
			<textarea id="template" className="w-72" rows={4} />
			<br />
			<button type="button" id="addname" onClick={() => add("{name}", 6)}>
				{"{name}を追加"}
			</button>
			<button type="button" id="addlist" onClick={() => add("{list_1}", 6, 7)}>
				{"{list_○}を追加"}
			</button>
			<h3>リスト</h3>
			<div id="lists">
				{lists.map((value, key) => (
					<div key={key.toString()}>{value}</div>
				))}
			</div>
			<button type="button" onClick={removelist}>
				-
			</button>
			<button type="button" onClick={addlists}>
				+
			</button>
			<br />
			<div className="flex justify-center">
				<button type="button" onClick={send} className="block bg-green text-white w-10/12 text-2xl h-12 rounded-full mt-6">
					作成
				</button>
			</div>
		</>
	);
}