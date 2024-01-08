import { toast } from "react-toastify";
import loadStorage from "./loadStorage";
import saveStorage from "./saveStorage";
import { loadSettings } from "./settingsManager";

async function sync() {
	const data = loadStorage();
	try {
		const res = await toast.promise(
			fetch("/api/cloud", {
				method: "POST",
				headers: { "Content-Type": "application-json" },
				body: JSON.stringify(data),
			}),
			{
				pending: "Sync in Progress",
			}
		);
		const syncedData = await res.json();
		saveStorage(syncedData);
		toast.success("Data Synced Successfully");
	} catch (error) {
		toast.error("Error in Synchronizing Data");
	}
}

export default function syncHandler(type: string) {
	if (type === "force") {
		sync();
	} else if (type === "auto") {
		const settings = loadSettings();
		if (settings.autoSync) {
			sync();
		}
	}
}
