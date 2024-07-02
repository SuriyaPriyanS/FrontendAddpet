// AdaptationForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AdaptationForm = ({ setShowForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/api/pet/', {
        title,
        description,
        // Add more fields as needed
      });
      console.log('Post created successfully:', res.data);
      setShowForm(false); // Close the form after successful submission
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error state or display error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AdaptationForm;
