"use client";
import Note from "@/components/module/Note";
import { useEffect } from "react";

export default function Home() {
	const notes = JSON.parse(localStorage.getItem("note"));
	return (
		<main className="flex flex-col items-center justify-between">
			{notes.map((note) => (
				<Note title={note.title} note={note.text} />
			))}
		</main>
	);
}
