"use client";

import { LuStickyNote, LuSettings, LuFolderClosed } from "react-icons/lu";
import { Context } from "@/app/provider";
import { useContext } from "react";

export default function MenuBar() {
	const { pageName, setPageName, setIsMounted } = useContext(Context);

	return (
		<div className="bg-white lg:rounded-t-3xl fixed bottom-0 w-screen max-w-4xl flex justify-around drop-shadow font-medium backdrop-blur-sm z-20">
			<button
				className={`w-32 p-4 pb-3 m-3 rounded-lg flex flex-col items-center hover:bg-blue-50 ${
					pageName === "notes" && "text-[#0265dc]"
				}`}
				onClick={() => {
					pageName !== "notes" && setIsMounted(false);
					setTimeout(() => setPageName!("notes"), 150);
				}}>
				<LuStickyNote />
				All
			</button>
			<button
				className={`w-32 p-4 pb-3 m-3 rounded-lg flex flex-col items-center hover:bg-blue-50 ${
					pageName === "folders" && "text-[#0265dc]"
				}`}
				onClick={() => {
					pageName !== "folders" && setIsMounted(false);
					setTimeout(() => setPageName!("folders"), 150);
				}}>
				<LuFolderClosed />
				Folders
			</button>
			<button
				className={`w-32 p-4 pb-3 m-3 rounded-lg flex flex-col items-center hover:bg-blue-50 ${
					pageName === "settings" && "text-[#0265dc]"
				}`}
				onClick={() => {
					pageName !== "settings" && setIsMounted(false);
					setTimeout(() => setPageName!("settings"), 150);
				}}>
				<LuSettings />
				settings
			</button>
		</div>
	);
}
