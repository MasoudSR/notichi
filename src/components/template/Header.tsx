"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPlusSquare } from "react-icons/bs";
import { IoChevronBackOutline } from "react-icons/io5";

export default function Header() {
	const pathName = usePathname();
	return (
		<div className="flex justify-between font-bold items-center align-middle px-8 py-5 bg-amber-200 rounded-b-xl sticky top-0 drop-shadow z-10 backdrop-blur-sm">
			<div className="flex items-center">
				{pathName !== "/" && (
					<Link href="/">
						<IoChevronBackOutline size={25} />
					</Link>
				)}

				<span className="text-3xl">Notichi</span>
			</div>
			<span>
				<Link href="/add" className="flex items-center">
					<BsPlusSquare size={25} />
				</Link>
			</span>
		</div>
	);
}
