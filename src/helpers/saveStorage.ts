type DataType = {
	updatedAt: string | Date;
	notes: {
		id: string;
		updatedAt: string | Date;
		title: string;
		text: string;
		folderId: string;
		folderName: string;
	}[];
	folders: { id: string; updatedAt: string | Date; name: string; notesId: string[] }[];
	removedItems: string[];
};

export default function saveStorage(data: DataType) {
	const newDate = new Date();
	data.updatedAt = newDate;
	localStorage.setItem("data", JSON.stringify(data));
}
