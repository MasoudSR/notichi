import Link from "next/link";

import {LuStickyNote , LuSettings , LuFolderClosed} from "react-icons/lu"

export default function MenuBar() {
	return (
		<div className="bg-slate-50 rounded-t-lg fixed bottom-0 w-screen max-w-4xl flex justify-around drop-shadow">
			<Link href="/" className="w-32 p-4 m-3 bg-slate-200 rounded-lg flex flex-col items-center"><LuStickyNote />All</Link>
			<Link href="/folders" className="w-32 p-4 m-3 bg-slate-200 rounded-lg flex flex-col items-center"><LuFolderClosed />Folders</Link>
			<Link href="/settings" className="w-32 p-4 m-3 bg-slate-200 rounded-lg  flex flex-col items-center"><LuSettings />Settings</Link>
		</div>
	);
}
