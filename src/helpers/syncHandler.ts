import { toast } from "react-hot-toast";
import loadStorage from "./loadStorage";
import saveStorage from "./saveStorage";
import { loadSettings } from "./settingsManager";

async function sync() {
	const data = loadStorage();

	await toast.promise(fetch("/api/cloud", {
					method: "POST",
					headers: { "Content-Type": "application-json" },
					body: JSON.stringify(data),
				}), {
		loading: "Sync in Progress ...",
		success: res => {
		  if (!res.ok) {
			throw new Error(`${res.status}`);
		  }
		  const promise = res.json()
		  promise.then(result => saveStorage(result))
		  return "Data Synced Successfully";
		},
		error: e => {
		  return `Sync Failed. ${e}`;
		},
	  })

}

export default function syncHandler(type: string) {
	if (navigator.onLine) {
		if (type === "force") {
			sync();
		} else if (type === "auto") {
			const settings = loadSettings();
			if (settings.autoSync) {
				sync();
			}
		}
	}
}
