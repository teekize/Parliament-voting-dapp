import React, {useState, useContext,useEffect} from 'react';
import m from "../../../../images/m.svg";
import { BillVoter } from "../../../context/BillVoter";
import { useNavigate } from 'react-router';

const BtnInput =({name, connectWallet})=>{
    
    return(
        <button className="p-2 text-black w-32 mx-2 rounded bg-green-500 hover:bg-green-800"
        onClick={connectWallet}
        >{name}</button>
    )
}



const FrontPage =()=>{
    const { connectWallet,currentAccount,speaker,isAdmin} = useContext(BillVoter);
    const navigate=useNavigate();
  
    useEffect(()=>{
        if(currentAccount){
            if(isAdmin){
                navigate("/welcome/register")
            }else{

                navigate("/welcome/info")
            }
        }
    }, [isAdmin,currentAccount])

    return(
        <div className="flex flex-row h-screen bg-[#E5E5E5]">
            <div className="flex-[1] bg-green-600 flex justify-center items-center rounded-r-[500px] border-none outline-none ">
                
                <img src={m} alt="kenyan-government-logo" className="w-[50%]" />
            </div>
             
            <div className="flex-[0.75] bg-[#E5E5E5] text-black flex flex-col  justify-center items-center">
                <h2 className="text-3xl pb-2">BILL-VOTER SYSTEM</h2>
                <h3 className="text-xl mb-2">Let your vote be heard</h3>
                <div className="flex flex-row justify-around">
                    <BtnInput name="Login" connectWallet={connectWallet} />
                    {/* <BtnInput name="Admin Login" connectWallet={connectWallet} /> */}
                </div>
            </div>
        </div>
    )
}

export default FrontPage;