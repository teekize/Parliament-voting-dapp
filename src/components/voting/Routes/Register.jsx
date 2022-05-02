import React from 'react';
import MainContent from '../MainContent';
import RegisterVoter from "../Pages/RegisterVoter"

const RegisterPage=()=>{
    return <MainContent content={<RegisterVoter />} />;
}

export default RegisterPage;