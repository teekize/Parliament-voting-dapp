import React, {useState, useContext,useEffect} from 'react';
import { BsInfoCircle } from "react-icons/bs";
import {MdOutlineHowToVote} from "react-icons/md";
import {AiOutlineEdit} from "react-icons/ai";
import {MdInsertChartOutlined} from "react-icons/md";
import {RiLogoutBoxLine} from "react-icons/ri";
import {AiOutlineUserAdd} from "react-icons/ai";
import {IoIosAddCircle} from "react-icons/io";
import {RiLoader3Fill} from "react-icons/ri";
import m from "../../../images/m.svg"
import { Outlet,  NavLink} from "react-router-dom";
import { BillVoter } from "../../context/BillVoter";
import { ethers } from "ethers";

import { useNavigate } from 'react-router';

const SideElement =({icon, text})=>{
    return(
        <div className="flex flex-row my-2 px-2 justify-start  py-2 items-center hover:cursor-pointer">
           <>{icon}</>
           <p className="text-xl text-white">{text}</p>
        </div>
    )
};

const BtnInput =({name, connectWallet})=>{
    
    return(
        <button className="p-2 text-black w-32 mx-2 rounded bg-green-500 hover:bg-green-800"
        onClick={connectWallet}
        >{name}</button>
    )
}

const SideBar =()=>{
    const {disconnectAccount, currentAccount, mpInfo, speaker, account,isAdmin,isMp } = useContext(BillVoter);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!currentAccount){
            navigate("/")
        }
    })

    return(
        <div className="bg-green-700 text-black flex flex-col w-[25%]">

            {!isMp &&(
                <p>You cannot Vote on any Bill</p>
            )}
    
    {!isAdmin &&(
        <>
         <NavLink className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"} to="/welcome/info">

         <SideElement icon={<BsInfoCircle fontSize={21} className="text-white mx-3"/>} text="Information" />
         </NavLink >

        <NavLink className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"} to="/welcome/vote">
         <SideElement icon={<MdOutlineHowToVote fontSize={21} className="text-white mx-3"/>} text="Voting Arena" />
        </NavLink >

        <NavLink className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"} to="/welcome/results">
         <SideElement icon={<MdInsertChartOutlined fontSize={21} className="text-white mx-3"/>} text="Results" />
        </NavLink >

        <button className="p-2 text-black w-full  rounded bg-green-700  hover:bg-green-800"onClick={disconnectAccount}>
        <SideElement icon={<RiLogoutBoxLine fontSize={21} className="text-white mx-3"/>} text="Log out" />
        </button>

        </>
    )}
        {isAdmin && (
            <>
            <NavLink className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"}  to="/welcome/register">
                     <SideElement icon={<AiOutlineUserAdd fontSize={21} className="text-white mx-3"/>} text="Register Voter" />
            </NavLink >

            <NavLink  className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"} to="/welcome/addBill">
                <SideElement icon={<IoIosAddCircle fontSize={21} className="text-white mx-3"/>} text="Add Bill" />
            </NavLink >

            <NavLink className={({ isActive }) => isActive ? "bg-red-400" : "bg-green"}  to="/welcome/startVote">
                <SideElement icon={<RiLoader3Fill fontSize={21} className="text-white mx-3"/>} text="Start Vote" />
            </NavLink >

            <button className="p-2 text-black w-full  rounded bg-green-700  hover:bg-green-800"onClick={disconnectAccount}>
            <SideElement icon={<RiLogoutBoxLine fontSize={21} className="text-white mx-3"/>} text="Log out" />
            </button>           
         </>
        )}
      <Outlet />
        <img src={m} alt="kenyan-government-logo" className="pt-10"/>
      
        </div>
    )
}

export default SideBar;