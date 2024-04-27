import { Redis } from "@upstash/redis";
import { TrendComponent } from "./trendcomponent";
const redis = Redis.fromEnv();

export const dynamic = 'force-static'
export default async function Page() {
	const data: Array<string> = await redis.zrange("trend", 0, '+inf', { byScore: true });
	return (
		<>
		<div>{new Date().toISOString()}</div>
			{data.map((value,index) => {
				return <TrendComponent key={index.toString()} id={value} />;
			})}
		</>
	);
}
