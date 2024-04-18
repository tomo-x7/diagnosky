export const dynamic = 'force-static'
export default function Page() {
	return (
		<>
        <h1><span style={{display:'inline-block'}}>オリジナル診断を</span><wbr /><span style={{display:'inline-block'}}>作成する</span></h1>
			<div id="name">
				<h2>
					<a href="/create/name">名前診断</a>
				</h2>
                <p>名前からランダムで結果を生成するタイプの診断を作成できます</p>
			</div>
		</>
	);
}
