"use client";

import { useContext, useEffect, useState } from "react";
import NoteFields from "../module/NoteFields";
// import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder, deleteFromFolder } from "@/helpers/folderManager";
import { toast } from "react-hot-toast";
import { Context } from "@/app/provider";
import syncHandler from "@/helpers/syncHandler";

export default function NoteDetailsPage() {
	const { pageName ,changePage , setIsSyncing , data , setData } = useContext(Context);

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
		const newData = data;

		deleteFromFolder(newData!, note.id);
		addToFolder(newData!, note.id, note.folderId);

		const newDate = new Date();
		note.updatedAt = newDate;

		const index = newData!.notes.findIndex((item: { id: string }) => item.id === note.id);
		newData!.notes.splice(index, 1, note);
		saveStorage(newData! , setData);
		toast.success("Note Edited Successfully");
		changePage("notes")
		syncHandler("auto" , setIsSyncing , setData)
	};

	const deleteHandler = () => {
		const newData = data;

		deleteFromFolder(newData!, note.id);

		const index = newData!.notes.findIndex((item: { id: string }) => item.id === note.id);
		newData!.notes.splice(index, 1);

		// newData!.folders.notesId;

		newData!.removedItems.push(note.id);

		saveStorage(newData! , setData);
		toast.success("Note Removed Successfully");
		changePage("notes")
		syncHandler("auto" , setIsSyncing , setData)
	};

	useEffect(() => {
		const newData = data;
		const oldNote = newData!.notes.find((note: { id: string; title: string; text: string }) => note.id === pageName.id);
		setNote(oldNote!);
	}, []);
	return (
		<>
			<NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={deleteHandler} />
		</>
	);
}
