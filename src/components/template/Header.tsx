"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CgFileAdd } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";

export default function Header() {
	const pathName = usePathname();
	const router = useRouter();
	const pathCheck = () => {
		const paths = ["/", "/folders", "/settings"];
		return paths.includes(pathName);
	};
	return (
		<div className="flex justify-between font-bold items-center align-middle pl-12 pr-9 py-5 bg-amber-200 rounded-b-xl sticky top-0 drop-shadow z-10 backdrop-blur-sm">
			<div className="flex items-center">
				{!pathCheck() && (
					<button className="absolute left-3" onClick={router.back}>
						<BiArrowBack size={27} />
					</button>
				)}
				<span className="text-3xl">Notichi</span>
			</div>
			<span>
				<Link href="/add" className="flex items-center">
					<CgFileAdd size={27} />
				</Link>
			</span>
		</div>
	);
}
