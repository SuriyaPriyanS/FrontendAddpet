// PetProfilePage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const PetProfilePage = () => {
  const { id } = useParams(); // Get petId from URL params
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'your_api_key_here'; // Replace with your actual API key
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/api/pet/${id}?key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
        const data = await response.json();
        setPet(data); // Update state with fetched pet details
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pet) {
    return <div>No pet found.</div>;
  }

  return (
    <Container>
      <h1>{pet.name}'s Profile</h1>
      <Card>
        <Card.Img variant="top" src={pet.photo} alt={pet.name} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <strong>Breed:</strong> {pet.breed}
            <br />
            <strong>Age:</strong> {pet.age}
            <br />
            <strong>Temperament:</strong> {pet.temperament}
            <br />
            <strong>Description:</strong> {pet.description}
            <br />
            <strong>Owner:</strong> {pet.owner}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PetProfilePage;
