const MainPanel =({title, content})=>{
    return(
        <div className="flex flex-col  bg-[#E5E5E5] flex-[80%] p-4">
            
             
         <div className="-mb-5 p-4 text-left bg-green-700  rounded-xl flex w-[80%] mx-auto z-10">
            <p className="text-xl text-white">{title}</p>
         </div>

         <div className="border-2 border-black rounded bg-white pt-8">
             <>
             {content}
             </>
         </div>

        </div>
    )
}

export default MainPanel;