import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

type NoteType = {
	id: string;
	updatedAt: string | Date;
	title: string;
	text: string;
	folderId: string;
	folderName: string;
};
type FolderType = { id: string; updatedAt: string | Date; name: string; notesId: string[] };

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = session.user?.email;
	const body = await req.json();

	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}
	const user = await User.findOne({ email: email });

	// sync removedItems between user and db data

	const removedItems = user.removedItems;
	removedItems.push(...body.removedItems);
	user.removedItems = removedItems;

	// sync notes between user and db data

	let newNotes = [];

	if (user.data.notes.length && !body.notes.length) {
		newNotes = user.data.notes;
	} else if (body.notes.length && !user.data.notes.length) {
		newNotes = body.notes;
	} else if (user.data.notes.length && body.notes.length) {
		const newDbNotes = user.data.notes.map((note: NoteType) => {
			const isExist = body.notes.findIndex((n: NoteType) => n.id === note.id);

			if (isExist >= 0) {
				const userNote = body.notes[isExist];
				const dbNoteDate = new Date(note.updatedAt);
				const userNoteDate = new Date(userNote.updatedAt);

				if (dbNoteDate >= userNoteDate) {
					return note;
				} else {
					return userNote;
				}
			} else if (isExist === -1) {
				return note;
			}
		});

		body.notes.forEach((note: NoteType) => {
			const isExist = newDbNotes.findIndex((n: NoteType) => n.id === note.id);
			if (isExist === -1) {
				newDbNotes.push(note)
			}
		});
		newNotes = newDbNotes
	}

	const filteredNotes = newNotes ? newNotes.filter((note: NoteType) => !removedItems.includes(note.id)) : [];

	// sync folder between user and db data

	let newFolders = [];

	if (user.data.folders.length && !body.folders.length) {
		newFolders = user.data.folders;
	} else if (body.folders.length && !user.data.folders.length) {
		newFolders = body.folders;
	} else if (user.data.folders.length && body.folders.length) {
		const newDbFolders = user.data.folders.map((folder: FolderType) => {
			const isExist = body.folders.findIndex((f: FolderType) => f.id === folder.id);

			if (isExist >= 0) {
				const userFolder = body.folders[isExist];
				const dbFolderDate = new Date(folder.updatedAt);
				const userFolderDate = new Date(userFolder.updatedAt);

				if (dbFolderDate >= userFolderDate) {
					return folder;
				} else {
					return userFolder;
				}
			} else if (isExist === -1) {
				return folder;
			}
		});
		newFolders = body.folders.map((folder: FolderType) => {
			const isExist = newDbFolders.findIndex((f: FolderType) => f.id === folder.id);
			if (isExist === -1) {
				newDbFolders.push(folder)
			}
		});
		newFolders = newDbFolders
	}

	const filteredFolders = newFolders
		? newFolders.filter((folder: FolderType) => !removedItems.includes(folder.id))
		: [];

	user.data.notes = filteredNotes;
	user.data.folders = filteredFolders;
	await user.save();
	return Response.json(user.data);
}
