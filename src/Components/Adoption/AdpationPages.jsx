import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import AdaptationCard from './AdpationCard';
import AdaptationForm from './AdpationFrom';
import { setLoggedInUser } from '../../redux/Slice/userSlice';


const AdaptationPage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(setLoggedInUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(false);
  const [adaptationPosts, setAdaptationPosts] = useState([]);

  useEffect(() => {
    const fetchAllAdaptationPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/api/pet/");
        setAdaptationPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdaptationPosts();
  }, []);

  const totalPages = Math.ceil(adaptationPosts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className='pb-5'>
      {!adaptationPosts.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation='border' />
        </div>
      ) : (
        <div className='container'>
          {loggedInUser ? (
            <Button
              onClick={handleShowForm}
              className='form-button'
              variant='outline-primary'
            >
              <FontAwesomeIcon className="font-weight-normal text-secondary" icon={faUpload} />
              SHARE PET ADOPTION POST
            </Button>
          ) : (
            <p className='mt-2'><a href="/sign-in">Sign in</a> to share your own adoption post!</p>
          )}

          <Modal show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeLabel='cancel'>
              <Modal.Title>Upload adoption post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AdaptationForm setShowForm={setShowForm} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseForm}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <AdaptationCard adaptationPosts={adaptationPosts} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AdaptationPage;
