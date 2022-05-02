import React, {useState,useContext} from 'react';
import MainPanel from "../MainPanel";
import {TiTickOutline} from "react-icons/ti";
import {ImCancelCircle} from "react-icons/im";
import {FiAlertCircle} from "react-icons/fi";
import {MdOutlineHowToVote} from "react-icons/md"
import { BillVoter } from "../../../context/BillVoter";
import {HiLockClosed} from "react-icons/hi"


const BtnInput =({name, color, id})=>{
    const {disconnectAccount, currentAccount,voteYesForBill,voteNoForBill,bills } = useContext(BillVoter);
    return(
        <button 
        onClick={name=== "Accept"?()=>voteYesForBill(id):()=>voteNoForBill(id)}
        className={`p-2 text-white rounded text-lg w-32 mx-2 ${color} hover:cursor-pointer hover:drop-shadow-md}`}>{name}</button>
    )
};


const VotingElement =({BillName})=>{
    
    const {disconnectAccount, currentAccount,bills,isLoading } = useContext(BillVoter);
   
    return(
        <div className="p-2 grid grid-cols-2 gap-2">



        {bills.map((bill,idx)=>(
            
            <div className="flex flex-col  border  m-2 bg-[#E5E5E5]" key={idx}>
            

            <p className="text-md">Bill Name : {bill.name} <span className="ml-4  motion-reduce:animate-ping text-blue-600 text-sm "> {bill.phase === "registeration"?"":bill.phase ==="closed"?"voting closed": "voting session in progress"}</span></p>

            {bill.hasVoted &&(
                <div className="flex flex-row justify-center mr-2 items-center border rounded">
                    <MdOutlineHowToVote fontSize={30}  color="blue"/>
                <h3 className="text-lg py-2 text-blue-500 mx-4 -mb-2">Already Voted</h3>

                </div>
            )}
            {!bill.hasVoted &&(<div className="mt-4 ">
               

           {bill.phase === "registeration" ?
            <div className="flex flex-row justify-center items-center border rounded ">
                <FiAlertCircle fontSize={21}  color="red"/>
            <h3 className="text-lg py-2 text-blue-500 mx-4">Voting Has Not Started</h3>
        
            </div>
           :(<>
           {bill.phase ==="closed" &&(
                <div className="flex flex-row">
                <HiLockClosed fontSize={30}  color="red"/>
            <p>voting session is closed</p>
            </div>
           )}
           {bill.phase !=="closed" &&(
                
                <div className={bill.phase === "registeration"? " hidden flex flex-row": "flex flex-row"} disabled={bill.phase === "registeration"? true: false} >
                <h3 className="text-xl pb-4 ">Vote :</h3>
                {isLoading && (
                        <>
                        <div className="animate-spin rounded-full h-22 w-22 ml-2 border-b-2 border-red-700"></div>
                        </>
                    ) }

                    {!isLoading &&(
<>
                    <div className="flex flex-row mr-8 items-center ">
                    
                    {bill.phase === "registeration"? ( <BtnInput name="Accept" color="bg-green-800 disabled" id={bill.id}/>): (<BtnInput name="Accept" color="bg-green-800" id={bill.id}/>)}
                    
                    
                    </div>
                    <div className="flex flex-row mx-4 items-center">

                   
                   {bill.phase === "registeration"? ( <BtnInput name="Reject" color="bg-red-800 disabled" id={bill.id}/>): (<BtnInput name="Reject"  color="bg-red-700" id={bill.id}/>)}
                    
                    
                    </div>
                    </>
                    )}
                </div>
           )}

           </>
           )} 
            </div>)}

            </div>
        ))
        }

        </div>
    )
}

const Voting=()=>{

    return(
        <>
        <MainPanel title="Voting Arena" content={<VotingElement BillName="The Election Amendment Bill ,2022"/>}/>
        </>
    )
}

export default Voting