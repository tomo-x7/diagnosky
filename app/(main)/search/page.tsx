import Trend from "../../trend/page";
export const revalidate=7200
export default function Page() {
	return (
		<>
			<h2>最近人気の診断</h2>
			<Trend />
		</>
	);
}
