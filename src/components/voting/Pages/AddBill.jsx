import React, {useState, useContext,useEffect} from 'react';
import { BillVoter } from "../../../context/BillVoter";
import MainPanel from "../MainPanel";


const BtnInput =({name, handleClick})=>{
    return(
        <button className={`p-2 text-white text-lg w-32 mx-2 bg-green-500 hover:bg-green-700 `}
        onClick={handleClick}
        >{name}</button>
        )
};


const  BillElement=()=>{
    const {handleRegisterBill,registerBill, isLoading, Bill} = useContext(BillVoter);

    return(
        <div className="p-8 px-20">
                
            <div className="flex flex-col py-8">
                    <div className="flex mr-8 items-center my-6">
                    <input type="text"  name="BillName" value={Bill.name} onChange={(e)=>{handleRegisterBill(e,"name")}} className="w-full p-2 text-black border-b-2 border-black outline-none" placeholder="Enter Bill Name " required="required"/>
                    </div>
                    <div className="flex mr-8 items-center my-6">
                    <input type="text"   name="Year" value={Bill.year} onChange={(e)=>{handleRegisterBill(e,"year")}} className="w-full p-2 text-black border-b-2 border-black outline-none" placeholder="Enter Year" required="required"/>
                    </div>
                    <div className="flex  items-center  my-6">
                    {isLoading && (
                        <>
                        <div className="animate-spin rounded-full h-32 w-32 ml-40 border-b-2 border-red-700"></div>
                        </>
                    ) }

{!isLoading && (<BtnInput name="Add" handleClick={registerBill}/> ) }
                    </div>
                    </div>
                    <p>{Bill.name}</p>
                    <p>{Bill.year}</p>
                </div>
       
    )
}

const AddBill=()=>{

    return(
        <>
        <MainPanel title="Add Bill Information" content={<BillElement />}/>
        </>
    )
}

export default AddBill