import React from 'react';
import { products } from '../data';

const Step3 = ({ formData, setSelectedProduct, nextStep }) => {
  return (
    <div className="step-container">
      <h1>Choose Your Package</h1>
      <p className="subtitle">Select the perfect photography package for your special day</p>
      
      <div className="products-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => {
              setSelectedProduct(product);
              nextStep();
            }}
          >
            <h2>{product.name}</h2>
            <p>{product.title}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            {product.description && (
              <p className="product-description">{product.description.substring(0, 100)}...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3;