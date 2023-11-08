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
		const notes = localStorage.getItem("note") || "";
		if (!notes) {
			localStorage.setItem("note", JSON.stringify([note]));
		} else {
			const newNotes: { id: string; title: string; text: string }[] = JSON.parse(notes);
			newNotes.push(note);
			localStorage.setItem("note", JSON.stringify(newNotes));
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
