import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPet, initiateAdoption } from '../redux/Slice/petSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetProfile = () => {
    const { petId } = useParams();
    const dispatch = useDispatch();
    const { pet, loading, error } = useSelector((state) => state.pets);

    useEffect(() => {
        dispatch(fetchPet(petId));
    }, [dispatch, petId]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleAdopt = () => {
        dispatch(initiateAdoption(petId))
            .unwrap()
            .then(() => {
                toast.success('Adoption initiated successfully!');
            })
            .catch((err) => {
                toast.error(err.message || 'Adoption failed. Please try again.');
            });
    };

    if (loading) {
        return <div className="container text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container text-center">Error: {error}</div>;
    }

    return (
        <div className="container">
            {pet && (
                <div className="card">
                    <img src={pet.photo} className="card-img-top" alt={pet.name} />
                    <div className="card-body">
                        <h2 className="card-title">{pet.name}</h2>
                        <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                        <p className="card-text"><strong>Age:</strong> {pet.age}</p>
                        <p className="card-text"><strong>Description:</strong> {pet.description}</p>
                        <p className="card-text"><strong>Location:</strong> {pet.location}</p>
                        <button className="btn btn-primary" onClick={handleAdopt}>
                            Adopt
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default PetProfile;
