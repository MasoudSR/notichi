export default function Note({ title, note }) {
	return (
		<div className="bg-slate-300 p-2 m-3 rounded-lg">
			<h4 className="bg-slate-50 p-2 m-1 rounded-lg">{title}</h4>
			<p className="bg-slate-50 p-2 m-1 rounded-lg">{note}</p>
		</div>
	);
}
