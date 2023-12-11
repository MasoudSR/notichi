"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useState } from "react";

export const Context = createContext<{
	pageName: string;
	setPageName: React.Dispatch<React.SetStateAction<string>>;
	pageId: string;
	setPageId: React.Dispatch<React.SetStateAction<string>>;
}>({ pageName: "notes", setPageName: () => {}, pageId: "", setPageId: () => {} });

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [pageName, setPageName] = useState<string>("notes");
	const [pageId, setPageId] = useState<string>("");
	return (
		<SessionProvider>
			<Context.Provider value={{ pageName, setPageName, pageId, setPageId }}>{children}</Context.Provider>
		</SessionProvider>
	);
};
