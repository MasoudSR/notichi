"use client";
import { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import saveStorage from "@/helpers/saveStorage";
import loadStorage from "@/helpers/loadStorage";
import { toast } from "react-toastify";
import { Context } from "@/app/provider";

export default function NewFolderPage() {
	const { pageName, setPageName } = useContext(Context);
	const [folder, setFolder] = useState({ id: "", name: "", notesId: [] });
	useEffect(() => {
		const id: string = nanoid();
		setFolder({ ...folder, id });
	}, []);
	const saveHandler = () => {
		if (folder.name === "") {
			setPageName("folders");
		} else {
			const data = loadStorage();
			data.folders.push(folder);
			saveStorage(data);
			toast.success("Folder Created");
			setPageName("folders");
		}
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
			<button
				className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 w-full mt-4"
				onClick={saveHandler}>
				Save
			</button>
		</div>
	);
}
