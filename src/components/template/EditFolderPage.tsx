"use client";
import { useContext, useEffect, useState } from "react";
import saveStorage from "@/helpers/saveStorage";
import loadStorage from "@/helpers/loadStorage";
import { toast } from "react-toastify";
import { Context } from "@/app/provider";
import { loadSettings } from "@/helpers/settingsManager";

type NoteType = {
	id: string;
	updatedAt: string | Date;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};
type FolderType = { id: string; updatedAt: string | Date; name: string; notesId: string[] };

export default function EditFolderPage() {
	const { pageName, isMounted, setIsMounted, changePage } = useContext(Context);
	const [folder, setFolder] = useState<FolderType>({ id: "", updatedAt: "", name: "", notesId: [] }); 
	const [settings , setSettings] = useState(loadSettings)

	useEffect(() => {
		const data = loadStorage();
		const oldFolder = data.folders.find((item: FolderType) => item.id === pageName.id);
		setFolder(oldFolder);
		setIsMounted(true);
	}, []);

	const saveHandler = () => {
		if (folder.name === "") {
			toast.error("folder name can't empty");
		} else {
			const newDate = new Date();
			folder.updatedAt = newDate;

			const data = loadStorage();
			const folderIndex = data.folders.findIndex((item: FolderType) => item.id === folder.id);
			data.folders.splice(folderIndex, 1, folder);
			const newNotes = data.notes.map((note: NoteType) => {
				note.folderId === folder.id && (note.folderName = folder.name);
				return note;
			});
			data.notes = newNotes;

			saveStorage(data);
			toast.success("Folder Edited Successfully");
			changePage("folder");
		}
	};

	const deleteHandler = () => {
		const data = loadStorage();
		const folderIndex = data.folders.findIndex((item: FolderType) => item.id === folder.id);
		data.folders.splice(folderIndex, 1);
		const newNotes = data.notes.map((note: NoteType) => {
			if (note.folderId === folder.id) {
				note.folderName = "";
				note.folderId = "";
				const newDate = new Date();
				note.updatedAt = newDate;
			}
			return note;
		});
		data.notes = newNotes;
		data.removedItems.push(folder.id);
		saveStorage(data);
		toast.success("Folder Removed Successfully");
		changePage("folders");
	};
	return (
		<div
			className={`m-6 ${ settings.animations ? 
				isMounted
					? "animate-fade-up animate-duration-150 animate-ease-out"
					: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse" : ""
			}`}>
			<input
				type="text"
				className="block w-full p-4 text-[#232326] border-gray-300 rounded-lg border focus:outline-[#0070F2] caret-[#0070F2]"
				placeholder="Folder Name"
				value={folder.name}
				onChange={(e) => setFolder({ ...folder, name: e.target.value })}
			/>
			<div className="grid gap-6 grid-cols-3 mt-4">
				<button
					className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 col-span-2"
					onClick={saveHandler}>
					Save
				</button>
				<button className="bg-red-500 text-white p-3 rounded-lg shadow-md shadow-red-500/30" onClick={deleteHandler}>
					Delete
				</button>
			</div>
		</div>
	);
}
