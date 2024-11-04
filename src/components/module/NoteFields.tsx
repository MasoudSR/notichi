import React, { useContext, useEffect, useRef, useState } from "react";
import AddToFolder from "./AddToFolder";
import Shadow from "./Shadow";
import { Context } from "@/app/provider";
import { loadSettings } from "@/helpers/settingsManager";

type NoteType = {
	id: string;
	updatedAt: Date | string;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};

export default function NoteFields({
	note,
	setNote,
	saveHandler,
	deleteHandler,
}: {
	note: NoteType;
	setNote: React.Dispatch<React.SetStateAction<NoteType>>;
	saveHandler: React.MouseEventHandler;
	deleteHandler: React.MouseEventHandler | null;
}) {
	const [showFolders, setShowFolders] = useState(false);
	const { isMounted, setIsMounted } = useContext(Context);
	const [settings, setSettings] = useState(loadSettings);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const heightHandler = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			console.log("textarea bood");
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	return (
		<>
			<div
				className={`m-6 font-medium ${
					settings.animations
						? isMounted
							? "animate-fade-up animate-duration-150 animate-ease-out"
							: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
						: ""
				}`}>
				<div className="bg-white p-2 rounded-lg">
					<input
						type="text"
						className="block w-full p-4 text-[#232326] border-none font-bold text-lg rounded-lg border focus:outline-none caret-[#0070F2]"
						placeholder="Note Title"
						value={note.title}
						onChange={(e) => setNote({ ...note, title: e.target.value })}
					/>
					<textarea
						rows={10}
						ref={textareaRef}
						className="border-none overflow-hidden resize-none text-[#232326] text-sm rounded-lg block w-full p-4 focus:outline-none caret-[#0070F2]"
						placeholder="Take a note..."
						value={note.text}
						onChange={(e) => {
							setNote({ ...note, text: e.target.value });
							heightHandler();
						}}
					/>
				</div>
				<button
					onClick={() => setShowFolders(true)}
					className="bg-white flex justify-between w-full mt-3 px-4 py-2 rounded-lg">
					<span className="">Folder</span>
					<span className="text-[#8A8A8E]">{note.folderName ? note.folderName : "none"}</span>
				</button>
				<div className="flex justify-between mt-4">
					<button
						className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 w-full"
						onClick={saveHandler}>
						Save
					</button>
					{deleteHandler !== null && (
						<button
							className="inline-block text-center bg-red-500 text-white p-3 rounded-lg ml-6 shadow-md shadow-red-500/30 w-28"
							onClick={deleteHandler}>
							Delete
						</button>
					)}
				</div>
			</div>
			<AddToFolder note={note} setNote={setNote} showFolders={showFolders} setShowFolders={setShowFolders} />
			{showFolders && <Shadow setShow={setShowFolders} />}
		</>
	);
}
