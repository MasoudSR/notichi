"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NoteFields from "../module/NoteFields";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { addToFolder } from "@/helpers/folderManager";

export default function AddNotePage() {
	const [note, setNote] = useState<{ id: string; title: string; text: string; folderId: string; folderName: string }>({
		id: "",
		title: "",
		text: "",
		folderId: "",
		folderName: "",
	});
	const router = useRouter();

	useEffect(() => {
		const id: string = nanoid();
		setNote({ ...note, id });
	}, []);

	const saveHandler = () => {
		if (note.title === "" && note.text === "") {
			router.push("/");
		} else {
			const data = loadStorage();
			addToFolder(data, note.id, note.folderId);
			data.notes.push(note);
			saveStorage(data);
			router.push("/");
		}
	};
	return <NoteFields note={note} setNote={setNote} saveHandler={saveHandler} deleteHandler={null} />;
}
