import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiossercures';
import Swal from 'sweetalert2';
import { MdArrowDropDown } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
 // Example custom CSS file

const AllPetsAdmin = () => {
  const [pets, setPets] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch(`https://serversite-pet-adoption.vercel.app/pets`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched pets:', data);
        setPets(data);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  };

  const updatePetStatusLocally = (petId, newStatus) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet._id === petId ? { ...pet, adopted: newStatus } : pet
      )
    );
  };

  const handleChangeAdopted = (pet) => {
    const petId = pet._id;

    // Optimistically update the local state
    updatePetStatusLocally(petId, true);

    axiosSecure
      .patch(`/admin/adopted/${petId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount === 0) {
          // Revert the local state if the request fails
          updatePetStatusLocally(petId, false);
          console.error('Failed to update adoption status.');
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Changed adoption status successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        // Revert the local state if the request fails
        updatePetStatusLocally(petId, false);
        console.error('Error updating adoption status:', error);
      });
  };

  const handleChangeNotAdopted = (pet) => {
    const petId = pet._id;

    // Optimistically update the local state
    updatePetStatusLocally(petId, false);

    axiosSecure
      .patch(`/admin/notadopted/${petId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount === 0) {
          // Revert the local state if the request fails
          updatePetStatusLocally(petId, true);
          console.error('Failed to update adoption status.');
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Changed adoption status successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        // Revert the local state if the request fails
        updatePetStatusLocally(petId, true);
        console.error('Error updating adoption status:', error);
      });
  };

  const deletePet = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://serversite-pet-adoption.vercel.app/pets/${_id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Pet deleted successfully:', data);
            setPets((prevPets) =>
              prevPets.filter((pet) => pet._id !== _id)
            );
          })
          .catch((error) => console.error('Error deleting pet:', error));
      }
    });
  };

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
              <th>Change Status</th>
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
                  <button
                    onClick={() => handleChangeAdopted(pet)}
                    className="btn btn-success btn-sm mx-1"
                    disabled={pet.adopted === true}
                  >
                    Adopted
                  </button>
                  <button
                    onClick={() => handleChangeNotAdopted(pet)}
                    className="btn btn-info btn-sm"
                    disabled={pet.adopted === false}
                  >
                    Not Adopted
                  </button>
                </td>
                <td>
                  <Link to={`../updatepet/${pet._id}`}>
                    <button className="btn btn-warning btn-sm text-white mx-1">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePet(pet._id)}
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

export default AllPetsAdmin;
