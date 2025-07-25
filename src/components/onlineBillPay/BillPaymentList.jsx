import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillHistoryList = () => {
  const [billDetails, setBillDetails] = useState({
    societyName: '',
    personName: '',
    mobile: '',
    address: '',
    billNumber: '',
    amount: ''
  });

  const fetchBillDetails = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setBillDetails({
        societyName: 'Green Valley Society',
        personName: 'Mr. Suresh Patil',
        mobile: '+91 9876543210',
        address: 'Baner, Pune',
        billNumber: `BILL-${res.data.id}`,
        amount: '2500'
      });
    } catch (err) {
      console.error('Error fetching bill details:', err);
    }
  };

  useEffect(() => {
    fetchBillDetails();
  }, []);

  const handleMakePayment = () => {
    alert(`Payment of ₹${billDetails.amount} done for Bill No. ${billDetails.billNumber}`);
    // Later: Redirect or store payment confirmation
  };

  return (
    <div className="container mt-4">
      <h4 className="card-title py-2 mb-4 text-center  w-100 m-auto">
        BILL PAYMENT DETAILS
      </h4>

      <div className="row mt-3">
        <div className="col-md-6 mb-2">
          <label>Society Name</label>
          <input className="form-control" value={billDetails.societyName} readOnly />
        </div>
        <div className="col-md-6 mb-2">
          <label>Person Name</label>
          <input className="form-control" value={billDetails.personName} readOnly />
        </div>
        <div className="col-md-6 mb-2">
          <label>Mobile Number</label>
          <input className="form-control" value={billDetails.mobile} readOnly />
        </div>
        <div className="col-md-6 mb-2">
          <label>Address</label>
          <input className="form-control" value={billDetails.address} readOnly />
        </div>
        <div className="col-md-6 mb-2">
          <label>Bill Number</label>
          <input className="form-control" value={billDetails.billNumber} readOnly />
        </div>
        <div className="col-md-6 mb-2">
          <label>Amount Payable (₹)</label>
          <input className="form-control" value={billDetails.amount} readOnly />
        </div>
      </div>

      <div className="mt-3 text-center">
        <button className="btn btn-success mb-5 mt-4" onClick={handleMakePayment}>
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default BillHistoryList;
