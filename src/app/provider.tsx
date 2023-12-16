"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useState } from "react";

export const Context = createContext<{
	pageName: string;
	setPageName: React.Dispatch<React.SetStateAction<string>>;
	prevPageName: string;
	setPrevPageName: React.Dispatch<React.SetStateAction<string>>;
	changePage: (newPage: string) => void;
	pageId: string;
	setPageId: React.Dispatch<React.SetStateAction<string>>;
	isMounted: boolean;
	setIsMounted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	pageName: "notes",
	setPageName: () => {},
	prevPageName: "",
	setPrevPageName: () => {},
	changePage: () => {},
	pageId: "",
	setPageId: () => {},
	isMounted: false,
	setIsMounted: () => {},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [pageName, setPageName] = useState<string>("notes");
	const [prevPageName, setPrevPageName] = useState<string>("");
	const [pageId, setPageId] = useState<string>("");
	const [isMounted, setIsMounted] = useState(false);

	function changePage(newPage: string) {
		setPrevPageName(pageName);
		setTimeout(() => setPageName!(newPage), 150);
	}

	return (
		<SessionProvider>
			<Context.Provider
				value={{
					pageName,
					setPageName,
					pageId,
					setPageId,
					isMounted,
					setIsMounted,
					prevPageName,
					setPrevPageName,
					changePage,
				}}>
				{children}
			</Context.Provider>
		</SessionProvider>
	);
};
