"use client";

import { Context } from "@/app/provider";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import PopUp from "../module/PopUp";
import Shadow from "../module/Shadow";
import { loadSettings, saveSettings } from "@/helpers/settingsManager";
import syncHandler from "@/helpers/syncHandler";

export default function SettingsPage() {
	const animationsBtnHandler = (checkbox: any) => {
		if (checkbox.target.checked == true) {
			const newSettings = { ...settings, animations: true };
			saveSettings(newSettings);
		} else {
			const newSettings = { ...settings, animations: false };
			saveSettings(newSettings);
		}
	};

	const autoSyncBtnHandler = (checkbox: any) => {
		if (checkbox.target.checked == true) {
			const newSettings = { ...settings, autoSync: true };
			setSettings(newSettings);
			saveSettings(newSettings);
		} else {
			const newSettings = { ...settings, autoSync: false };
			setSettings(newSettings);
			saveSettings(newSettings);
		}
	};

	const { status, data: session } = useSession();
	const { isMounted, setIsMounted, prevPageName, selectedPageName } = useContext(Context);
	const [clearStoragePopUp, setClearStoragePopUp] = useState(false);
	const [settings, setSettings] = useState(loadSettings);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const clearStorageHandler = () => {
		localStorage.removeItem("data");
		setClearStoragePopUp(false);
	};

	const animations = settings.animations
		? isMounted
			? prevPageName.name === "folders" || prevPageName.name === "notes"
				? "animate-fade-left animate-duration-150 animate-ease-out"
				: "animate-fade-up animate-duration-150 animate-ease-out"
			: selectedPageName === "folders" || selectedPageName === "notes"
			? "animate-fade-out-right animate-duration-150 animate-ease-out"
			: "animate-fade-down animate-duration-150 animate-ease-out animate-reverse"
		: "";

	return (
		<>
			<div className={`p-6 flex flex-col gap-8 ${animations}`}>
				{status === "loading" ? (
					<div className="flex font-medium text-xl bg-white rounded-lg justify-center">
						<span className="border-4 border-t-orange-300 animate-spin h-8 w-8 m-3 block rounded-full" />
					</div>
				) : (
					<div className="font-medium text-xl bg-white rounded-lg flex flex-col justify-center">
						{status === "authenticated" ? (
							<div>
								<div className="flex gap-4 m-4">
									<Image src={session?.user?.image!} alt={session?.user?.name!} width={70} height={70} />
									<div className="flex flex-col">
										<span>{session?.user?.name}</span>
										<span className="font-light whitespace-pre-line truncate text-[#8A8A8E]">
											{session?.user?.email}
										</span>
									</div>
								</div>
								<div className=" flex justify-between py-3 px-5 items-center border-t">
									<span>Auto Sync</span>
									<label className="relative flex justify-between items-center p-2">
										<input
											type="checkbox"
											defaultChecked={settings.autoSync}
											className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
											onChange={autoSyncBtnHandler}
										/>
										<span className="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8"></span>
									</label>
								</div>
								<div className="w-full border-t grid grid-cols-3 p-4 gap-4">
									<button
										className="bg-[#017AFF] text-white text-lg p-3 rounded-lg shadow-md shadow-[#017AFF]/30 col-span-2"
										onClick={()=>syncHandler("force")}>
										Sync Now
									</button>
									<button
										className="text-center bg-red-500 text-white sm:p-1 rounded-lg shadow-md shadow-red-500/30 text-lg"
										onClick={() => signOut()}>
										Sign Out
									</button>
								</div>
							</div>
						) : (
							<div>
								<button className="w-full py-3 px-5 flex justify-center gap-2" onClick={() => signIn("google")}>
									<Image src="/icons/Google-logo.svg" alt="GitHub" width={30} height={30} />
									Sign in with Google
								</button>
								<button
									className="w-full py-3 px-5 flex justify-center gap-2 border-t"
									onClick={() => signIn("github")}>
									<Image src="/icons/github-mark.svg" alt="GitHub" width={30} height={30} />
									Sign in with GitHub
								</button>
							</div>
						)}
					</div>
				)}
				<div className="font-medium text-xl flex flex-col bg-white rounded-lg">
					<div className="flex justify-between  py-3 px-5 items-center">
						<span>Animations</span>
						<label className="relative flex justify-between items-center p-2">
							<input
								type="checkbox"
								defaultChecked={settings.animations}
								className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
								onChange={animationsBtnHandler}
							/>
							<span className="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8"></span>
						</label>
					</div>
				</div>
				<div className="font-medium text-xl bg-white rounded-lg flex flex-col justify-center">
					<button
						className="text-center bg-red-500 text-white p-3 rounded-lg shadow-md shadow-red-500/30"
						onClick={() => setClearStoragePopUp(true)}>
						Clear Local Storage
					</button>
				</div>
				<div className="text-center text-[#8A8A8E]">
					<p>Notichi v1.3.0</p>
					<p>Made by Masoud S.Rad</p>
				</div>
			</div>
			{clearStoragePopUp && (
				<PopUp
					text={"Are you sure you want to clear all notes and folders in local storage?"}
					blueBtnText={"YES"}
					whiteBtnText={"NO"}
					blueBtnFunc={clearStorageHandler}
					whiteBtnFunc={() => setClearStoragePopUp(false)}
				/>
			)}

			{clearStoragePopUp && <Shadow setShow={setClearStoragePopUp} />}
		</>
	);
}
