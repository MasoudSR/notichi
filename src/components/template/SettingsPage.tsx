"use client"

export default function SettingsPage() {
  const syncHandler = (checkbox:any) =>{
    if(checkbox.target.checked  == true){
        console.log("sync is on")
    }else{
        console.log("sync is off")
   }
}
	return (
		<div>
			<div className="m-6 font-medium text-2xl flex justify-between bg-white rounded-lg py-3 px-5 items-center">
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
			</div>
		</div>
	);
}
