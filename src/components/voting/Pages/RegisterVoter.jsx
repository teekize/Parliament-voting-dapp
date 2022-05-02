import React, {useState, useContext,useEffect} from 'react';
import { BillVoter } from "../../../context/BillVoter";
import MainPanel from "../MainPanel";
import {TiTickOutline} from "react-icons/ti";
import {ImCancelCircle} from "react-icons/im";

const BtnInput =({name, handleClick})=>{
    return(
        <button className={`p-2 text-white text-lg w-32 mx-2 bg-green-500 hover:bg-green-700 `}
        onClick={handleClick}
        >{name}</button>
    )
};


const  RegisterElement=()=>{
    const [isOngoing, setIsOngoing] =useState(false);
    const {handleRegisterVoter, voter,registerVoter, isLoading} = useContext(BillVoter);
    return(
        <div className="p-8 px-20">
                
            <div className="flex flex-col py-8">
                    <div className="flex mr-8 items-center my-6">
                    <input type="text" className="w-full p-2 text-black border-b-2 border-black outline-none" name="address" placeholder="Copy Account Address to Register" onChange={(e)=>handleRegisterVoter(e,"address")}/>
                    </div>

                    <div className="flex mr-8 items-center my-6">
                    <input type="text" className="w-full p-2 text-black border-b-2 border-black outline-none" name="constituency" placeholder="MP. Starehe"  onChange={(e)=>handleRegisterVoter(e,"constituency")}/>
                    </div>
                    <div className="flex   items-center  my-6">
                    {isLoading && (
                        <>
                        <div className="animate-spin rounded-full h-32 w-32 ml-40 border-b-2 border-red-700"></div>
                        </>
                    ) }

{!isLoading && (
                       
                   <BtnInput name="Register" handleClick={registerVoter}/>
                    ) }
                    </div>
                </div>
       <p>{voter.address}</p>
       <p>{voter.constituency}</p>
        </div>
    )
}

const Register=()=>{

    return(
        <>
        <MainPanel title="Voter Authentication" content={<RegisterElement />}/>
        </>
    )
}

export default Register