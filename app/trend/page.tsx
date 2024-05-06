import { Redis } from "@upstash/redis";
import { TrendComponent } from "./trendcomponent";
const redis = Redis.fromEnv();

export const dynamic = "force-static";
export default async function Page() {
	const data: Array<string> = await redis.zrange("trend", 0, 10, { rev: true });
	return (
		<>
			{data.map((value, index) => {
				return <TrendComponent key={index.toString()} id={value} target="_parent" />;
			})}
		</>
	);
}
