import React, {useState, useContext,useEffect} from 'react';
import { BillVoter } from "../../../context/BillVoter";
import MainPanel from "../MainPanel";

const InformationContent =()=>{
    const {disconnectAccount, currentAccount,isAdmin, speaker } = useContext(BillVoter);
    console.log(isAdmin)
    return(
        <p className="px-2">
            Welcome:  <br />
         
            Here are a few guidelines for you: <br />
            <br />
            1. Voter Registration <br />

            • For casting the vote, the user first needs to register. A registration form is provided for you in the website.    <br />
            • A voter can only register in the registration phase. Once the phase is closed, a user cannot register and thus cannot vote.    <br />
            • For registration purposes, the user will have to enter his email address and account   <br /> address which the user will use for voting purposes.  
            <br />
            <br />
            2. Voting Process    <br />
            • The voting process is divided into three phases. All of which are initialized and terminated by the admin. Voters will have to participate according to  the current phase:    <br />   <br />
            i) Registration Phase: During this phase, the registration of the voters is carried out and authorized by the admin    <br />
            ii) Voting Phase: Once initialized by the admin, voters can cast their votes in the voting arena by clicking on Accept or Reject.   <br /> Once done, the transaction is authorized and the vote successfully casted.    <br />
            iii) Result Phase: This is the final stage of the whole voting process where the results of the elections are displayed on the “Results” section.<br />   <br />
        </p>
    )
}

const Info=()=>{

    return(
        <>
        <MainPanel title={"Information Page"} content={<InformationContent />}/>
        </>
    )
}

export default Info