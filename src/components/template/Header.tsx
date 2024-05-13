"use client";
import { CgFileAdd } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import { LuFolderPlus } from "react-icons/lu";
import { useContext } from "react";
import { Context } from "@/app/provider";
import { TbCloud, TbCloudCheck, TbCloudCancel, TbFolderCheck, TbTrashFilled, TbCheck } from "react-icons/tb";
import { IoSyncOutline } from "react-icons/io5";
import { LuFileCheck2 } from "react-icons/lu";

export default function Header() {
	const { pageName, changePage, isSyncing, notifications } = useContext(Context);
	const pathCheck = () => {
		const paths = ["notes", "folders", "settings"];
		return paths.includes(pageName.name);
	};

	return (
		<div className="flex justify-between items-center font-bold p-9 py-5 bg-[#fed700] lg:rounded-b-3xl sticky top-0 drop-shadow z-10">
			<div className="flex items-center">
				{/* {!pathCheck() && ( */}
				<button
					className={`transition-transform absolute left-5 ${!pathCheck() ? "scale-100" : "scale-0"}`}
					onClick={() => {
						changePage("back");
					}}>
					<BiArrowBack size={27} />
				</button>
				{/* // )} */}
				<span className={`transition-all flex items-center relative ${!pathCheck() ? "left-5" : "left-0"} `}>
					<span className="text-3xl">Notichi</span>
					{/* {notifications.noteCheck && ( */}
					<span className="relative flex -top-3.5 left-1.5">
						<span className={`absolute transition-transform ${notifications.noteCheck ? "scale-100" : "scale-0"}`}>
							<LuFileCheck2 size={27} />
						</span>
						{/* )} */}
						{/* {notifications.folderCheck && ( */}
						<span className={`absolute transition-transform ${notifications.folderCheck ? "scale-100" : "scale-0"}`}>
							<TbFolderCheck size={27} />
						</span>
						{/* )} */}
						{/* {notifications.removeSuccess && ( */}
						<span className={`absolute transition-transform ${notifications.removeSuccess ? "scale-100" : "scale-0"}`}>
							<span className="flex relative">
								<TbCheck size={19} color="white" className="absolute top-1.5 left-[4px]" />
								<TbTrashFilled size={27} />
							</span>
						</span>
						{/* )} */}
					</span>
				</span>
			</div>
			<span className="flex">
				<span
					className={`transition-transform absolute ${
						pageName.name === "folders" ? "-translate-x-10" : "translate-x-0"
					}`}>
					{/* {isSyncing && ( */}
					<span className={`absolute transition-transform ${isSyncing ? "scale-100" : "scale-0"}`}>
						<TbCloud size={15} className="absolute top-1.5 left-[6px]" />
						<IoSyncOutline size={27} className="animate-spin" />
					</span>
					{/* // )} */}
					{/* {notifications.successSync && ( */}
					<span className={`absolute transition-transform ${notifications.successSync ? "scale-100" : "scale-0"}`}>
						<TbCloudCheck size={27} />
					</span>
					{/* // )} */}
					{/* {notifications.failedSync && ( */}
					<span className={`absolute transition-transform ${notifications.failedSync ? "scale-100" : "scale-0"}`}>
						<TbCloudCancel size={27} />
					</span>
					{/* )} */}
				</span>
				<button
					onClick={() => {
						changePage("addFolder");
					}}
					className={`mr-3 transition-transform ${pageName.name === "folders" ? "scale-100" : "scale-0"}`}>
					<LuFolderPlus size={27} />
				</button>
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
