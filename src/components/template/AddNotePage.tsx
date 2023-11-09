"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NoteFields from "../module/NoteFields";

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
		} else {
			const notes = localStorage.getItem("note") || "";
			if (!notes) {
				localStorage.setItem("note", JSON.stringify([note]));
			} else {
				const newNotes: { id: string; title: string; text: string }[] = JSON.parse(notes);
				newNotes.push(note);
				localStorage.setItem("note", JSON.stringify(newNotes));
			}
			router.push("/");
		}
	};
	return <NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={null} />;
}
