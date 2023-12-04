export default function loadStorage() {
	const data = localStorage.getItem("data");
	if (data === null) {
		const date = new Date();
		const newData = { updatedAt: date, notes: [], folders: [] , removedItems:[] };
		return newData;
	} else {
		return JSON.parse(data);
	}
}
