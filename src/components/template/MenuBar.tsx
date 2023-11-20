"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LuStickyNote, LuSettings, LuFolderClosed } from "react-icons/lu";

export default function MenuBar() {
	const pathName = usePathname();

	return (
		<div className="bg-white lg:rounded-t-3xl fixed bottom-0 w-screen max-w-4xl flex justify-around drop-shadow font-medium backdrop-blur-sm z-20">
			<Link
				href="/"
				className={`w-32 p-4 pb-3 m-3 rounded-lg flex flex-col items-center hover:bg-blue-50 ${
					pathName === "/" && "text-[#0265dc]"
				} `}>
				<LuStickyNote />
				All
			</Link>
			<Link
				href="/folders"
				className={`w-32 p-4 pb-3 m-3 rounded-lg flex flex-col items-center hover:bg-blue-50 ${
					pathName === "/folders" && "text-[#0265dc]"
				} `}>
				<LuFolderClosed />
				Folders
			</Link>
			<Link
				href="/settings"
				className={`w-32 p-4 pb-3 m-3 rounded-lg  flex flex-col items-center hover:bg-blue-50 ${
					pathName === "/settings" && "text-[#0265dc]"
				}`}>
				<LuSettings />
				Settings
			</Link>
		</div>
	);
}
