type DataType = {
	updatedAt: string | Date;
	notes: { id: string; title: string; text: string; folderId: string; folderName: string }[];
	folders: { id: string; name: string; notesId: string[] }[];
	removedItems: string[];
};

export default function saveStorage(data: DataType) {
	const newDate = new Date();
	data.updatedAt = newDate;
	localStorage.setItem("data", JSON.stringify(data));
}
