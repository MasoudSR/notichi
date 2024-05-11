"use client";
import { CgFileAdd } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import { LuFolderPlus } from "react-icons/lu";
import { useContext } from "react";
import { Context } from "@/app/provider";
import { TbCloud, TbCloudCheck,TbCloudCancel } from "react-icons/tb";
import { IoSyncOutline } from "react-icons/io5";

export default function Header() {
	const { pageName, changePage, isSyncing , notifications } = useContext(Context);
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
				{isSyncing && (
					<span className="relative mr-3">
						<TbCloud size={15} className="absolute top-1.5 left-[6px]" />
						<IoSyncOutline size={27} className="animate-spin" />
					</span>
				)}
				{notifications.successSync && 
				<span className="relative mr-3">
					<TbCloudCheck size={27} />
				</span>
				}
				{notifications.failedSync && 
				<span className="relative mr-3">
					<TbCloudCancel size={27} />
				</span>
				}
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
