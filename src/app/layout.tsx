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
			<body className="flex flex-col min-h-screen bg-[#f2f2f7] max-w-4xl m-auto">
				<Header />
				{children}
				<MenuBar />
			</body>
		</html>
	);
}
