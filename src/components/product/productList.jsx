import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  const handleEdit = (product) => {
    alert(`EDIT clicked for product ID: ${product.id}`);
    // You can open a modal or pass data to edit form here
  };

  return (
    <div>
      <h5 className="text-center mt-4">LIST OF PRODUCTS</h5>
      <table className="table table-bordered table-striped table-sm mt-3">
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
                <td>{item.type}</td>
                <td>{item.costFlat}</td>
                <td>{item.costSociety}</td>
                <td className="d-flex flex-row">
                  <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(item)}>EDIT</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>DELETE</button>
                </td>
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
