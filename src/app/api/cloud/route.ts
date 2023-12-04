import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

type NoteType = { id: string; title: string; text: string; folderId: string; folderName: string };
type FolderType = { id: string; name: string; notesId: string[] };

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
	const user = await User.findOne({email:email});

	const removedItems = body.removedItems;

	const newNotes = user.data.notes.filter((note:NoteType) => !removedItems.includes(note.id));
	const filteredNotes = newNotes.filter((note:NoteType) => {
		const isExist = body.notes.findIndex((n:NoteType) => n.id === note.id);
		return isExist === -1 && true;
	});
	filteredNotes.push(...body.notes);

	const newFolders = user.data.folders.filter((folder:FolderType) => !removedItems.includes(folder.id));
	const filteredFolders = newFolders.filter((folder:FolderType) => {
		const isExist = body.folders.findIndex((f:FolderType) => f.id === folder.id);
		return isExist === -1 && true;
	});
	filteredFolders.push(...body.folders);

	user.data.notes = filteredNotes;
	user.data.folders = filteredFolders;
	await user.save();
	return Response.json(user.data);
}
