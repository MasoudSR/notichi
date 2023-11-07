export default function MenuBar() {
	return (
		<div className="bg-slate-50 rounded-lg fixed bottom-0 w-screen flex justify-around">
			<button className="w-32 p-4 m-3 bg-slate-200 rounded-lg">All</button>
			<button className="w-32 p-4 m-3 bg-slate-200 rounded-lg">Folders</button>
			<button className="w-32 p-4 m-3 bg-slate-200 rounded-lg">Settings</button>
		</div>
	);
}
