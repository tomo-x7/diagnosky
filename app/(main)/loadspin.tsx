export function LoadSpin({ width, color }: { width: number; color:string }) {
	return (
		<div
			style={{ width: width, height: width, borderColor: color, borderTopColor:'transparent' }}
			className="border-solid border-[3px] border-t-transparent rounded-[50%] animate-spin"
		/>
	);
}
