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
	);
}
