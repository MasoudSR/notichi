"use client";

import loadStorage from "@/helpers/loadStorage";
import { useEffect, useState } from "react";
import Note from "../module/Note";
import { useParams } from "next/navigation";
import Link from "next/link";

type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };
type FolderType = { id: string; name: string; notesId: string[] };

export default function FolderDetailsPage() {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [folder, setFolder] = useState<FolderType>({ id: "", name: "", notesId: [] });
	const param = useParams();
	useEffect(() => {
		const data = loadStorage();
		const folderNotes = data.notes.filter((note: NoteType) => note.folderId === param.folderId);
		const oldFolder = data.folders.find((item: FolderType) => item.id === param.folderId);
		setFolder(oldFolder);
		setNotes(folderNotes);
	}, []);
	return (
		<div>
			<div>
				<Link
					href={`/folders/edit/${param.folderId}`}
					className="m-6 font-medium flex justify-between bg-white rounded-lg py-3 px-5">
					<span>Folder Name</span>
					<span className="text-[#8A8A8E]">{folder.name}</span>
				</Link>
			</div>
			{notes.length === 0 && (
				<h1 className="bg-white rounded-lg m-6 drop-shadow p-16 text-center font-bold text-xl">Folder is empty</h1>
			)}
			{notes.map((note: { id: string; title: string; text: string }) => (
				<Note key={note.id} id={note.id} title={note.title} text={note.text} />
			))}
		</div>
	);
}
