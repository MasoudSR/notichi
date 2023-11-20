import Link from "next/link";

export default function Note({ id, title, text }: { id: string; title: string; text: string }) {
	return (
		<div className="bg-white rounded-lg m-6 drop-shadow">
			<Link href={`/note/${id}`}>
				{title !== "" && <h4 className="text-xl font-bold p-5">{title}</h4>}
				{text !== "" && <p className={`${title !== "" && "border-t-2"} border-[#f2f2f7] p-5 whitespace-pre-line truncate`}>{text}</p>}
			</Link>
		</div>
	);
}
