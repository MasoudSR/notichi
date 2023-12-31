"use client";
import { CgFileAdd } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import { LuFolderPlus } from "react-icons/lu";
import { useContext } from "react";
import { Context } from "@/app/provider";

export default function Header() {
	const { pageName, changePage } = useContext(Context);
	const pathCheck = () => {
		const paths = ["notes", "folders", "settings"];
		return paths.includes(pageName.name);
	};

	return (
		<div className="flex justify-between font-bold items-center align-middle pl-12 pr-9 py-5 bg-[#fed700] lg:rounded-b-3xl sticky top-0 drop-shadow z-10">
			<div className="flex items-center">
				{!pathCheck() && (
					<button
						className="absolute left-3"
						onClick={() => {
							changePage("back");
						}}>
						<BiArrowBack size={27} />
					</button>
				)}
				<span className="text-3xl">Notichi</span>
			</div>
			<span className="flex">
				{pageName.name === "folders" && (
					<button
						onClick={() => {
							changePage("addFolder");
						}}
						className="mr-3">
						<LuFolderPlus size={27} />
					</button>
				)}
				<button
					onClick={() => {
						pageName.name !== "addNote" && changePage("addNote");
					}}
					className="mr-3">
					<CgFileAdd size={27} />
				</button>
			</span>
		</div>
	);
}
