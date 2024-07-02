import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplicationForm = ({ petId }) => {
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true); // Start submitting process

        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                toast.error('User is not authenticated.');
                setSubmitting(false); // Stop submitting process
                return;
            }

            const requestData = {
                petID: petId,
                message,
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/application/create`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('Application submitted successfully.');
            // Optionally, reset form fields or perform other actions upon successful submission
            setMessage('');
            setSubmitting(false); // Stop submitting process
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Failed to submit application. Please try again.');
            setSubmitError(error.message); // Set error message
            setSubmitting(false); // Stop submitting process
        }
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className="container">
            <h2>Apply for Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        Message:
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                {submitError && (
                    <div className="alert alert-danger" role="alert">
                        {submitError}
                    </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
