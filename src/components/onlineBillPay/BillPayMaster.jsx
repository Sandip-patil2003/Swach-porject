import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
import BillPaymentForm from './BillPaymentForm';
import BillHistoryList from './BillPaymentList';

const PaymentMaster = () => {
    return (
        <div className="container mt-4">
           
            <BillPaymentForm />
            
            <Routes>
                <Route path="/bill-history" element={<BillHistoryList />} />
            </Routes>
        </div>
    );
};

export default PaymentMaster;
