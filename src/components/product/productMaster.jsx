import React from 'react';
import Product from './product';
import ProductList from './productList';

const ProductMaster = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Product />
      <ProductList />
    </div>
  );
};

export default ProductMaster;
