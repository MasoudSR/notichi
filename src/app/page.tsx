"use client";

import Note from "@/components/module/Note";
import loadStorage from "@/helpers/loadStorage";
import { useEffect, useState } from "react";

export default function Home() {
	const [notes, setNotes] = useState<{ id: string; title: string; text: string }[]>([]);
	useEffect(() => {
		const data = loadStorage()
		setNotes(data.notes)
	}, []);
	return (
		<main>
			{notes.map((note: { id: string; title: string; text: string }) => (
				<Note key={note.id} id={note.id} title={note.title} text={note.text} />
			))}
		</main>
	);
}
