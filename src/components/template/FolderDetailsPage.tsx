"use client";

import loadStorage from "@/helpers/loadStorage";
import { useEffect, useState } from "react";
import Note from "../module/Note";
import { useParams } from "next/navigation";

type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };

export default function FolderDetailsPage() {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const param = useParams();
	useEffect(() => {
		const data = loadStorage();
		const folderNotes = data.notes.filter((note: NoteType) => note.folderId === param.folderId);
		setNotes(folderNotes);
		console.log(notes);
	}, []);
	return (
		<div>
			{notes.length === 0 && (
				<h1 className="bg-white rounded-lg m-6 drop-shadow p-16 text-center font-bold text-xl">Folder is empty</h1>
			)}
			{notes.map((note: { id: string; title: string; text: string }) => (
				<Note key={note.id} id={note.id} title={note.title} text={note.text} />
			))}
		</div>
	);
}
