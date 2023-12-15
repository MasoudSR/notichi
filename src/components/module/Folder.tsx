import { Context } from "@/app/provider";
import { useContext } from "react";

export default function Folder({ id, name }: { id: string; name: string }) {
	const { setPageName, setPageId, setIsMounted } = useContext(Context);

	return (
		<div
			className="bg-white rounded-b-lg rounded-tr-lg drop-shadow p-8 relative text-center mt-3 cursor-pointer"
			onClick={() => {
				setIsMounted(false);
				setTimeout(() => setPageName!("folder"), 150);
				setPageId(id);
			}}>
			<div className="absolute left-0 -top-2 h-4 max-w-[40%] w-full bg-white rounded-t-lg"></div>
			{name}
		</div>
	);
}
