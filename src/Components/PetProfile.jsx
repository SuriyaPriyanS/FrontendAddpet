import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PetProfile = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await axios.get(`https://suriyaadption.onrender.com/api/pet/${petId}`);

                if (response.data) {
                    setPet(response.data.data);
                    setLoading(false);
                    console.log(response.data);
                  // console.log(pet.name);
                } else {
                    setError('Pet not found.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching pet details. Please try again later.');
                setLoading(false);
            }
        };

        fetchPet();
    }, [petId]);

    const handleAdoption = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            navigate('/userdashboard');
        }, 3000); // hide success message after 3 seconds
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pet) {
        return <div>Pet not found.</div>;
    }
 
    return (
        <div className="container">
            <h2>Pet Profile</h2>
            <div>
                <h3>{pet.name}</h3>
                <img src={pet.photo} className="card-img-top pet-image" alt={pet.name} />
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Description:</strong> {pet.description}</p>
                <button className="btn btn-success" onClick={handleAdoption}>Adopt</button>
                {success && <div className="alert alert-success mt-3">Adoption successful!</div>}
            </div>
        </div>
    );
};

export default PetProfile;
