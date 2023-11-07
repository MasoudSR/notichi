import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between px-6 py-4 m-4 bg-amber-200 border-r-3 rounded-lg">
      <span>Search</span>
			<span className='absolute left-1/2 -translate-x-1/2'>Notichi</span>
			<span><Link href="/add">Add</Link></span>
		</div>
  )
}
