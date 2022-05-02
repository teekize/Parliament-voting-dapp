import React, {useState,useContext} from 'react';
import MainPanel from "../MainPanel";
import {FcInfo} from "react-icons/fc";
import {FiAlertCircle} from "react-icons/fi";
import { BillVoter } from "../../../context/BillVoter";



const  ResultsElement=({BillName})=>{
    const [isOngoing, setIsOngoing] =useState(false);
    const {disconnectAccount, currentAccount,bills,isLoading } = useContext(BillVoter);
   
    return(
        <div className="p-4 grid grid-cols-3 gap-2">

{bills.map((bill,idx)=>(

<div className="flex flex-col p-2 border border-2 m-2 bg-[#E5E5E5]" key={idx}>
{bill.phase ==="closed" &&(

<p className="text-md text-blue-700 flex flex-row justify-center items-center p-0"><span className="mx-2"><FcInfo fontSize={21} color="blue"/></span>Voting closed</p>
)}



<p className="text-lg">Bill Name : {bill.name}</p>

{bill.phase === "registeration" ?(
     <div className="flex flex-flex justify-center items-center border rounded w-30">
        <FiAlertCircle fontSize={21}  color="red"/>
     <h3 className="text-lg py-2 text-blue-500 mx-4">Voting Has Not Started</h3>
</div>
):

<>

{bill.phase ==="closed" &&(
<div className="flex flex-col ">

<div className="flex mr-8 items-center">
<p className="text-md">Number Acepting : <span className="border-2 rounded">{bill.yesVotes}</span></p>
</div>
<div className="flex   items-center ">

<p  className="text-md">Number Rejecting :  <span className="border-2 rounded">{bill.noVotes}</span></p>
</div>

</div>

)}

{bill.phase !=="closed" &&(

<div className="flex flex-col py-2">
<div className="flex mr-8 items-center">
<p className="text-md">Number Acepting : <span className="border-2 rounded ">{bill.yesVotes}</span></p>
</div>
<div className="flex   items-center">

<p  className="text-md">Number Rejecting :  <span className="border-2 rounded">{bill.noVotes}</span></p>
</div>
</div>
)}
</>
}

</div>
))
}
</div>
    )
}

const Results=()=>{

    return(
        <>
        <MainPanel title="Results" content={<ResultsElement BillName="mama"/>}/>
        </>
    )
}

export default Results