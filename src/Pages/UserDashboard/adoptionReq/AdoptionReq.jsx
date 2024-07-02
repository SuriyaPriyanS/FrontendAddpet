// src/Pages/UserDashboard/adoptionReq/AdoptionReq.jsx

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Components/Provaders/Authproviders';

const AdoptionReq = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  // Fetch adoption requests on component mount
  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  // Function to fetch adoption requests
  const fetchAdoptionRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/api/pet/'); // Adjust URL as per your backend route
      setAdoptionRequests(res.data);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    }
  };

  // Function to handle accepting an adoption request
  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/api/pet/${requestId}/accept`); // Adjust URL and method as per your backend route
      console.log('Accept request response:', res.data);
      // Optionally update local state or display a success message
      Swal.fire({
        icon: 'success',
        title: 'Request Accepted',
        text: 'Adoption request accepted successfully!',
        timer: 1500,
        showConfirmButton: false
      });
      // Refresh adoption requests after accepting
      fetchAdoptionRequests();
    } catch (error) {
      console.error('Error accepting adoption request:', error);
      // Handle error with a message or notification
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to accept adoption request. Please try again later.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  // Function to handle rejecting an adoption request
  const handleRejectRequest = async (requestId) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/api/pet/${requestId}/reject`); // Adjust URL and method as per your backend route
      console.log('Reject request response:', res.data);
      // Optionally update local state or display a success message
      Swal.fire({
        icon: 'success',
        title: 'Request Rejected',
        text: 'Adoption request rejected successfully!',
        timer: 1500,
        showConfirmButton: false
      });
      // Refresh adoption requests after rejecting
      fetchAdoptionRequests();
    } catch (error) {
      console.error('Error rejecting adoption request:', error);
      // Handle error with a message or notification
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to reject adoption request. Please try again later.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  return (
    <div>
      <h2>Adoption Requests</h2>
      {adoptionRequests.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Requested By</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.requestedBy}</td>
                <td>{request.phone}</td>
                <td>{request.email}</td>
                <td>
                  <button className="btn btn-success mr-2" onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                  <button className="btn btn-danger" onClick={() => handleRejectRequest(request._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdoptionReq;
