"use client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import saveStorage from "@/helpers/saveStorage";
import loadStorage from "@/helpers/loadStorage";
import { toast } from "react-toastify";

export default function NewFolderPage() {
	const [folder, setFolder] = useState({ id: "", name: "", notesId: [] });
	const router = useRouter();
	useEffect(() => {
		const id: string = nanoid();
		setFolder({ ...folder, id });
	}, []);
	const saveHandler = () => {
		if (folder.name === "") {
			router.push("/folders");
		} else {
			const data = loadStorage();
			data.folders.push(folder);
			saveStorage(data);
			toast.success("Folder Created")
			router.push("/folders");
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
