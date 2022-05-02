import React, {useState, useContext,useEffect} from 'react';
import MainContent from '../MainContent';
import AddBill from "../Pages/AddBill"

const AddBillPage=()=>{
    return <MainContent content={<AddBill />} />;
}

export default AddBillPage;