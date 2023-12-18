"use client";

import { useContext, useEffect, useState } from "react";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder, deleteFromFolder } from "@/helpers/folderManager";
import { toast } from "react-toastify";
import { Context } from "@/app/provider";

export default function NoteDetailsPage() {
	const { setPageName, pageName ,changePage } = useContext(Context);

	const [note, setNote] = useState<{
		id: string;
		updatedAt: Date | string;
		title: string;
		text: string;
		folderId: string;
		folderName: string;
	}>({
		id: "",
		updatedAt: "",
		title: "",
		text: "",
		folderId: "",
		folderName: "",
	});

	const saveHandler = () => {
		const data = loadStorage();

		deleteFromFolder(data, note.id);
		addToFolder(data, note.id, note.folderId);

		const newDate = new Date();
		note.updatedAt = newDate;

		const index = data.notes.findIndex((item: { id: string }) => item.id === note.id);
		data.notes.splice(index, 1, note);
		saveStorage(data);
		toast.success("Note Edited Successfully");
		changePage("notes")
	};

	const deleteHandler = () => {
		const data = loadStorage();

		deleteFromFolder(data, note.id);

		const index = data.notes.findIndex((item: { id: string }) => item.id === note.id);
		data.notes.splice(index, 1);

		data.folders.notesId;

		data.removedItems.push(note.id);

		saveStorage(data);
		toast.success("Note Removed Successfully");
		changePage("notes")
	};

	useEffect(() => {
		const data = loadStorage();
		const oldNote = data.notes.find((note: { id: string; title: string; text: string }) => note.id === pageName.id);
		setNote(oldNote);
	}, []);
	return (
		<>
			<NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={deleteHandler} />
		</>
	);
}
