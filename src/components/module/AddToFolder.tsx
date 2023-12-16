import { Context } from "@/app/provider";
import loadStorage from "@/helpers/loadStorage";
import React, { useContext, useEffect, useState } from "react";
import { LuFolderPlus } from "react-icons/lu";

type NoteType = {
	id: string;
	updatedAt: Date | string;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};
type FolderType = { id: string; updatedAt: string | Date; name: string; notesId: string[] };

export default function AddToFolder({
	note,
	setNote,
	showFolders,
	setShowFolders,
}: {
	note: NoteType;
	showFolders: boolean;
	setNote: React.Dispatch<React.SetStateAction<NoteType>>;
	setShowFolders: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { setPageName } = useContext(Context);
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
		<div
			className={`bg-white fixed rounded-3xl w-screen duration-500 max-w-4xl -bottom-[70%] z-20 h-[70%] p-10 drop-shadow overflow-y-auto pb-28 grid gap-6 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 no-scrollbar content-start transition-all ${
				showFolders && "-translate-y-[100%]"
			}`}>
			{folders.map((folder) => (
				<button
					key={folder.id}
					onClick={() => addToFolderHandler(folder)}
					className="bg-white rounded-b-lg rounded-tr-lg drop-shadow p-8 relative text-center flex-1">
					<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
					{folder.name}
				</button>
			))}
			{folders.length === 0 && (
				<div
					onClick={() => {
						setPageName("addFolder");
					}}
					className="mr-3 flex justify-center items-end cursor-pointer">
					<LuFolderPlus size={27} />
					Create New Folder
				</div>
			)}
		</div>
	);
}
