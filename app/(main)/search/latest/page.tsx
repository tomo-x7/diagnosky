import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";
import { TrendComponent } from "../../../trend/trendcomponent";

const redis = Redis.fromEnv();
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);
export const revalidate=1200
export default async function Page() {
	const data = await redis.lrange("latest", 0, 10);
	return (
		<>
			<h2>最新の診断</h2>
			{data.map((value, index) => {
				return <TrendComponent key={index.toString()} id={value} target={undefined} />;
			})}
		</>
	);
}
