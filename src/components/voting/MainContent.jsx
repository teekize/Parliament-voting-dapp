import Sidebar from "./SidePanel";
const MainContent =({content})=>{
    return(
        <div className="flex flex-row h-screen bg-[#E5E5E5]">
            <Sidebar />
            <>{content}</>
        </div>
    )
}

export default MainContent;