import loadStorage from "@/helpers/loadStorage";
import React, { useEffect, useState } from "react";

type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };
type FolderType = { id: string; name: string; notesId: string[] };

export default function AddToFolder({
	note,
	setNote,
	setShowFolders,
}: {
	note: NoteType;
	setNote: React.Dispatch<React.SetStateAction<NoteType>>;
	setShowFolders: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [folders, setFolders] = useState<FolderType[]>([]);

	const addToFolderHandler = (folder: FolderType) => {
		setNote({ ...note, folderId: folder.id, folderName: folder.name });
		setShowFolders(false);
	};

	useEffect(() => {
		const data = loadStorage();
		setFolders(data.folders);
	}, []);
	return (
		<div className="bg-white fixed rounded-3xl w-screen max-w-4xl transition bottom-0 z-20 h-[50%] p-6 drop-shadow">
			{folders.map((folder) => (
				<button
					key={folder.id}
					onClick={() => addToFolderHandler(folder)}
					className="bg-white rounded-b-lg rounded-tr-lg m-5 drop-shadow p-8 relative text-center flex-1">
					<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
					{folder.name}
				</button>
			))}
		</div>
	);
}
