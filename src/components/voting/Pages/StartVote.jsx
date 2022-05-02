import React, {useState, useContext,useEffect} from 'react';
import { BillVoter } from "../../../context/BillVoter";
import MainPanel from "../MainPanel";
import {HiLockClosed} from "react-icons/hi"

const BtnInput =({name, handleClick})=>{
    return(
        <button className={`p-2 text-white text-lg w-32  bg-green-500 hover:bg-green-700  `}
        onClick={handleClick}
        >{name}</button>
        )
};

const BillCard=({BillId})=>{
    const {changeBillPhase,closeVoting } = useContext(BillVoter);

    
    
    return(
        <div className="w-40 p-4  text-black border-2 border-black mr-2">
            <p></p>
            <p className="mb-3">Phase</p>

            
            <button className={`p-2 text-white text-lg w-32  bg-green-500 hover:bg-green-700  `}
        onClick={()=>changeBillPhase(BillId)}
        >Start Vote</button>
        

        </div>
    )
}

const  BillElement=()=>{
    const {bills,changeBillPhase,currentAccount,closeVoting ,isLoading,allBills} = useContext(BillVoter);
    
    useEffect(() => {
        allBills()
    }, [])
    return(
        <div className="p-8 px-20">
                
            <div className="p-2 grid grid-cols-2 gap-2">


{
    bills.map((bill,idx)=>( 
        <div className="w-54 p-2  text-black border-2 border-black mr-2" key={idx}>
            <p className="text-sm">Bill Name: {bill.name}</p>
            <p className="mb-3 text-blue-500">Phase: {bill.phase}</p>
            {bill.phase ==="closed" &&(
                <div className="flex flex-row">
                    <HiLockClosed fontSize={30}  color="red"/>
                <p>voting session is closed</p>
                </div>
            )}

        {bill.phase ==="voting" ?(
           <div className="flex flex-row">
            <button className="disabled bg-gray-500 p-2"
            >Start Vote</button>
            <button className={`p-2 text-white text-sm w-24 mx-3 bg-green-500 hover:bg-green-700`}
    
                    onClick={()=>closeVoting(bill.id)}
                    >Close Voting</button>
                    </div>
            ):(
                <>
                {isLoading ?(
                    <>
                    <div className="animate-spin rounded-full h-24 w-24  ml-2 border-b-2 border-red-700"></div>
                    </>
                ):(
                    <>
                    {bill.phase !== "closed" &&(

                    <button className={`p-2 text-white text-sm w-24 mx-3 bg-green-500 hover:bg-green-700`}
    
                    onClick={()=>changeBillPhase(bill.id)}
                    >Start Vote</button>
                    )}
</>
                    


                )}
                </>
            )
        }
        
        

        </div>
    ))
}
               
            </div>
        </div>
       
    )
}

const AllBills=()=>{

    return(
        <>
        <MainPanel title="Set Bill Phase" content={<BillElement />}/>
        </>
    )
}

export default AllBills