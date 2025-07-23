import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillPaymentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    societyName: '',
    billNumber: '',
    month: '',
    year: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.societyName.trim()) newErrors.societyName = 'Society Name is required';
    if (!formData.billNumber.trim()) newErrors.billNumber = 'Bill Number is required';
    if (!formData.month) newErrors.month = 'Month is required';
    if (!formData.year || isNaN(formData.year) || formData.year < 2000 || formData.year > 2099) newErrors.year = 'Valid Year is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleGetDetails = async () => {
    if (!validate()) return;
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      navigate("/bill-history"); 
    } catch (error) {
      alert('Failed to submit');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({ societyName: '', billNumber: '', month: '', year: '' });
    setErrors({});
  };

  return (
    <div className="container-fluid bg-auth d-flex justify-content-center align-items-center min-vh-100">
      <div className="card card-auth p-4 bg-light rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">BILL PAYMENT</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="societyName" className="form-label w-100 " style={{marginLeft:"13%"}}>Society Name</label>
              <input
                className={`form-control mx-auto w-75 h-50${errors.societyName ? ' is-invalid' : ''}`}
                name="societyName"
                id="societyName"
                value={formData.societyName}
                onChange={handleChange}
                required
              />
              {errors.societyName && <div className="invalid-feedback d-block" style={{marginLeft:"13%"}}>{errors.societyName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="billNumber" className="form-label w-100 " style={{marginLeft:"13%"}}>Bill Number</label>
              <input
                className={`form-control mx-auto w-75 h-50${errors.billNumber ? ' is-invalid' : ''}`}
                name="billNumber"
                id="billNumber"
                value={formData.billNumber}
                onChange={handleChange}
                required
              />
              {errors.billNumber && <div className="invalid-feedback d-block" style={{marginLeft:"13%"}}>{errors.billNumber}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="month" className="form-label w-100 " style={{marginLeft:"13%"}}>Select Month</label>
              <select
                name="month"
                id="month"
                value={formData.month}
                onChange={handleChange}
                className={` form-control mx-auto w-75 h-50 ${errors.month ? ' is-invalid' : ''}`}
                style={{ fontSize: '15px' }}
                required
              >
                <option value="">Select</option>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                  .map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
              </select>
              {errors.month && <div className="invalid-feedback d-block" style={{marginLeft:"13%"}}>{errors.month}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label w-100 " style={{marginLeft:"13%"}}>Select Year</label>
              <input
                type="number"
                name="year"
                id="year"
                min="2000"
                max="2099"
                className={`form-control mx-auto w-75 h-50${errors.year ? ' is-invalid' : ''}`}
                style={{ fontSize: '15px' }}
                value={formData.year}
                onChange={handleChange}
                required
              />
              {errors.year && <div className="invalid-feedback d-block " style={{marginLeft:"13%"}}>{errors.year}</div>}
            </div>
            <div className="mt-4 text-center">
              <button type="button" className="btn btn-primary me-2" onClick={handleGetDetails}>Get Details</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillPaymentForm;


