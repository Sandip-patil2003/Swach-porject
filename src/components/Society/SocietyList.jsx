import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SocietyList() {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const[Entries , setEntries] = useState(10);

  const fetchData = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // Add demo startDate
    const demoData = res.data.slice(0, 30).map((item, idx) => ({
      ...item,
      startDate: idx % 2 === 0 ? '01/09/2021' : '01/08/2021'
    }));
    setSocieties(demoData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setSocieties(societies.filter(item => item.id !== id));
    } catch (err) {
      alert('Failed to delete society.');
      console.error('Delete Error:', err);
    }
  };

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', startDate: '', personName: '', mobileNo: '', landlineNo: '', emailId: '', nof: '' });

  const handleEdit = (id) => {
    const society = societies.find(item => item.id === id);
    setEditId(id);
    setEditData({
      title: society.title,
      startDate: society.startDate,
      personName: society.personName || '',
      mobileNo: society.mobileNo || '',
      landlineNo: society.landlineNo || '',
      emailId: society.emailId || '',
      nof: society.nof || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    const updatedSociety = {
      ...societies.find(item => item.id === id),
      title: editData.title,
      startDate: editData.startDate,
      personName: editData.personName,
      mobileNo: editData.mobileNo,
      landlineNo: editData.landlineNo,
      emailId: editData.emailId,
      nof: editData.nof
    };
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedSociety);
      setSocieties(societies.map(item => item.id === id ? updatedSociety : item));
      setEditId(null);
    } catch (err) {
      alert('Failed to update society.');
      console.error('Edit Error:', err);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleExportExcel = () => {
    const exportData = societies.map(item => ({
      'Society Name': item.title,
      'Start Date': item.startDate,
      'Person Name': item.personName || 'Mr. Demo',
      'Mobile No.': item.mobileNo || '+91XXXX',
      'Landline No.': item.landlineNo || '020XXXX',
      'Email ID': item.emailId || 'email@example.com',
      'No. of Flats': item.nof || '100'
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Societies');
    XLSX.writeFile(workbook, 'SocietyList.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('List of Society', 14, 10);
    // Try both ways for autoTable compatibility
    if (typeof doc.autoTable === 'function') {
      doc.autoTable({
        head: [['Society Name', 'Start Date', 'Person Name', 'Mobile No.', 'Landline No.', 'Email ID', 'No. of Flats']],
        body: societies.map(item => [
          item.title,
          item.startDate,
          item.personName || 'Mr. Demo',
          item.mobileNo || '+91XXXX',
          item.landlineNo || '020XXXX',
          item.emailId || 'email@example.com',
          item.nof || '100'
        ])
      });
    } else if (window.jspdfAutoTable) {
      window.jspdfAutoTable(doc, {
        head: [['Society Name', 'Start Date', 'Person Name', 'Mobile No.', 'Landline No.', 'Email ID', 'No. of Flats']],
        body: societies.map(item => [
          item.title,
          item.startDate,
          item.personName || 'Mr. Demo',
          item.mobileNo || '+91XXXX',
          item.landlineNo || '020XXXX',
          item.emailId || 'email@example.com',
          item.nof || '100'
        ])
      });
    }
    doc.save('SocietyList.pdf');
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Bill Format', 14, 10);
    // Use window.jspdfAutoTable if doc.autoTable is not available
    if (typeof doc.autoTable === 'function') {
      doc.autoTable({
        head: [['#', 'Society Name', 'Product Type', 'Amount (Rs)', 'Month', 'Year']],
        body: societies.map(item => [
          item.title,
          item.startDate,
          item.personName || 'Mr. Demo',
          item.mobileNo || '+91XXXX',
          item.landlineNo || '020XXXX',
          item.emailId || 'email@example.com',
          item.nof || '100'
        ])
      });
    } else if (window.jspdfAutoTable) {
      window.jspdfAutoTable(doc, {
        head: [['#', 'Society Name', 'Product Type', 'Amount (Rs)', 'Month', 'Year']],
        body: societies.map(item => [
          item.title,
          item.startDate,
          item.personName || 'Mr. Demo',
          item.mobileNo || '+91XXXX',
          item.landlineNo || '020XXXX',
          item.emailId || 'email@example.com',
          item.nof || '100'
        ])
      });
    } else {
      alert('jspdf-autotable is not loaded. Please check your imports and package installation.');
    }
    doc.save('BillFormat.pdf');
  };

  return (
    <div>
      <h5 className="text-center">LIST OF SOCIETY</h5>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <button className="btn btn-outline-dark btn-sm me-2" onClick={handleExportExcel}>Excel</button>
          <button className="btn btn-outline-dark btn-sm" onClick={handleExportPDF}>PDF</button>
        </div>
        <div>
          <span>Show </span>
          <select
            className="form-select form-select-sm d-inline-block w-auto"
            style={{ width: 60 }}
            value={Entries}
            onChange={e => { setEntries(Number(e.target.value)); setPage(1); }}
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <span> Entries</span>
        </div>
        <div>
          <span>Search : </span>
          <input
            type="text"
            className="form-control form-control-sm d-inline-block w-auto"
            style={{ width: 120 }}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>
      <table className="table table-bordered table-striped client table-sm">
        <thead className='table-dark'>
          <tr >
            <th>#</th>
            <th>Society Name</th>
            <th>Start Date</th>
            <th>Person Name</th>
            <th>Mobile No.</th>
            <th>Landline No.</th>
            <th>Email ID</th>
            <th>No. of Flats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {societies
            .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            .slice((page - 1) * Entries, page * Entries)
            .map((item, index) => (
              <tr key={item.id}>
                <td>{(page - 1) * Entries + index + 1}</td>
                {editId === item.id ? (
                  <>
                    <td><input name="title" value={editData.title} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="startDate" value={editData.startDate} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="personName" value={editData.personName} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="mobileNo" value={editData.mobileNo} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="landlineNo" value={editData.landlineNo} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="emailId" value={editData.emailId} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="nof" value={editData.nof} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td className='d-flex flex-row'>
                      <button className="btn btn-sm btn-success me-1" style={{fontSize:'13px'}} onClick={() => handleEditSave(item.id)}>SAVE</button>
                      <button className="btn btn-sm btn-secondary" style={{fontSize:'13px'}} onClick={handleEditCancel}>CANCEL</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.title}</td>
                    <td>{item.startDate}</td>
                    <td>{item.personName || 'Mr. Demo'}</td>
                    <td>{item.mobileNo || '+91XXXX'}</td>
                    <td>{item.landlineNo || '020XXXX'}</td>
                    <td>{item.emailId || 'email@example.com'}</td>
                    <td>{item.nof || '100'}</td>
                    <td className='d-flex flex-row'>
                      <button className="btn btn-sm  me-1" /* style={{fontSize:'13px',  border:'1px solid black' }} */ onClick={() => handleEdit(item.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg></button>
                      <button className="btn btn-sm " /* style={{fontSize:'13px', border:"1px solid deepskyblue"}} */ onClick={() => handleDelete(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mb-5 align-items-center">
        <span>
          Showing {(societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? 0 : ((page - 1) * Entries + 1))}
          to {Math.min(page * Entries, societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length)} of {societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length} entries
        </span>
        <div>
          <button className="btn btn-sm btn-outline-dark me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <button className="btn btn-sm btn-outline-dark" disabled={page * Entries >= societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default SocietyList;
