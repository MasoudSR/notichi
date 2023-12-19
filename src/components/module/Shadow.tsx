import React from "react";

export default function Shadow({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<button
			className="bg-slate-500/40 w-screen h-screen fixed -top-10 left-0 backdrop-blur-sm z-10 animate-fade animate-duration-300"
			onClick={() => setShow(false)}></button>
	);
}
