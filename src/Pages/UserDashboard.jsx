import React from 'react';

const UserDashboard = ({ adoptedPets }) => {
    return (
        <div className="container">
            <h2 className="my-4">Your Adopted Pets</h2>
            {adoptedPets.length > 0 ? (
                <div className="row">
                    {adoptedPets.map(pet => (
                        <div key={pet._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 shopping-card">
                                <img src={pet.photo} className="card-img-top pet-image" alt={pet.name} />
                                <div className="card-body">
                                    <h3 className="card-title">{pet.name}</h3>
                                    <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                                    <p className="card-text"><strong>Age:</strong> {pet.age}</p>
                                    <p className="text-success">Adopted!</p>
                                    {/* Add more details or actions as needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="col">You haven't adopted any pets yet.</p>
            )}
        </div>
    );
};

export default UserDashboard;
