import fs from "node:fs/promises";
import { Builder } from "xml2js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://rxtjjnbocilskefknuac.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dGpqbmJvY2lsc2tlZmtudWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzA0MTcsImV4cCI6MjAyNjQ0NjQxN30.OKQLhyNIq1FFwr8OSMnf9bRYxQnQe8Fq7f_SNgqTFtY",
);
// xml に記述する URL のリスト作成
const urls = [];


/**
 * @type {{data:Array<{id:string}>}}
 */
const { data: IDs, error } = await supabase.from("diagnosky_name").select("id");
for (const { id } of IDs) {
	urls.push({ loc: `https://diagnosky.vercel.app/name/${id}` });
}


// xml 生成
const builder = new Builder();
const sitemap = {
	urlset: {
		$: {
			xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
		},
		url: urls,
	},
};
const xml = builder.buildObject(sitemap);
fs.writeFile("public/sitemap.xml", xml);
