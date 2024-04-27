import { Redis } from "@upstash/redis";
import { TrendComponent } from "./trendcomponent";
const redis = Redis.fromEnv();

export default async function Page() {
	const data: Array<string> = await redis.zrange("trend", 0, '+inf', { byScore: true });
	return (
		<>
			{data.map((value,index) => {
				return <TrendComponent key={index.toString()} id={value} />;
			})}
		</>
	);
}
