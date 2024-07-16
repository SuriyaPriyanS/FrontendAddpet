// AdminDashboard.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../redux/Slice/petSlice'; // Adjust the path as necessary

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { pets } = useSelector((state) => state.pet); // Adjust the slice name and property name as per your Redux setup

    useEffect(() => {
        dispatch(fetchPets());
    }, [dispatch]);

    // Ensure pets is an array before mapping over it
    const petItems = pets && pets.map((pet) => (
        <div key={pet.id}>
            <h3>{pet.name}</h3>
            {/* Display other pet details as needed */}
        </div>
    ));

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {petItems}
        </div>
    );
};

export default AdminDashboard;
