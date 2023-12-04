"use client";

import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function SettingsPage() {
	// const syncHandler = (checkbox: any) => {
	// 	if (checkbox.target.checked == true) {
	// 		console.log("sync is on");
	// 	} else {
	// 		console.log("sync is off");
	// 	}
	// };

	const { status, data: session } = useSession();

	const syncHandler = async () => {
		const data = loadStorage();
		try {
			const res = await toast.promise(
				fetch("/api/cloud", {
					method: "POST",
					headers: { "Content-Type": "application-json" },
					body: JSON.stringify(data),
				}),
				{
					pending: "Sync in Progress",
				}
			);
			const syncedData = await res.json();
			saveStorage(syncedData);
			toast.success("Data Synced Successfully")
		} catch (error) {
			toast.error("Error in Synchronizing Data")
		}
	};

	return (
		<div>
			{status === "authenticated" && (
				<div className="m-6 font-medium text-xl bg-white rounded-lg flex flex-col justify-center">
					<div className="flex gap-4 m-4">
						<Image src={session?.user?.image!} alt={session?.user?.name!} width={70} height={70} />
						<div className="flex flex-col">
							<span>{session?.user?.name}</span>
							<span className="font-light">{session?.user?.email}</span>
						</div>
					</div>
					<div className="w-full border-t flex p-4 gap-4">
						<button
							className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30 w-full"
							onClick={syncHandler}>
							Sync with Cloud
						</button>
						<button
							className="text-center bg-red-500 text-white p-3 rounded-lg shadow-md shadow-red-500/30 w-80"
							onClick={() => signOut()}>
							Sign Out
						</button>
					</div>
				</div>
			)}
			<div className="m-6 font-medium text-xl bg-white rounded-lg flex justify-center">
				{status === "loading" ? (
					<span className="border-4 border-t-orange-300 animate-spin h-8 w-8 m-3 block rounded-full" />
				) : (
					status !== "authenticated" && (
						<button className="w-full py-3 px-5" onClick={() => signIn("github")}>
							sign in with github
						</button>
					)
				)}
			</div>
			{/* <div className="m-6 font-medium text-xl flex justify-between bg-white rounded-lg py-3 px-5 items-center">
				<span>Sync Notes (soon)</span>
				<label className="relative flex justify-between items-center p-2 text-xl">
					<input
						type="checkbox"
						className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
						onChange={syncHandler}
						disabled
					/>
					<span className="w-16 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8"></span>
				</label>
			</div> */}
		</div>
	);
}
