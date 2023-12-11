"use client";

import AllNotesPage from "@/components/template/AllNotesPage";
import React, { useContext } from "react";
import { Context } from "./provider";
import FoldersPage from "@/components/template/FoldersPage";
import SettingsPage from "@/components/template/SettingsPage";
import AddNotePage from "@/components/template/AddNotePage";
import NewFolderPage from "@/components/template/NewFolderPage";
import NoteDetailsPage from "@/components/template/NoteDetailsPage";
import FolderDetailsPage from "@/components/template/FolderDetailsPage";
import EditFolderPage from "@/components/template/EditFolderPage";

export default function Home() {
	const { pageName } = useContext(Context);

	return (
		<div>
			{pageName === "notes" && <AllNotesPage />}
			{pageName === "folders" && <FoldersPage />}
			{pageName === "settings" && <SettingsPage />}
			{pageName === "addNote" && <AddNotePage />}
			{pageName === "addFolder" && <NewFolderPage />}
			{pageName === "note" && <NoteDetailsPage />}
			{pageName === "folder" && <FolderDetailsPage />}
			{pageName === "editFolder" && <EditFolderPage />}
		</div>
	);
}
