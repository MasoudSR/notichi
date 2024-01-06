import { loadSettings } from "@/helpers/settingsManager";
import React, { useState } from "react";

export default function Shadow({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [settings] = useState(loadSettings)
	return (
		<button
			className={`bg-slate-500/40 w-screen h-screen fixed -top-10 left-0 backdrop-blur-sm z-10 ${settings.animations && " animate-fade animate-duration-300"}`}
			onClick={() => setShow(false)}></button>
	);
}
