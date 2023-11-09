import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";

export default function Header() {
	return (
		<div className="flex justify-between font-bold items-center align-middle px-8 py-5 bg-amber-200 rounded-b-xl sticky top-0 drop-shadow z-10 backdrop-blur-sm">
			<span className="text-3xl">Notichi</span>
			<span>
				<Link href="/add" className="flex items-center">
					<BsPlusSquare size={25} />
				</Link>
			</span>
		</div>
	);
}
