import { toast } from "react-hot-toast";
import loadStorage from "./loadStorage";
import saveStorage from "./saveStorage";
import { loadSettings } from "./settingsManager";

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

function sync(
	setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>,
	setData: React.Dispatch<React.SetStateAction<DataType>>,
	notification: (name: string) => void
) {
	const data = loadStorage();

	setIsSyncing(true);

	// await toast.promise(
	// 	fetch("/api/cloud", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application-json" },
	// 		body: JSON.stringify(data),
	// 	}),
	// 	{
	// 		loading: "Sync in Progress ...",
	// 		success: (res) => {
	// 			if (!res.ok) {
	// 				throw new Error(`${res.status}`);
	// 			}
	// 			const promise = res.json();
	// 			promise.then((result) => saveStorage(result));
	// 			return "Data Synced Successfully";
	// 		},
	// 		error: (e) => {
	// 			return `Sync Failed. ${e}`;
	// 		},
	// 	}
	// );

	fetch("/api/cloud", {
		method: "POST",
		headers: { "Content-Type": "application-json" },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => {
			setData(data);
			saveStorage(data);
			// toast.success("Data Synced Successfully");
			setIsSyncing(false);
			notification("successSync");
		})
		.catch((e) => {
			toast.error(`Sync Failed. ${e}`);
			setIsSyncing(false);
			notification("failedSync");
		});
}

export default function syncHandler(
	type: string,
	setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>,
	setData: any,
	notification: (name: string) => void,
	status:string
) {
	if (navigator.onLine) {
		if (status === "authenticated") {
			if (type === "force") {
				sync(setIsSyncing, setData, notification);
			} else if (type === "auto") {
				const settings = loadSettings();
				if (settings.autoSync) {
					sync(setIsSyncing, setData, notification);
				}
			}
		}
	}
}
