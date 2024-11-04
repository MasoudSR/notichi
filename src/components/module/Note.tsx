import { Context } from "@/app/provider";
import { useContext } from "react";

export default function Note({ id, title, text }: { id: string; title: string; text: string }) {
	const { changePage } = useContext(Context);

	return (
		<div
			className="bg-white rounded-lg m-6 drop-shadow cursor-pointer"
			onClick={() => {
				changePage("note", id);
			}}>
			{title !== "" && (
				<h4 className="text-xl font-bold p-5" style={{ unicodeBidi: "plaintext" }}>
					{title}
				</h4>
			)}
			{text !== "" && (
				<p
					className={`${title !== "" && "border-t-2"} border-[#f2f2f7] p-5 whitespace-pre-line truncate`}
					style={{ unicodeBidi: "plaintext" }}>
					{text}
				</p>
			)}
		</div>
	);
}
