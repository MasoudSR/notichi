"use client";

import { useContext, useEffect, useState } from "react";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder, deleteFromFolder } from "@/helpers/folderManager";
import { toast } from "react-hot-toast";
import { Context } from "@/app/provider";
import syncHandler from "@/helpers/syncHandler";

export default function NoteDetailsPage() {
	const { pageName ,changePage } = useContext(Context);

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
		syncHandler("auto")
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
		syncHandler("auto")
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
