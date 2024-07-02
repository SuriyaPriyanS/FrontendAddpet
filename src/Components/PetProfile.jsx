import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PetUpdateForm = ({ petId }) => {
    const navigate = useNavigate(); // Get the navigation function

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        temperament: '',
        specialNeeds: '',
        photo: '',
        description: '',
    });

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/api/pet/${petId}`);
                const petData = response.data.data;

                setFormData({
                    name: petData.name,
                    breed: petData.breed,
                    age: petData.age.toString(), // Ensure age is converted to string if necessary
                    temperament: petData.temperament,
                    specialNeeds: petData.specialNeeds,
                    photo: petData.photo,
                    description: petData.description,
                });
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPetDetails();
    }, [petId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/api/pet/6675807d6e29ed10a555b9e0`, formData);
            console.log('Pet updated successfully:', response.data);
            // Handle success, e.g., show success message or redirect
            navigate('/apply'); // Navigate back to the pet list
        } catch (error) {
            console.error('Error updating pet:', error);
            // Handle error, e.g., show error message
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                        </div>

                        {/* Other form inputs */}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Update Pet</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Example of using React Icons with CSS animation */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-8 text-center">
                    <BsFillArrowLeftCircleFill className="back-icon" />
                    <p className="back-text" onClick={() => navigate('/profile')}>Back to List</p>
                </div>
            </div>
        </div>
    );
};

export default PetUpdateForm;
