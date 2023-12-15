"use client";

import loadStorage from "@/helpers/loadStorage";
import Folder from "../module/Folder";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/provider";

export default function FoldersPage() {
	const [folders, setFolders] = useState<{ id: string; updatedAt: string | Date; name: string; notesId: [] }[]>([]);
	const { isMounted, setIsMounted } = useContext(Context);

	useEffect(() => {
		const data = loadStorage();
		setFolders(data.folders);
		setIsMounted(true);
	}, []);
	return (
		<div
			className={`grid gap-6 grid-cols-1 m-6 md:grid-cols-4 sm:grid-cols-2 ${
				isMounted
					? "animate-fade-up animate-duration-150 animate-ease-out"
					: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
			}`}>
			{folders.map((folder) => (
				<Folder key={folder.id} id={folder.id} name={folder.name} />
			))}
		</div>
	);
}
