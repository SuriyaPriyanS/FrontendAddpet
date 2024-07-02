import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, deletePet, addPet, updatePet, clearError } from '../redux/Slice/petSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pets, loading, error } = useSelector((state) => state.pets);

  const [newPet, setNewPet] = useState({ name: '', species: '' });
  const [updatePetData, setUpdatePetData] = useState({ id: '', name: '', species: '' });

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleDelete = (petId) => {
    dispatch(deletePet(petId));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addPet(newPet));
    setNewPet({ name: '', species: '' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePet(updatePetData));
    setUpdatePetData({ id: '', name: '', species: '' });
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleClearError}>Clear Error</button>
        </div>
      )}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} ({pet.species})
            <button onClick={() => handleDelete(pet.id)}>Delete</button>
            <button onClick={() => setUpdatePetData({ id: pet.id, name: pet.name, species: pet.species })}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd}>
        <h2>Add New Pet</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Species"
          value={newPet.species}
          onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
        />
        <button type="submit">Add Pet</button>
      </form>
      {updatePetData.id && (
        <form onSubmit={handleUpdate}>
          <h2>Update Pet</h2>
          <input
            type="text"
            placeholder="Name"
            value={updatePetData.name}
            onChange={(e) => setUpdatePetData({ ...updatePetData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Species"
            value={updatePetData.species}
            onChange={(e) => setUpdatePetData({ ...updatePetData, species: e.target.value })}
          />
          <button type="submit">Update Pet</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
