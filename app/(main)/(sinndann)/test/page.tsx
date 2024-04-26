import { Testcomponent } from './testcomponent'
export const revalidate = 20;
export default async function Page() {

	return (
		<>
			<div>{new Date().toString()}</div>
			<div>component:<Testcomponent /></div>
		</>
	);
}