"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder, deleteFromFolder } from "@/helpers/folderManager";

export default function NoteDetailsPage() {
	const router = useRouter();
	const params = useParams();
	const [note, setNote] = useState<{ id: string; title: string; text: string; folderId: string; folderName: string }>({
		id: "",
		title: "",
		text: "",
		folderId: "",
		folderName: "",
	});

	const saveHandler = () => {
		const data = loadStorage();

		deleteFromFolder(data, note.id);
		addToFolder(data, note.id, note.folderId);

		const index = data.notes.findIndex((item: { id: string }) => item.id === note.id);
		data.notes.splice(index, 1, note);
		saveStorage(data);

		router.push("/");
	};

	const deleteHandler = () => {
		const data = loadStorage();

		deleteFromFolder(data, note.id);

		const index = data.notes.findIndex((item: { id: string }) => item.id === note.id);
		data.notes.splice(index, 1);

		data.folders.notesId;
		saveStorage(data);
		router.push("/");
	};

	useEffect(() => {
		const { noteId } = params;
		const data = loadStorage();
		const oldNote = data.notes.find((note: { id: string; title: string; text: string }) => note.id === noteId);
		setNote(oldNote);
	}, []);
	return (
		<>
			<NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={deleteHandler} />
		</>
	);
}
