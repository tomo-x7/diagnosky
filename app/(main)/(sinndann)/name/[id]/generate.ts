// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { createHash, randomInt } from "crypto";
import type * as mytype from "../../../../mytype";

export default function generate(name: string, type: mytype.generatetype, params: mytype.generateparams) {
	const nums = generatenums(name, type, params);
	let ret = params.template.replaceAll('{name}',name)
	for (const i in params.list) {
		ret = ret.replaceAll(`{list_${(Number.parseInt(i)+1).toString()}}`, nums[i]);
	}
	return ret;
}

const generatenums = (name: string, type: mytype.generatetype, params: mytype.generateparams) => {
	const ret: Array<string> = [];
	for (const i in params.list) {
		const num = generatenum(type)(name, params, Number.parseInt(i));
		ret.push(params.list[i][num]);
	}
	return ret;
};
const generatenum = (type: mytype.generatetype) => {
	switch (type) {
		case "fixed":
			return fixed;
		case "random":
			return random;
	}
};
const fixed = (name: string, params: mytype.generateparams, i: number) => {
	const hash = createHash("md5").update(name).update(params.id.toString()).update(i.toString()).digest("hex").substring(0,10);
	const num = Number.parseInt(hash, 16) % params.list[i].length;
    //console.log(`hash:${hash}\n${Number.parseInt(hash, 16)}\n${params.list[i].length}`)
	return num;
};
const random = (name: string, params: mytype.generateparams, i: number) => {
	return Math.floor(Math.random()*params.list[i].length)
};
