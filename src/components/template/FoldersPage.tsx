"use client";

import loadStorage from "@/helpers/loadStorage";
import Folder from "../module/Folder";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/provider";
import { loadSettings } from "@/helpers/settingsManager";

export default function FoldersPage() {
	const [folders, setFolders] = useState<{ id: string; updatedAt: string | Date; name: string; notesId: [] }[]>([]);
	const { isMounted, setIsMounted, prevPageName, selectedPageName } = useContext(Context);
	const [settings , setSettings] = useState(loadSettings)

	useEffect(() => {
		const data = loadStorage();
		setFolders(data.folders);
		setIsMounted(true);
	}, []);
	return (
		<div
			className={`grid gap-6 grid-cols-1 m-6 md:grid-cols-4 sm:grid-cols-2 ${ settings.animations ?
				isMounted
					? prevPageName.name === "notes"
						? "animate-fade-left animate-duration-150 animate-ease-out"
						: prevPageName.name === "settings"
						? "animate-fade-right animate-duration-150 animate-ease-out"
						: "animate-fade-up animate-duration-150 animate-ease-out"
					: selectedPageName === "notes"
					? "animate-fade-out-right animate-duration-150 animate-ease-out"
					: selectedPageName === "settings"
					? "animate-fade-out-left animate-duration-150 animate-ease-out"
					: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse" : ""
			}`}>
			{folders.map((folder) => (
				<Folder key={folder.id} id={folder.id} name={folder.name} />
			))}
		</div>
	);
}
