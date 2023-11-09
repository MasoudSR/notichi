"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function AddNotePage() {
	const [note, setNote] = useState<{ id: string; title: string; text: string }>({ id: "", title: "", text: "" });
	const router = useRouter();

	useEffect(() => {
		const id: string = nanoid();
		setNote({ ...note, id });
	}, []);

	const saveHandler = () => {
		if (note.title === "" && note.text === "") {
			router.push("/");
		}else{
		const notes = localStorage.getItem("note") || "";
		if (!notes) {
			localStorage.setItem("note", JSON.stringify([note]));
		} else {
			const newNotes: { id: string; title: string; text: string }[] = JSON.parse(notes);
			newNotes.push(note);
			localStorage.setItem("note", JSON.stringify(newNotes));
		}
		router.push("/");}
	};
	return (
		<div className="m-4 ">
			<input
				type="text"
				className="block w-full p-4 text-[#232326] border-gray-300 rounded-lg border focus:outline-[#0070F2]"
				placeholder="Title"
				value={note.title}
				onChange={(e) => setNote({ ...note, title: e.target.value })}
			/>
			<textarea
				rows={10}
				className="border border-gray-300 text-[#232326] text-sm rounded-lg block w-full p-4 mt-2 focus:outline-[#0070F2]"
				placeholder="Note"
				value={note.text}
				onChange={(e) => setNote({ ...note, text: e.target.value })}
			/>
			<button className="bg-[#017AFF] text-white font-medium p-3 rounded-lg mt-3 drop-shadow w-28" onClick={saveHandler}>
				Save
			</button>
			<button className="bg-white p-3 rounded-lg ml-5 drop-shadow w-20" onClick={()=>router.push("/")}>Cancel</button>
		</div>
	);
}
