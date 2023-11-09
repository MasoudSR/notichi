import Link from "next/link";
import { GrAddCircle } from "react-icons/gr";

export default function Header() {
	return (
		<div className="flex justify-between font-bold items-center align-middle px-8 py-5 bg-amber-200/80 rounded-b-xl sticky top-0 drop-shadow z-10 backdrop-blur">
			<span className="text-3xl">Notichi</span>
			<span>
				<Link href="/add" className="flex items-center">
					Add
					<GrAddCircle />
				</Link>
			</span>
		</div>
	);
}
