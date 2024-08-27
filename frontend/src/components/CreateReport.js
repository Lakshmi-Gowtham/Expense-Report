import React, { useState } from 'react';
import { createReport } from '../api/report';

const CreateReport = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReport({ name, category, quantity, price, totalPrice: quantity * price });
      alert('Report created successfully!');
    } catch (error) {
      console.error(error);
      alert('Report creation failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Create Report</button>
    </form>
  );
};

export default CreateReport;
