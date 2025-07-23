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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', product);
      alert('Product submitted successfully!');
      setProduct({ type: '', shortName: '', costFlat: '', costSociety: '' });
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Failed to submit product');
    }
  };

  const handleCancel = () => {
    setProduct({ type: '', shortName: '', costFlat: '', costSociety: '' });
  };

  return (
    <div className="container mt-4 p-4 border bg-light rounded">
      <h5 className="text-center mb-4">PRODUCT MASTER</h5>
      <div className="row">
        <div className="col-md-6 mb-3 ">
          <label className='size'>Product Type</label>
          <select className="form-control mx-auto text w-75 h-50" name="type" value={product.type} onChange={handleChange}>
            <option value="" >Select</option>
            <option value="Waste Collection"  >Waste Collection</option>
            <option value="Dry Waste"  >Dry Waste</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Short Name</label>
          <input className="form-control mx-auto w-75 h-50" name="shortName" value={product.shortName} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Monthly Cost / Flat</label>
          <input className="form-control mx-auto w-75 h-50" name="costFlat" value={product.costFlat} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className='size'>Monthly Cost / Society</label>
          <input className="form-control mx-auto w-75 h-50" name="costSociety" value={product.costSociety} onChange={handleChange} />
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
