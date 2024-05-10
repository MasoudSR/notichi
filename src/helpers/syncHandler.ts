import { toast } from "react-hot-toast";
import loadStorage from "./loadStorage";
import saveStorage from "./saveStorage";
import { loadSettings } from "./settingsManager";
import { Dispatch, SetStateAction } from "react";

async function sync(setIsSyncing:React.Dispatch<React.SetStateAction<boolean>>) {
	const data = loadStorage();

	setIsSyncing(true);

	await toast.promise(
		fetch("/api/cloud", {
			method: "POST",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify(data),
		}),
		{
			loading: "Sync in Progress ...",
			success: (res) => {
				if (!res.ok) {
					throw new Error(`${res.status}`);
				}
				const promise = res.json();
				promise.then((result) => saveStorage(result));
				return "Data Synced Successfully";
			},
			error: (e) => {
				return `Sync Failed. ${e}`;
			},
		}
	);

	setIsSyncing(false)

}

export default function syncHandler(type: string, setIsSyncing:React.Dispatch<React.SetStateAction<boolean>>) {
	if (navigator.onLine) {
		if (type === "force") {
			sync(setIsSyncing);
		} else if (type === "auto") {
			const settings = loadSettings();
			if (settings.autoSync) {
				sync(setIsSyncing);
			}
		}
	}
}
