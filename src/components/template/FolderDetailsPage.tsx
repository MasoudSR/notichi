"use client";

import loadStorage from "@/helpers/loadStorage";
import { useContext, useEffect, useState } from "react";
import Note from "../module/Note";
import { Context } from "@/app/provider";

type NoteType = {
	id: string;
	updatedAt: string | Date;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};
type FolderType = { id: string; updatedAt: string | Date; name: string; notesId: string[] };

export default function FolderDetailsPage() {
	const { pageId, setPageName, isMounted, setIsMounted } = useContext(Context);
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [folder, setFolder] = useState<FolderType>({ id: "", updatedAt: "", name: "", notesId: [] });
	useEffect(() => {
		const data = loadStorage();
		const folderNotes = data.notes.filter((note: NoteType) => note.folderId === pageId);
		const oldFolder = data.folders.find((item: FolderType) => item.id === pageId);
		setFolder(oldFolder);
		setNotes(folderNotes);
		setIsMounted(true);
	}, []);
	return (
		<div
			className={`${
				isMounted
					? "animate-fade-up animate-duration-150 animate-ease-out"
					: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
			}`}>
			<div
				className="m-6 font-medium flex justify-between bg-white rounded-lg py-3 px-5 cursor-pointer"
				onClick={() => {
					setIsMounted(false);
					setTimeout(() => setPageName!("editFolder"), 150);
				}}>
				<span>Folder Name</span>
				<span className="text-[#8A8A8E]">{folder.name}</span>
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
