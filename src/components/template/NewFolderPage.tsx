"use client";
import { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import saveStorage from "@/helpers/saveStorage";
import loadStorage from "@/helpers/loadStorage";
import { toast } from "react-toastify";
import { Context } from "@/app/provider";
import { loadSettings } from "@/helpers/settingsManager";
import syncHandler from "@/helpers/syncHandler";

export default function NewFolderPage() {
	const { changePage, isMounted, setIsMounted } = useContext(Context);
	const [folder, setFolder] = useState<{ id: string; updatedAt: Date | string; name: string; notesId: [] }>({
		id: "",
		updatedAt: "",
		name: "",
		notesId: [],
	});
	const [settings , setSettings] = useState(loadSettings)

	useEffect(() => {
		const id: string = nanoid();
		setFolder({ ...folder, id });
		setIsMounted(true);
	}, []);

	const saveHandler = () => {
		if (folder.name === "") {
			changePage("folders");
		} else {
			const data = loadStorage();
			const newDate = new Date();
			folder.updatedAt = newDate;
			data.folders.push(folder);
			saveStorage(data);
			toast.success("Folder Created");
			changePage("folders");
			syncHandler("auto")
		}
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
			<button
				className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 w-full mt-4"
				onClick={saveHandler}>
				Save
			</button>
		</div>
	);
}
