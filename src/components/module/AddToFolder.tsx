import { Context } from "@/app/provider";
import { loadSettings } from "@/helpers/settingsManager";
import React, { useContext, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import NewFolder from "./NewFolder";

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
	const { changePage, data } = useContext(Context);
	const [folders, setFolders] = useState<FolderType[]>([]);
	const [settings] = useState(loadSettings);
	const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
	const [translateValue, setTranslateValue] = useState("70%");

	const handleScroll = (e:React.UIEvent<HTMLDivElement>) => {
		if (e.currentTarget.scrollTop > 0) {
			setTranslateValue("100%");
		} else {
			setTranslateValue("70%");
		}
	};

	const addToFolderHandler = (folder: FolderType) => {
		setNote({ ...note, folderId: folder.id, folderName: folder.name });
		setShowFolders(false);
	};

	useEffect(() => {
		setFolders(data!.folders);
	}, []);

	return (
		<div
			className={`bg-white fixed rounded-3xl w-screen max-w-4xl -bottom-[100%] z-20 h-[100%] p-10 drop-shadow overflow-y-auto pb-28 no-scrollbar content-start ${
				settings.animations && "transition-all duration-500"
			} ${showFolders && `-translate-y-[${translateValue}]`}`}
			onScroll={handleScroll}>
			{isCreatingNewFolder ? (
				<NewFolder active={setIsCreatingNewFolder} />
			) : (
				<div className="grid gap-6 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 animate-fade-up animate-duration-300 animate-ease-out">
					{folders.map((folder) => (
						<button
							key={folder.id}
							onClick={() => addToFolderHandler(folder)}
							className="bg-white rounded-b-lg rounded-tr-lg drop-shadow p-8 relative text-center flex-1">
							<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
							{folder.name}
						</button>
					))}
					<div
						onClick={() => {
							setIsCreatingNewFolder(true);
						}}
						className="bg-white cursor-pointer rounded-b-lg rounded-tr-lg drop-shadow items-center justify-center flex p-8 relative text-center flex-1">
						<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
						<LuPlus size={30} color="gray" />
					</div>
				</div>
			)}
		</div>
	);
}
