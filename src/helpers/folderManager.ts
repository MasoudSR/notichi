type DataType = {
	updatedAt: string | Date;
	notes: { id: string; title: string; text: string; folderId: string; folderName: string }[];
	folders: { id: string; name: string; notesId: string[] }[];
	removedItems: string[];
};
type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };

function addToFolder(data: DataType, noteId: string, folderId: string) {
	const folder = data.folders.find((folder) => folder.id === folderId);
	if (folder) {
		if (!folder.notesId.includes(noteId)) {
			folder.notesId.push(noteId);
		}
		data.folders.splice(
			data.folders.findIndex((item) => item.id === folderId),
			1,
			folder
		);
	}
}

function deleteFromFolder(data: DataType, noteId: string) {
	const oldNote = data.notes.find((note: NoteType) => note.id === noteId)!;
	const folder = data.folders.find((folder) => folder.id === oldNote.folderId);
	if (folder) {
		if (folder.notesId.includes(noteId)) {
			folder.notesId.splice(folder.notesId.indexOf(noteId), 1);
			const folderIndex = data.folders.findIndex((item) => item.id === oldNote.folderId);
			data.folders.splice(folderIndex, 1, folder);
		}
	}
}

export { addToFolder, deleteFromFolder };
