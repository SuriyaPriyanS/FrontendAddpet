import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeFill } from 'react-icons/bs';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast } from 'react-toastify';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get(`https://backend-11-9tn7.onrender.com/api/api/pet`);

                if (Array.isArray(response.data.data)) {
                    setPets(response.data.data);
                    setLoading(false);
                } else {
                    setError('Invalid data received from server.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching pets. Please try again later.');
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleViewDetails = (petId) => {
        navigate(`/profile`);
    };

    const handleEdit = async (petId) => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                toast.error('User is not authenticated.');
                return;
            }

            const response = await axios.put(
                `https://backend-11-9tn7.onrender.com/api/pet/${petId}`,
                { /* Updated pet data */ },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            toast.success('Pet details updated successfully.');
        } catch (error) {
            console.error('Error editing pet:', error);
            toast.error('Failed to edit pet. Please try again.');
        }
    };

    const handleAdoption = async (petId) => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                toast.error('User is not authenticated.');
                return;
            }

            const response = await axios.post(
                `https://backend-11-9tn7.onrender.com/api/api/pet`, // Assuming your API endpoint for adoption
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // Update the pet status locally
            setPets(pets.map(pet => pet._id === petId ? { ...pet, status: 'adopted' } : pet));

            // Show success message
            toast.success('Pet adopted successfully.');
        } catch (error) {
            console.error('Error adopting pet:', error);
            toast.error('Failed to adopt pet. Please try again.');
        }
    };

    const handleExportJSON = () => {
        const jsonContent = JSON.stringify(pets, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pets.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const filteredPets = pets.filter(pet => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'dog') {
            return pet.breed.toLowerCase().includes('dog');
        } else if (filter === 'cat') {
            return pet.breed.toLowerCase().includes('cat');
        } else if (filter === 'birds') {
            return pet.breed.toLowerCase().includes('bird');
        }
        return true;
    }).filter(pet => {
        if (searchTerm === '') {
            return true;
        } else {
            return pet.name.toLowerCase().includes(searchTerm);
        }
    });

    useEffect(() => {
        console.log('Filtered Pets:', filteredPets);
    }, [filter, pets, searchTerm]);

    useEffect(() => {
        // Example scenario where adoption is triggered automatically
        if (filteredPets.length > 0) {
            handleAdoption(filteredPets[0]._id); // Automatically adopt the first filtered pet
        }
    }, [filteredPets]);

    if (loading) {
        return <div className="container text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container text-center">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2 className="my-4">Pet List</h2>
            <div className="row mb-4">
                <div className="col">
                    <DropdownButton id="dropdown-filter" title="Filter by Breed">
                        <Dropdown.Item onClick={() => handleFilterChange('all')}>All Pets</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('dog')}>Dog Breeds</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('cat')}>Cat Breeds</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('birds')}>Birds</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col">
                    <button className="btn btn-secondary" onClick={handleExportJSON}>Export JSON</button>
                </div>
            </div>
            <div className="row">
                {filteredPets.length > 0 ? (
                    filteredPets.map(pet => (
                        <div key={pet._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 shopping-card">
                                <img src={pet.photo} className="card-img-top pet-image" alt={pet.name} />
                                <div className="card-body">
                                    <h3 className="card-title">{pet.name}</h3>
                                    <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                                    <p className="card-text"><strong>Age:</strong> {pet.age}</p>
                                    <button onClick={() => handleViewDetails(pet._id)} className="btn btn-primary">
                                        <BsFillEyeFill className="mr-1" /> View Details
                                    </button>
                                    
                                    <button onClick={() => handleAdoption(pet._id)} className="btn btn-success ml-2 ms-2">
                                        Adopt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col">No pets found.</p>
                )}
            </div>
        </div>
    );
};

export default PetList;
