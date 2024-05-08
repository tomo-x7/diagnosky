import Trend from "../../trend/page";
import { Tab } from "./tab";
export const revalidate = 7200;
export const dynamic = "force-static";
export default function Page() {
	return (
		<>
			<Tab current="人気" />
			<h2>最近人気の診断</h2>
			<Trend />
		</>
	);
}
