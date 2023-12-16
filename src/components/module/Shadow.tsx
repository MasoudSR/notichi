import React from "react";

export default function Shadow({ setShowFolders }: { setShowFolders: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<button
			className="bg-slate-500/40 w-screen h-screen fixed top-0 left-0 backdrop-blur-sm z-10 animate-fade"
			onClick={() => setShowFolders(false)}></button>
	);
}
