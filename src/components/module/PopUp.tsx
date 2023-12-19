export default function PopUp({
	blueBtnText,
	whiteBtnText,
	text,
	blueBtnFunc,
	whiteBtnFunc,
}: {
	text: string;
	blueBtnText: string;
	whiteBtnText: string;
	blueBtnFunc: () => void;
	whiteBtnFunc: () => void;
}) {
	return (
		<div className="fixed max-w-md top-[40%] left-[50%] z-20 drop-shadow -translate-x-[50%] w-[80%]">
			<div className={`bg-white animate-jump-in animate-duration-300 p-8 rounded-3xl`}>
				{text}
				<div className="justify-between mt-4 grid grid-cols-2 gap-6">
					<button
						className="bg-[#017AFF] text-white font-medium p-3 rounded-lg shadow-md shadow-[#017AFF]/30"
						onClick={blueBtnFunc}>
						{blueBtnText}
					</button>
					{
						<button className="inline-block text-center border p-3 rounded-lg shadow-md" onClick={whiteBtnFunc}>
							{whiteBtnText}
						</button>
					}
				</div>
			</div>
		</div>
	);
}
