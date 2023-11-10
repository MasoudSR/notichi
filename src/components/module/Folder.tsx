import Link from "next/link";

export default function Folder({ id, name }: { id: string; name: string }) {
	return (
		<Link
			href={`folders/${id}`}
			className="bg-white rounded-b-lg rounded-tr-lg m-5 drop-shadow p-8 relative text-center flex-1">
			<div>
				<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
				{name}
			</div>
		</Link>
	);
}
