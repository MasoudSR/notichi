"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useState } from "react";

export const Context = createContext<{
	pageName: string;
	setPageName: React.Dispatch<React.SetStateAction<string>>;
	pageId: string;
	setPageId: React.Dispatch<React.SetStateAction<string>>;
	isMounted: boolean;
	setIsMounted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	pageName: "notes",
	setPageName: () => {},
	pageId: "",
	setPageId: () => {},
	isMounted: false,
	setIsMounted: () => {},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [pageName, setPageName] = useState<string>("notes");
	const [pageId, setPageId] = useState<string>("");
	const [isMounted, setIsMounted] = useState(false);
	return (
		<SessionProvider>
			<Context.Provider value={{ pageName, setPageName, pageId, setPageId, isMounted, setIsMounted }}>
				{children}
			</Context.Provider>
		</SessionProvider>
	);
};
