import React, { useState } from 'react';
import axios from 'axios';
import './product.css';

const Product = () => {
  const [product, setProduct] = useState({
    type: '',
    shortName: '',
    costFlat: '',
    costSociety: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // Clear error as user types
    if (value.trim() !== '') {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!product.type) errors.type = 'Product Type is required';
    if (!product.shortName) errors.shortName = 'Short Name is required';
    if (!product.costFlat) errors.costFlat = 'Monthly Cost / Flat is required';
    if (!product.costSociety) errors.costSociety = 'Monthly Cost / Society is required';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop submission if any errors
    }

    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', product);
      alert('Product submitted successfully!');
      setProduct({ type: '', shortName: '', costFlat: '', costSociety: '' });
      setFormErrors({});
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Failed to submit product');
    }
  };

  const handleCancel = () => {
    setProduct({ type: '', shortName: '', costFlat: '', costSociety: '' });
    setFormErrors({});
  };

  return (
    <div className="container mt-4 p-4 border bg-light rounded">
      <h5 className="text-center mb-4">PRODUCT MASTER</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className='size'>Product Type</label>
          <select
            className="form-control mx-auto text w-75 h-50"
            name="type"
            value={product.type}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Waste Collection">Waste Collection</option>
            <option value="Dry Waste">Dry Waste</option>
          </select>
          {formErrors.type && (
            <small className="text-danger  size" style={{ marginLeft: '13%' }}>{formErrors.type}</small>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Short Name</label>
          <input
            className="form-control mx-auto w-75 h-50"
            name="shortName"
            value={product.shortName}
            onChange={handleChange}
          />
          {formErrors.shortName && (
            <small className="text-danger size" style={{ marginLeft: '13%' }} >{formErrors.shortName}</small>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Monthly Cost / Flat</label>
          <input
            className="form-control mx-auto w-75 h-50"
            name="costFlat"
            value={product.costFlat}
            onChange={handleChange}
          />
          {formErrors.costFlat && (
            <small className="text-danger size" style={{ marginLeft: '13%' }}>{formErrors.costFlat}</small>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Monthly Cost / Society</label>
          <input
            className="form-control mx-auto w-75 h-50"
            name="costSociety"
            value={product.costSociety}
            onChange={handleChange}
          />
          {formErrors.costSociety && (
            <small className="text-danger size" style={{ marginLeft: '13%' }}>{formErrors.costSociety}</small>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>SUBMIT</button>
        <button className="btn btn-secondary" onClick={handleCancel}>CANCEL</button>
      </div>
    </div>
  );
};

export default Product;
