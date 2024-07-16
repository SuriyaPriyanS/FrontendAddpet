// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('https://suriyaadption.onrender.com/api/getpetall');
        setPets(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching pets. Please try again later.');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(`https://suriyaadption.onrender.com/api/pet/${petId}`);
      setPets(pets.filter((pet) => pet._id !== petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
      setError('Error deleting pet. Please try again later.');
    }
  };

  if (loading) {
    return <div className="container text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Admin Dashboard</h2>
      <div className="row">
        {pets.map((pet) => (
          <div key={pet._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shopping-card">
              <img src={pet.photo} className="card-img-top pet-image" alt={pet.name} />
              <div className="card-body">
                <h3 className="card-title">{pet.name}</h3>
                <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                <p className="card-text"><strong>Age:</strong> {pet.age}</p>
                <button onClick={() => handleDeletePet(pet._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
