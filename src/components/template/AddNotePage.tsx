"use client";

import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import NoteFields from "../module/NoteFields";
// import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder } from "@/helpers/folderManager";
import { toast } from "react-hot-toast";
import { Context } from "@/app/provider";
import syncHandler from "@/helpers/syncHandler";
import { useSession } from "next-auth/react";

export default function AddNotePage() {
	const { changePage, setIsSyncing, data, setData, notification } = useContext(Context);

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

	const { status } = useSession();

	useEffect(() => {
		const id: string = nanoid();
		setNote({ ...note, id });
	}, []);

	const saveHandler = () => {
		if (note.title === "" && note.text === "") {
			changePage("notes");
		} else {
			const newData = data;
			addToFolder(newData!, note.id, note.folderId);
			const newDate = new Date();
			note.updatedAt = newDate;
			newData!.notes.push(note);
			setData(newData);
			saveStorage(newData!);
			notification("noteCheck")
			changePage("notes");
			syncHandler("auto", setIsSyncing, setData, notification, status);
		}
	};
	return <NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={null} />;
}
