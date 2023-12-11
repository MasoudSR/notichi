"use client";

import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder } from "@/helpers/folderManager";
import { toast } from "react-toastify";
import { Context } from "@/app/provider";

export default function AddNotePage() {
	const { pageName, setPageName } = useContext(Context);

	const [note, setNote] = useState<{ id: string; title: string; text: string; folderId: string; folderName: string }>({
		id: "",
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
			setPageName("notes");
		} else {
			const data = loadStorage();
			addToFolder(data, note.id, note.folderId);
			data.notes.push(note);
			saveStorage(data);
			toast.success("Note Added Successfully");
			setPageName("notes");
		}
	};
	return <NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={null} />;
}
