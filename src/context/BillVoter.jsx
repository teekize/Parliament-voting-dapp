import React, { useState, useEffect,useContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../utils/constants";

export const BillVoter = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const  billcontract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return billcontract;
};

export const BillProvider = ({ children }) => {
    let account;
   const [currentAccount, setAccount]=useState("");
    const [isAdmin, setAdmin]=useState(false);
    const [isMp, setIsMp]=useState(false);
    const [mpInfo,setMpInfo]=useState();
    const [speaker,setSpeaker]=useState("");
    const [isLoading,setIsloading]=useState(false);
    const [bills,setAllBills]=useState([])

    const [Bill, setRegisterBil]=useState({
        name:"",
        year:"",
    })
    const [voter, setVoter]=useState({
        address:"",
        constituency:"",
    })

    const [admin, setAdminValue]=useState({
        admin:""
    })



    const handleChange=(e,name, setChange)=>{
        setChange((prevState)=>({...prevState, [name]:e.target.value}))
    }

    const handleRegisterBill=(e,name)=>{
        handleChange(e, name, setRegisterBil)
    }

    const handelAdminValue=(e,name)=>{
        handleChange(e, name, setAdminValue)
    }


    const handleRegisterVoter=(e,name)=>{
        handleChange(e, name, setVoter)
    }

    const getAdmin=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            let admin=await billcontract.admin();
           
            if(admin.toLowerCase() === currentAccount.toLowerCase()){
                setAdmin(true);
            }
            console.log(isAdmin)
            console.log(admin.toLowerCase())
            console.log(currentAccount.toLowerCase())
             
            setSpeaker(admin);
        }catch(e){
            console.log(e)
        }
    }

    const checkIfWalletIsConnected=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const accounts= await ethereum.request({method:"eth_accounts"});
            if(accounts.length){
                
                account=accounts[0];
                setAccount(account);
            }else{
                console.log("no account found")
            }

        }catch(e){
            console.log(e)
            throw new Error("No ethereum account!")
        }
    }

    const connectWallet=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const accounts= await ethereum.request({method:"eth_requestAccounts"});

            account=accounts[0];
            setAccount(account);
        }catch(e){
            console.log(e)
            throw new Error("No ethereum account!")
        }
    }

    const disconnectAccount =()=>{
        if(currentAccount){
            setAccount("")
        }
    }

    const changeAdmin=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            const [address]=admin;

            await billcontract.changeAdmin(address) // address to become admin
            
        }catch(e){
            console.log(e)
        }
    }

    const registerVoter=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            const {address, constituency}=voter;
            let tx=await billcontract.registerVoter(address,constituency) ;

            setIsloading(true);
           console.log(`Loading -${tx.hash}`)

           await tx.wait();
           setIsloading(false);
           setRegisterBil({address:"", constituency:""})
          
            
        }catch(e){
            console.log(e)
        }
    }

    const registerBill=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            const {name, year}=Bill;
          let tx=await billcontract.registerBill(name,year) ;
          setIsloading(true);
          console.log(`Loading -${tx.hash}`)

          await tx.wait();
          setIsloading(false);
          setRegisterBil({name:"", year:""})
            
        }catch(e){
            console.log(e)
        }
    }

    const allBills =async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
          
          let allBils=await billcontract.returnBills() ;



          if(allBils){
              let newBills=[]

              for(let i=allBils.length; i>0; i--){
                  let isvoted=await billcontract.hasVoted(i,account)
                let newBill= await billcontract.bills(i);
                newBill={
                name:newBill.name,
                year:newBill.year,
                id:newBill.id.toNumber(),
                yesVotes:newBill.yesVotes.toNumber(),
                noVotes:newBill.noVotes.toNumber(),
                hasVoted:isvoted,
                phase:newBill.phase === 0? "registeration": newBill.phase === 1?"voting": "closed"
                }
                console.log(newBill)
                newBills.push(newBill);
                
              }
          setAllBills(newBills);
        }

        }catch(e){
            console.log(e)
        }
    }

    const changeBillPhase=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
           let tx= await billcontract.changeBillPhase(id) ;
            setIsloading(true);
            console.log(`Loading -${tx.hash}`)
  
            await tx.wait();
            setIsloading(false);
            location.reload();
            
        }catch(e){
            console.log(e)
        }
    }

    const closeVoting=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
            await billcontract.closeVoting(id) ;
            
        }catch(e){
            console.log(e)
        }
    }

    const voteYesForBill=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
           let tx= await billcontract.voteYesForBill(id);
            setIsloading(true);
          console.log(`Loading -${tx.hash}`)

          await tx.wait();
          setIsloading(false);
          location.reload();
            
        }catch(e){
            console.log(e)
        }
    }

    const voteNoForBill=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
            let tx=await billcontract.voteNoForBill(id);
            setIsloading(true);
            console.log(`Loading -${tx.hash}`)
  
            await tx.wait();
            setIsloading(false);
            location.reload();
            
        }catch(e){
            console.log(e)
        }
    }

    const hasVoted=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
            let name=await billcontract.hasVoted(id, currentAccount);
            return name;
            
        }catch(e){
            console.log(e)
        }
    }

    const results=async(id)=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            
            await billcontract.results(id) ;
            
        }catch(e){
            console.log(e)
        }
    }

    const voterInfo =async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const billcontract=getEthereumContract();
            let res=await billcontract.isVoter(currentAccount); 
            setIsMp(res)          
        }catch(e){
            console.log(e)
        }
    }
   

    useEffect(() => {
        if(currentAccount){
            checkIfWalletIsConnected();
        }
        getAdmin();
        allBills();
        voterInfo();
    }, [isAdmin, currentAccount])

  return (
    <BillVoter.Provider value={{closeVoting,isMp,account,voteNoForBill,allBills, voteYesForBill,hasVoted, bills,changeBillPhase,registerBill,Bill,isLoading,voter, speaker,mpInfo, handelAdminValue, closeVoting, changeBillPhase, registerVoter,connectWallet,currentAccount,isAdmin ,isLoading, handleRegisterBill,disconnectAccount,handleRegisterVoter,results}}>
      {children}
    </BillVoter.Provider>
  );
};
