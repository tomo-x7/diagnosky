
export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
	
	return (
		<>
			<div>id:{params.id}</div>
            <div>{new Date().toString()}</div>
		</>
	);
}