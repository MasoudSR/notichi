"use client"

import Folder from "../module/Folder";
import { useEffect, useState } from "react";

export default function FoldersPage() {
    const [folders, setFolders] = useState<{ id: string; name: string; notesId: [] }[]>([]);
	useEffect(() => {
		const oldFolders: string | null = localStorage.getItem("folders");
		if (oldFolders) {
			setFolders(JSON.parse(oldFolders));
		}
	}, []);
  return (
    <div className="flex flex-wrap justify-between mt-4">
        {folders.map((folder)=>(
                <Folder key={folder.id} id={folder.id} name={folder.name} />
            ))}
        <Folder id="new" name="NewFolder+" />
    </div>
  )
}
