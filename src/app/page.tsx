"use client";

import AllNotesPage from "@/components/template/AllNotesPage";
import React, { useContext, useEffect } from "react";
import { Context } from "./provider";
import FoldersPage from "@/components/template/FoldersPage";
import SettingsPage from "@/components/template/SettingsPage";
import AddNotePage from "@/components/template/AddNotePage";
import NewFolderPage from "@/components/template/NewFolderPage";
import NoteDetailsPage from "@/components/template/NoteDetailsPage";
import FolderDetailsPage from "@/components/template/FolderDetailsPage";
import EditFolderPage from "@/components/template/EditFolderPage";
import { useSession } from "next-auth/react";
import { loadSettings } from "@/helpers/settingsManager";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { toast } from "react-hot-toast";
import syncHandler from "@/helpers/syncHandler";

export default function Home() {
	const { status, data: session } = useSession();
	const { pageName , setData , data , changePage , setIsSyncing , notification } = useContext(Context);

	// const syncHandler = async () => {
	// 	const settings = loadSettings();
	// 	if (settings.autoSync) {
	// 		if (status === "authenticated") {
	// 			const data = loadStorage();

	// 			await toast.promise(
	// 				fetch("/api/cloud", {
	// 					method: "POST",
	// 					headers: { "Content-Type": "application-json" },
	// 					body: JSON.stringify(data),
	// 				}),
	// 				{
	// 					loading: "AutoSync in Progress ...",
	// 					success: (res) => {
	// 						if (!res.ok) {
	// 							throw new Error(`${res.status}`);
	// 						}
	// 						const promise = res.json();
	// 						promise.then((result) => {
	// 							saveStorage(result , setData);
	// 						});
	// 						return "Data Synced Successfully";
	// 					},
	// 					error: (e) => {
	// 						return `Sync Failed. ${e}`;
	// 					},
	// 				}
	// 			);
	// 		}
	// 	}
	// };
	
	useEffect(() => {
		const storageData = loadStorage();
		setData(storageData)
		syncHandler("auto" , setIsSyncing, setData , notification , status)
	}, [status])
	

	return (
		<>
			<div className="overflow-x-clip">
				{pageName.name === "notes" && <AllNotesPage />}
				{pageName.name === "folders" && <FoldersPage />}
				{pageName.name === "settings" && <SettingsPage />}
				{pageName.name === "addNote" && <AddNotePage />}
				{pageName.name === "addFolder" && <NewFolderPage />}
				{pageName.name === "note" && <NoteDetailsPage />}
				{pageName.name === "folder" && <FolderDetailsPage />}
				{pageName.name === "editFolder" && <EditFolderPage />}
			</div>
		</>
	);
}
