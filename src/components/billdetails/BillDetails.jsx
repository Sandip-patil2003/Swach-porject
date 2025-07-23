import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BillDetails.css';

const BillDetails = () => {
  const [formData, setFormData] = useState({
    societyName: '',
    month: '',
    year: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      navigate('/format');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className="border p-4 mb-4 bg-light rounded" style={{ maxWidth: '800px', margin: '40px auto', fontSize: '1.15rem' }}>
      <h3 className="text-center mb-4" style={{ fontSize: '2rem',  }}>BILL DETAILS</h3>
      <div className="row">
        <div className="col-md-6">
          <label  className='size'>Society Name</label>
          <select className="form-control mx-auto w-75 h-50 text" name="societyName" value={formData.societyName} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Swach Phase 1 Society">Swach Phase 1 Society</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className='size'>Month</label>
          <select className="form-control mx-auto w-75 h-50 text"  name="month" value={formData.month} onChange={handleChange} >
            <option value="">Select</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label  className='size'>Year</label>
          <input type="number" name="year" min="2000" max="2099" className="form-control mx-auto w-75 h-50" value={formData.year} onChange={handleChange} style={{ fontSize: '1.1rem' }} />
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary me-2" style={{minWidth: '150px' }} onClick={handleSubmit}>Generate Bill</button>
        <button className="btn btn-secondary" style={{ minWidth: '120px' }}>Cancel</button>
      </div>
    </div>
  );
};

export default BillDetails;

