"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NoteFields from "../module/NoteFields";

export default function NoteDetailsPage() {
	const router = useRouter();
	const params = useParams();
	const [note, setNote] = useState<{ id: string; title: string; text: string }>({ id: "", title: "", text: "" });

	const saveHandler = () => {
		const notes = JSON.parse(localStorage.getItem("note") || "");
		const index = notes.findIndex((item: { id: string }) => item.id === note.id);
		notes.splice(index, 1, note);
		localStorage.setItem("note", JSON.stringify(notes));
		router.push("/");
	};

	const deleteHandler = () => {
		const notes = JSON.parse(localStorage.getItem("note") || "");
		const index = notes.findIndex((item: { id: string }) => item.id === note.id);
		notes.splice(index, 1);
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
		<>
			<NoteFields note={note} setNote={setNote} saveHandler={saveHandler} />
			<button
				className="inline-block text-center bg-red-500 text-white p-3 rounded-lg ml-6 shadow-md shadow-red-500/30 w-28"
				onClick={deleteHandler}>
				Delete
			</button>
		</>
	);
}
