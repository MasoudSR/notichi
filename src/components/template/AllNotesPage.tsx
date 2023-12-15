"use client";

import { Context } from "@/app/provider";
import Note from "@/components/module/Note";
import loadStorage from "@/helpers/loadStorage";
import React, { useContext, useEffect, useState } from "react";

type DataType = {
	updatedAt: string | Date;
	notes: { id: string; updatedAt: string | Date; title: string; text: string; folderId: string; folderName: string }[];
	folders: { id: string; updatedAt: string | Date; name: string; notesId: string[] }[];
};
type NoteType = {
	id: string;
	updatedAt: string | Date;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};

export default function AllNotesPage() {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [data, setData] = useState<DataType>();
	const { isMounted, setIsMounted } = useContext(Context);

	useEffect(() => {
		const storageData = loadStorage();
		setData(storageData);
		setNotes(storageData.notes);
		setIsMounted(true);
	}, []);

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		const filteredNotes = data!.notes.filter((note) => note.title.includes(value) || note.text.includes(value));
		setNotes(filteredNotes);
	};

	return (
		<main
			className={`flex flex-col ${
				isMounted
					? "animate-fade-up animate-duration-150 animate-ease-out"
					: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
			}`}>
			<div className="mx-6 mt-6">
				<input
					type="text"
					className="bg-[#E3E3E8] rounded-lg w-full p-3"
					placeholder="Search"
					onChange={searchHandler}
				/>
			</div>
			{notes.map((note: { id: string; title: string; text: string }) => (
				<Note key={note.id} id={note.id} title={note.title} text={note.text} />
			))}
		</main>
	);
}
