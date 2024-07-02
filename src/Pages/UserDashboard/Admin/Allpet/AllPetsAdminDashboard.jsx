// src/components/admin/AdminDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, deletePet } from '../redux/Slice/petSlice'; // Adjust path as needed
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pets, loading, error } = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleDeletePet = (petId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePet(petId))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Pet has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting pet:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to delete pet!',
            });
          });
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="overflow-x-auto">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Pet Image</th>
              <th>Category</th>
              <th>Name</th>
              <th>Adoption Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>
                  <div className="avatar">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="mask mask-squircle w-12 h-12"
                    />
                  </div>
                </td>
                <td>{pet.category}</td>
                <td>{pet.name}</td>
                <td>{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
                <td>
                  <Link to={`../updatepet/${pet._id}`}>
                    <button className="btn btn-warning btn-sm text-white mx-1">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeletePet(pet._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
