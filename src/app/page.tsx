"use client";

import AllNotesPage from "@/components/template/AllNotesPage";
import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";

export default function Home() {
	const { status, data: session } = useSession();
	const { pageName } = useContext(Context);
	const [output, setOutput] = useState("normal");

	const syncHandler = async () => {
		const settings = loadSettings();
		if (settings.autoSync) {
			if (status === "loading") {
				setOutput("loading");
			} else if (status === "authenticated") {
				setOutput("syncing");
				const data = loadStorage();
				try {
					const res = await fetch("/api/cloud", {
						method: "POST",
						headers: { "Content-Type": "application-json" },
						body: JSON.stringify(data),
					});
					const syncedData = await res.json();
					saveStorage(syncedData);
					toast.success("Data Synced Successfully");
					setOutput("normal");
				} catch (error) {
					toast.error("Error in Synchronizing Data");
					setOutput("normal");
				}
			}
		} else {
			setOutput("normal");
		}
	};

	useEffect(() => {
		syncHandler();
	}, [status]);

	return (
		<>
			{output === "loading" && <div>loading</div>}
			{output === "syncing" && <div>sync in progress</div>}
			{output === "normal" && (
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
			)}
		</>
	);
}
