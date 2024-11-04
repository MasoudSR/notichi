import { useContext, useState } from "react";
import saveStorage from "@/helpers/saveStorage";
import syncHandler from "@/helpers/syncHandler";
import { Context } from "@/app/provider";
import { nanoid } from "nanoid";

function NewFolder({ active }: { active: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { changePage, isMounted, setIsMounted, setIsSyncing, data, setData, notification } = useContext(Context);
	const [folder, setFolder] = useState<{ id: string; updatedAt: Date | string; name: string; notesId: [] }>({
		id: "",
		updatedAt: "",
		name: "",
		notesId: [],
	});

	const saveHandler = () => {
		if (folder.name === "") {
			// changePage("folders");
			active(false);
		} else {
			const id: string = nanoid();
			const newData = data;
			const newDate = new Date();
			const newFolder = folder;
			newFolder.id = id;
			newFolder.updatedAt = newDate;
			newData!.folders.push(newFolder);
			setData(newData);
			saveStorage(newData!);
			notification("folderCheck");
			// changePage("folders");
			active(false);
			syncHandler("auto", setIsSyncing, setData, notification, status);
		}
	};

	const cancelHandler = () => {
		active(false);
	};

	return (
		<div className="animate-fade-up animate-duration-300 animate-ease-out">
			<input
				type="text"
				className="block w-full p-4 text-[#232326] border-gray-300 rounded-lg border focus:outline-[#0070F2] caret-[#0070F2]"
				placeholder="Folder Name"
				value={folder.name}
				style={{ unicodeBidi: "plaintext" }}
				onChange={(e) => setFolder({ ...folder, name: e.target.value })}
			/>
			<div className="grid gap-2 grid-cols-1 sm:grid-cols-3 sm:gap-6 mt-4">
				<button
					className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md sm:col-span-2 shadow-[#017AFF]/30 w-full"
					onClick={saveHandler}>
					Save
				</button>
				<button
					className="bg-white border border-gray-100 text-black font-medium p-3 rounded-lg shadow-md w-full"
					onClick={saveHandler}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default NewFolder;
