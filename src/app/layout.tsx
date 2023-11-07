import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notichi",
	description: "Simple Note App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen">
        <Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
