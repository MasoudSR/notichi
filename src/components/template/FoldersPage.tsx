"use client";

import loadStorage from "@/helpers/loadStorage";
import Folder from "../module/Folder";
import { useEffect, useState } from "react";

export default function FoldersPage() {
	const [folders, setFolders] = useState<{ id: string; updatedAt: string | Date; name: string; notesId: [] }[]>([]);
	useEffect(() => {
		const data = loadStorage();
		setFolders(data.folders);
	}, []);
	return (
		<div className="grid gap-6 grid-cols-1 m-6 md:grid-cols-4 sm:grid-cols-2">
			{folders.map((folder) => (
				<Folder key={folder.id} id={folder.id} name={folder.name} />
			))}
		</div>
	);
}
