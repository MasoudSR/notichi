import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "@/components/template/MenuBar";
import Header from "@/components/template/Header";
import { Providers } from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
	title: "Notichi",
	description: "Simple Note App",
	applicationName: "Notichi",
	appleWebApp: true,
	manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#fed700" />
			</head>

			<body className="min-h-screen bg-[#f2f2f7] max-w-4xl m-auto pb-24">
				<Providers>
					<Header />
					{children}
					<MenuBar />
					<ToastContainer position="top-center" autoClose={1500} hideProgressBar />
				</Providers>
			</body>
		</html>
	);
}
