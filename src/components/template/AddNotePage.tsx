"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNotePage() {
	const [note, setNote] = useState<{ title: string; text: string }>({ title: "", text: "" });
	const router = useRouter();

	const saveHandler = () => {
		const notes = JSON.parse(localStorage.getItem("note") || "");
		if (!notes) {
			localStorage.setItem("note", JSON.stringify([note]));
		} else {
			notes.push(note);
			localStorage.setItem("note", JSON.stringify(notes));
		}
		router.push("/");
	};
	return (
		<div className="flex flex-col bg-slate-300 m-4 p-5 rounded-lg">
			<input
				type="text"
				className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
				placeholder="Title"
				value={note.title}
				onChange={(e) => setNote({ ...note, title: e.target.value })}
			/>
			<textarea
				rows={4}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
				placeholder="Note"
				value={note.text}
				onChange={(e) => setNote({ ...note, text: e.target.value })}
			/>
			<button className="bg-sky-200 p-5 rounded-lg mt-3" onClick={saveHandler}>
				Save
			</button>
		</div>
	);
}
