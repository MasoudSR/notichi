import Link from "next/link";

export default function MenuBar() {
	return (
		<div className="bg-slate-50 rounded-lg fixed bottom-0 w-screen flex justify-around">
			<Link className="w-32 p-4 m-3 bg-slate-200 rounded-lg text-center" href="/">All</Link>
			<Link href="/folders" className="w-32 p-4 m-3 bg-slate-200 rounded-lg text-center">Folders</Link>
			<Link href="/settings" className="w-32 p-4 m-3 bg-slate-200 rounded-lg text-center">Settings</Link>
		</div>
	);
}
