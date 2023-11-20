import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/template/MenuBar";
import Header from "@/components/template/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notichi",
	description: "Simple Note App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#fed700" />
			</head>
			<body className="min-h-screen bg-[#f2f2f7] max-w-4xl m-auto pb-24">
				<Header />
				{children}
				<MenuBar />
			</body>
		</html>
	);
}
