export const revalidate = 5;
export async function Testcomponent() {
	return (
		<>
            <div>{new Date().toString()}</div>
		</>
	);
}