import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillFormat = () => {
  const [billData, setBillData] = useState([]);
  const [adjustmentData, setAdjustmentData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      setBillData(res.data.slice(0, 2));
    });
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      setAdjustmentData(res.data.slice(0, 2));
    });
  }, []);

  const handleEdit = (id) => {
    console.log('Edit:', id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setAdjustmentData(adjustmentData.filter(item => item.id !== id));
  };

  return (
    <div className="card p-4">
      <h4 className="mb-4 border-bottom pb-2">Bill Format</h4>
      <table className="table table-bordered mb-5">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Society Name</th>
            <th>Product Type</th>
            <th>Amount (Rs)</th>
            <th>Month</th>
            <th>Year</th>
            
          </tr>
        </thead>
        <tbody>
          {billData.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>Swach Phase 1 Society</td>
              <td>Waste Collection</td>
              <td>20000</td>
              <td>July</td>
              <td>2021</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-5 text-center">
        <button className="btn btn-outline-primary btn-sm me-2">Print</button>
        <button className="btn btn-outline-success btn-sm">Save</button>
      </div>
      <h4 className="mb-3">Bill Adjustment</h4>
      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>Society Name</th>
            <th>Bill No.</th>
            <th>Month</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adjustmentData.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>Swach Phase 1 Society</td>
              <td>123456</td>
              <td>July</td>
              <td>2021</td>
              <td>
                <button onClick={() => handleEdit(item.id)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillFormat;
