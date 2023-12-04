"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import saveStorage from "@/helpers/saveStorage";
import loadStorage from "@/helpers/loadStorage";

type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };
type FolderType = { id: string; name: string; notesId: string[] };

export default function EditFolderPage() {
	const [folder, setFolder] = useState({ id: "", name: "", notesId: [] });
	const router = useRouter();
	const param = useParams();
	useEffect(() => {
		const data = loadStorage();
		const oldFolder = data.folders.find((item: FolderType) => item.id === param.folderId);
		setFolder(oldFolder);
	}, []);
	const saveHandler = () => {
		if (folder.name === "") {
			alert("folder name can't empty");
		} else {
			const data = loadStorage();
			const folderIndex = data.folders.findIndex((item: FolderType) => item.id === folder.id);
			data.folders.splice(folderIndex, 1, folder);
			const newNotes = data.notes.map((note: NoteType) => {
				note.folderId === folder.id && (note.folderName = folder.name);
				return note;
			});
			data.notes = newNotes;

			saveStorage(data);
			router.push(`/folders/${param.folderId}`);
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
			}
			return note;
		});
		data.notes = newNotes;
		data.removedItems.push(folder.id)
		saveStorage(data);
		router.push(`/folders/`);
	};
	return (
		<div className="m-6">
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
