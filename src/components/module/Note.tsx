import Link from "next/link";

export default function Note({ id, title, note }: { id: string; title: string; note: string }) {
	return (
		<Link href={id}>
			<div className="bg-slate-300 p-2 m-3 rounded-lg">
				<h4 className="bg-slate-50 p-2 m-1 rounded-lg">{title}</h4>
				<p className="bg-slate-50 p-2 m-1 rounded-lg">{note}</p>
			</div>
		</Link>
	);
}
