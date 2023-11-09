"use client";

import Note from "@/components/module/Note";
import { useEffect, useState } from "react";

export default function Home() {
	const [notes, setNotes] = useState<{ id: string; title: string; text: string }[]>([]);
	useEffect(() => {
		const notes: string | null = localStorage.getItem("note");
		if (notes) {
			setNotes(JSON.parse(notes));
		}
	}, []);
	return (
		<main className="mb-28">
			{notes.map((note: { id: string; title: string; text: string }) => (
				<Note key={note.id} id={note.id} title={note.title} text={note.text} />
			))}
		</main>
	);
}
