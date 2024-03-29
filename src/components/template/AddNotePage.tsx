"use client";

import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder } from "@/helpers/folderManager";
import { toast } from "react-hot-toast";
import { Context } from "@/app/provider";
import syncHandler from "@/helpers/syncHandler";

export default function AddNotePage() {
	const { changePage } = useContext(Context);

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

	useEffect(() => {
		const id: string = nanoid();
		setNote({ ...note, id });
	}, []);

	const saveHandler = () => {
		if (note.title === "" && note.text === "") {
			changePage("notes");
		} else {
			const data = loadStorage();
			addToFolder(data, note.id, note.folderId);
			const newDate = new Date();
			note.updatedAt = newDate;
			data.notes.push(note);
			saveStorage(data);
			toast.success("Note Added Successfully");
			changePage("notes");
			syncHandler("auto")
		}
	};
	return <NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={null} />;
}
