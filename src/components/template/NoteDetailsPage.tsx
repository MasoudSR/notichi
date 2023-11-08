"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NoteDetailsPage() {
    const router = useRouter()
	const params = useParams();
	const [note, setNote] = useState<{ id: string; title: string; text: string }>({ id: "", title: "", text: "" });

	const saveHandler = () => {
		const notes = JSON.parse(localStorage.getItem("note") || "");
		const index = notes.findIndex((item: { id: string }) => item.id === note.id);
		notes.splice(index, 1, note);
		localStorage.setItem("note", JSON.stringify(notes));
		router.push("/");
	};

	useEffect(() => {
		const { noteId } = params;
		const notes = JSON.parse(localStorage.getItem("note") || "");
		const oldNote = notes.find((note: { id: string; title: string; text: string }) => note.id === noteId);
		setNote(oldNote);
	}, []);
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
