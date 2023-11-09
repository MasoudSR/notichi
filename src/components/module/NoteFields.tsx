import Link from "next/link";
import React from "react";
export default function NoteFields({
	note,
	setNote,
	saveHandler,
	deleteHandler,
}: {
	note: { id: string; title: string; text: string };
	setNote: React.Dispatch<React.SetStateAction<{ id: string; title: string; text: string }>>;
	saveHandler: React.MouseEventHandler;
	deleteHandler: React.MouseEventHandler | null;
}) {
	return (
		<div className="m-6">
			<input
				type="text"
				className="block w-full p-4 text-[#232326] border-gray-300 rounded-lg border focus:outline-[#0070F2] caret-[#0070F2]"
				placeholder="Title"
				value={note.title}
				onChange={(e) => setNote({ ...note, title: e.target.value })}
			/>
			<textarea
				rows={10}
				className="border border-gray-300 text-[#232326] text-sm rounded-lg block w-full p-4 mt-2 focus:outline-[#0070F2] caret-[#0070F2]"
				placeholder="Note"
				value={note.text}
				onChange={(e) => setNote({ ...note, text: e.target.value })}
			/>
			<div className="flex justify-between mt-4">
				<button
					className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 w-full"
					onClick={saveHandler}>
					Save
				</button>
				{deleteHandler !== null && (
					<button
						className="inline-block text-center bg-red-500 text-white p-3 rounded-lg ml-6 shadow-md shadow-red-500/30 w-28"
						onClick={deleteHandler}>
						Delete
					</button>
				)}
			</div>
		</div>
	);
}
