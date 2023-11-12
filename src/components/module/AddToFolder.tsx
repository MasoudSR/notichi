import { useEffect, useState } from "react";

export default function AddToFolder({ noteId }) {
	const [folders, setFolders] = useState([{ id: "", name: "" }]);
	const addToFolderHandler = (folderId) => {
		const newfolders = folders.map((item) => (item.id === folderId ? item.notesId.push(noteId) : "buy"));
		console.log(newfolders);
	};
	useEffect(() => {
		const localFolders = localStorage.getItem("folders");
		setFolders(JSON.parse(localFolders));
	}, []);
	return (
		<div>
			{folders.map((folder) => (
				<button key={folder.id} onClick={() => addToFolderHandler(folder.id)}>
					{folder.name}
				</button>
			))}
		</div>
	);
}
