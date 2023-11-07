"use client";

import Note from "@/components/module/Note";
import { useEffect, useState } from "react";

export default function Home() {
	const [notes, setNotes] = useState<{ title: string; text: string }[]>([]);
	useEffect(() => {
		setNotes(JSON.parse(localStorage.getItem("note") || ""));
	}, []);
	return (
		<main className="mb-20 flex flex-col items-center justify-between">
			{notes.map((note: { title: string; text: string }, index: number) => (
				<Note key={index} title={note.title} note={note.text} />
			))}
		</main>
	);
}
