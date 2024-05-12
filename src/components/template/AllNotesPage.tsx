"use client";

import { Context } from "@/app/provider";
import Note from "@/components/module/Note";
import loadStorage from "@/helpers/loadStorage";
import { loadSettings } from "@/helpers/settingsManager";
import React, { useContext, useEffect, useState } from "react";
import { CgFileAdd } from "react-icons/cg";

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
	// const [data, setData] = useState<DataType>();
	const { isMounted, setIsMounted, prevPageName, selectedPageName, data } = useContext(Context);
	const [settings, setSettings] = useState({ animations: true });
	const [search, setSearch] = useState("");

	useEffect(() => {
		// const storageData = loadStorage();
		// setData(storageData);
		setNotes(data?.notes ?? []);
		setIsMounted(true);
		setSettings(loadSettings);
	}, [data]);

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setSearch(value);
		const filteredNotes = data!.notes.filter((note) => note.title.includes(value) || note.text.includes(value));
		setNotes(filteredNotes);
	};

	const animations = settings.animations
		? isMounted
			? prevPageName.name === "folders" || prevPageName.name === "settings"
				? "animate-fade-right animate-duration-150 animate-ease-out"
				: "animate-fade-up animate-duration-150 animate-ease-out"
			: selectedPageName === "folders" || selectedPageName === "settings"
			? "animate-fade-out-left animate-duration-150 animate-ease-out"
			: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
		: "";

	return (
		<main className={`flex flex-col ${animations}`}>
			<div className="mx-6 mt-6">
				<input
					type="text"
					className="bg-[#E3E3E8] rounded-lg w-full p-3"
					placeholder="Search"
					value={search}
					onChange={searchHandler}
				/>
			</div>
			{notes.length > 0 ? (
				notes.map((note: { id: string; title: string; text: string }) => (
					<Note key={note.id} id={note.id} title={note.title} text={note.text} />
				))
			) : search.length > 0 ? (
				<p className="flex justify-center mt-7">There are no matching results</p>
			) : (
				<div className="flex flex-col items-center justify-center mt-7">
					<div>You have no notes</div>
					<div className="flex justify-center items-center gap-1">
						Use <CgFileAdd /> button to add new note.
					</div>
				</div>
			)}
		</main>
	);
}
