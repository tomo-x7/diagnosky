export const dynamic = 'force-static'
import type { Metadata } from "next";
import { Client } from "./client";
const lists: Array<React.ReactNode> = [];
export default function Page(){
	return <Client />
}
export const metadata:Metadata={
	title:"名前診断を作成する"
}
