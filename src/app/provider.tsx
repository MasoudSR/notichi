"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useState } from "react";

export const Context = createContext<{
	pageName: { name: string; id: string };
	prevPageName: { name: string; id: string };
	changePage: (newPage: string, id?: string) => void;
	isMounted: boolean;
	setIsMounted: React.Dispatch<React.SetStateAction<boolean>>;
	selectedPageName: string;
}>({
	pageName: { name: "notes", id: "" },
	prevPageName: { name: "", id: "" },
	changePage: () => {},
	isMounted: false,
	setIsMounted: () => {},
	selectedPageName: "",
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [pageName, setPageName] = useState<{ name: string; id: string }>({ name: "notes", id: "" });
	const [prevPageName, setPrevPageName] = useState<{ name: string; id: string }>({ name: "notes", id: "" });
	const [pageHistory, setPageHistory] = useState<{ name: string; id: string }[] | []>([]);
	const [selectedPageName, setSelectedPageName] = useState<string>("");
	const [isMounted, setIsMounted] = useState(false);

	function changePage(newPage: string, id: string | undefined) {
		if (newPage !== "back") {
			setIsMounted(false);
			setSelectedPageName(newPage);
			const history: { name: string; id: string }[] = pageHistory;
			if (newPage === "notes" || newPage === "folders" || newPage === "settings") {
				history.length = 0;
			} else {
				history.push(pageName);
			}
			setPageHistory(history);
			setTimeout(() => {
				setPrevPageName(pageName);
				id ? setPageName({ name: newPage, id: id }) : setPageName({ ...pageName, name: newPage });
			}, 150);
		} else if (newPage === "back") {
			const history: { name: string; id: string }[] = pageHistory;
			const prevPage: { name: string; id: string } = history.pop()!;
			setPageHistory(history);
			setPageName(prevPage!);
		}
	}

	return (
		<SessionProvider>
			<Context.Provider
				value={{
					changePage,
					setIsMounted,
					prevPageName,
					selectedPageName,
					isMounted,
					pageName,
				}}>
				{children}
			</Context.Provider>
		</SessionProvider>
	);
};
