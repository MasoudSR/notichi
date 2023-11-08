import Link from "next/link";

export default function Note({ id, title, note }: { id: string; title: string; note: string }) {
	return (
		<Link href={`/note/${id}`}>
			<div className="bg-white rounded-lg m-4 drop-shadow">
				<h4 className="text-xl font-bold p-5">{title}</h4>
				<p className="border-t-2 border-[#f2f2f7] p-5">{note}</p>
			</div>
		</Link>
	);
}
