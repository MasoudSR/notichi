"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CgFileAdd } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import { LuFolderPlus } from "react-icons/lu";

export default function Header() {
	const pathName = usePathname();
	const router = useRouter();
	const pathCheck = () => {
		const paths = ["/", "/folders", "/settings"];
		return paths.includes(pathName);
	};
	return (
		<div className="flex justify-between font-bold items-center align-middle pl-12 pr-9 py-5 bg-[#fed700] lg:rounded-b-3xl sticky top-0 drop-shadow z-10">
			<div className="flex items-center">
				{!pathCheck() && (
					<button className="absolute left-3" onClick={router.back}>
						<BiArrowBack size={27} />
					</button>
				)}
				<span className="text-3xl">Notichi</span>
			</div>
			<span className="flex">
				{pathName === "/folders" && (
					<Link href="/folders/new" className="mr-3">
						<LuFolderPlus size={27} />
					</Link>
				)}
				<Link href="/add">
					<CgFileAdd size={27} />
				</Link>
			</span>
		</div>
	);
}
