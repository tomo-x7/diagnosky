export const revalidate = 60;
export async function Testcomponent() {
	return (
		<>
            <div>{new Date().toString()}</div>
		</>
	);
}