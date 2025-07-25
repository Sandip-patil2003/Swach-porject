import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ societyName: '', billNo: '', month: '', year: '' });

  const handleEdit = (id) => {
    const item = adjustmentData.find(item => item.id === id);
    setEditId(id);
    setEditData({
      societyName: item.societyName || 'Swach Phase 1 Society',
      billNo: item.billNo || '123456',
      month: item.month || 'July',
      year: item.year || '2021'
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    const updatedItem = {
      ...adjustmentData.find(item => item.id === id),
      societyName: editData.societyName,
      billNo: editData.billNo,
      month: editData.month,
      year: editData.year
    };
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedItem);
      setAdjustmentData(adjustmentData.map(item => item.id === id ? updatedItem : item));
      setEditId(null);
    } catch (err) {
      alert('Failed to update bill adjustment.');
      console.error('Edit Error:', err);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setAdjustmentData(adjustmentData.filter(item => item.id !== id));
  };
  

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Bill Format', 14, 16);
    const tableColumn = ['#', 'Society Name', 'Product Type', 'Amount (Rs)', 'Month', 'Year'];
    const tableRows = billData.map((item, i) => [
      i + 1,
      'Swach Phase 1 Society',
      'Waste Collection',
      '20000',
      'July',
      '2021'
    ]);
    if (doc.autoTable) {
      doc.autoTable({ head: [tableColumn], body: tableRows, startY: 22 });
    }
    doc.save('BillFormat.pdf');
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
        <button className="btn btn-outline-primary btn-sm me-2" onClick={handlePrintPDF}>Print</button>
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
              {editId === item.id ? (
                <>
                  <td><input name="societyName" value={editData.societyName} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                  <td><input name="billNo" value={editData.billNo} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                  <td><input name="month" value={editData.month} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                  <td><input name="year" value={editData.year} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleEditSave(item.id)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={handleEditCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.societyName || 'Swach Phase 1 Society'}</td>
                  <td>{item.billNo || '123456'}</td>
                  <td>{item.month || 'July'}</td>
                  <td>{item.year || '2021'}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)} className="btn  btn-sm me-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillFormat;
