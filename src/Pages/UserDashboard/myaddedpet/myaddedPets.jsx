import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { selectCurrentUser } from '../../../redux/Slice/userSlice';

import './myAddedPets.css';

const MyAddedPets = () => {
  const user = useSelector(selectCurrentUser);

  const [filteredPets, setFilteredPets] = useState([]);
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const petsPerPage = 10;
  const pagesVisited = currentPage * petsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'YOUR_API_KEY';
      try {
        const response = await axios.get(`http://localhost:5000/api/adoptionPosts/66828ada9da3620d709ad15d?key=${apiKey}`);
        console.log('Fetched pets:', response.data);
        setPets(response.data);
      } catch (error) {
        console.log('Error fetching my added pets:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setFilteredPets(pets.filter(pet => pet.userEmail === user.email));
    }
  }, [pets, user]);

  const deletePet = async (_id) => {
    const apiKey = 'YOUR_API_KEY';
    try {
      const response = await axios.delete(`http://localhost:5000/api/adoptionPosts/${_id}?key=${apiKey}`);
      console.log('Pet deleted successfully:', response.data);
      setPets(prevPets => prevPets.filter(pet => pet._id !== _id));
      // Optionally show success message using Swal.fire
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Pet deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting pet:', error);
      // Handle error with Swal.fire or other error handling approach
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete pet. Please try again later.',
      });
    }
  };

  const adoptPet = async (_id) => {
    const pet = pets.find(pet => pet._id === _id);
    if (pet && !pet.adopted) {
      const apiKey = 'YOUR_API_KEY';
      try {
        const response = await axios.put(`http://localhost:5000/api/adoptionPosts/${_id}?key=${apiKey}`, { adopted: true });
        console.log('Pet adopted successfully:', response.data);
        setPets(prevPets =>
          prevPets.map(pet =>
            pet._id === _id ? { ...pet, adopted: true } : pet
          )
        );
      } catch (error) {
        console.error('Error adopting pet:', error);
        // Handle error with Swal.fire or other error handling approach
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to adopt pet. Please try again later.',
        });
      }
    }
  };

  const pageCount = Math.ceil(filteredPets.length / petsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayPets = filteredPets
    .slice(pagesVisited, pagesVisited + petsPerPage)
    .map((pet, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className='flex items-center gap-3'>
            <div className='avatar'>
              <div className='mask mask-squircle w-12 h-12'>
                <img src={pet.image} alt='Avatar Tailwind CSS Component' />
              </div>
            </div>
          </div>
        </td>
        <td>{pet.name}</td>
        <td>{pet.category}</td>
        <td>{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
        <td>
          <Link to={`../updatepet/${pet._id}`}>
            <button className='btn btn-warning btn-xs text-white'>
              Update
            </button>
          </Link>
          <button
            className='btn btn-danger btn-xs'
            onClick={() => deletePet(pet._id)}
          >
            Delete
          </button>
          {!pet.adopted && (
            <button
              className='btn btn-primary btn-xs'
              onClick={() => adoptPet(pet._id)}
            >
              Adopt
            </button>
          )}
        </td>
      </tr>
    ));

  if (!pets || pets.length === 0) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h2 className='text-center text-3xl font-bold'>
            You have not added any pet
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col'>
            <h1 className='font-semibold text-2xl mb-4'>My Added Pets</h1>
          </div>
          <div className='col text-end'>
            <h2 className='font-semibold text-2xl'>
              {filteredPets.length} Added Pets
            </h2>
          </div>
        </div>
        {filteredPets.length > 0 ? (
          <div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Adopt Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{displayPets}</tbody>
              </table>
            </div>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'pagination justify-content-center mt-4'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              disabledClassName={'page-item disabled'}
              activeClassName={'page-item active'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
            />
          </div>
        ) : (
          <div className='text-center mt-5'>
            <p>You haven't added any pets yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedPets;
