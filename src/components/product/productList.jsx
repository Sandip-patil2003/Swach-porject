import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ type: '', costFlat: '', costSociety: '' });

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      const sample = res.data.slice(0, 5).map((item, index) => ({
        id: item.id,
        type: `Type ${index + 1}`,
        costFlat: 1000 + index * 500,
        costSociety: 100000 + index * 50000
      }));
      setProducts(sample);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const handleEdit = (id) => {
    const product = products.find(item => item.id === id);
    setEditId(id);
    setEditData({
      type: product.type,
      costFlat: product.costFlat,
      costSociety: product.costSociety
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    const updatedProduct = {
      ...products.find(item => item.id === id),
      type: editData.type,
      costFlat: editData.costFlat,
      costSociety: editData.costSociety
    };
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts(products.map(item => item.id === id ? updatedProduct : item));
      setEditId(null);
    } catch (err) {
      alert('Failed to update product.');
      console.error('Edit Error:', err);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div>
      <h5 className="text-center mt-4">LIST OF PRODUCTS</h5>
      <table className="table table-bordered table-striped table-sm mt-3" style={{ fontSize: '0.9rem' }}>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Type</th>
            <th>Monthly Cost/Flat (Rs)</th>
            <th>Monthly Cost/Society (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {editId === item.id ? (
                  <>
                    <td><input name="type" value={editData.type} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="costFlat" value={editData.costFlat} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td><input name="costSociety" value={editData.costSociety} onChange={handleEditChange} className="form-control form-control-sm" /></td>
                    <td className="d-flex flex-row">
                      <button className="btn btn-sm btn-success me-1" style={{fontSize:'13px'}} onClick={() => handleEditSave(item.id)}>SAVE</button>
                      <button className="btn btn-sm btn-secondary" style={{fontSize:'13px'}} onClick={handleEditCancel}>CANCEL</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.type}</td>
                    <td>{item.costFlat}</td>
                    <td>{item.costSociety}</td>
                    <td className="d-flex flex-row">
                      <button className="btn btn-sm me-2" onClick={() => handleEdit(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                      <button className="btn btn-sm" onClick={() => handleDelete(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
