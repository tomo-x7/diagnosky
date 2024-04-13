"use client";

import { useState } from "react";
const lists: Array<React.ReactNode> = [];
export default function page() {
	const [bool, forcerender] = useState(false);
	const list = (num: number) => <textarea className="list" id={`list_${num}`} />;

	const addlists = () => {
		lists.push(list(lists.length));
		forcerender(bool ? false : true);
	};
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
		fetch("/api/name", { method: "POST", body: JSON.stringify(body) }).then((data) => {
			if (!data.ok) {
				window?.alert(`${data.status}:${data.statusText}`);
			}
			return data.json()		
			}).then((data)=>{
				window?.alert('作成しました！\n作成したページにリダイレクトします')
				location.href=`/name/${data.id}`
			});
	};
	return (
		<>
			<h2>名前診断</h2>
			<h3>タイトル</h3>
			<input type="text" id="title" />
			<h3>更新頻度</h3>
			<select id="type">
				<option value="random">毎回変化</option>
				<option value="fixed">変化しない</option>
			</select>
			<h3>結果の文章</h3>
			<div>
				{"{name}"}で名前、{"{list_○}"}で生成された結果を埋め込めます
			</div>
			<textarea id="template" />
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
			<button type="button" onClick={addlists}>
				追加
			</button>
			<button type="button" onClick={send}>
				作成
			</button>
		</>
	);
}
