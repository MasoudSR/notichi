import { Context } from "@/app/provider";
import { useContext } from "react";

export default function Note({ id, title, text }: { id: string; title: string; text: string }) {
	const { setPageId, changePage } = useContext(Context);

	return (
		<div
			className="bg-white rounded-lg m-6 drop-shadow cursor-pointer"
			onClick={() => {
				changePage("note");
				setPageId(id);
			}}>
			{title !== "" && <h4 className="text-xl font-bold p-5">{title}</h4>}
			{text !== "" && (
				<p className={`${title !== "" && "border-t-2"} border-[#f2f2f7] p-5 whitespace-pre-line truncate`}>{text}</p>
			)}
		</div>
	);
}
