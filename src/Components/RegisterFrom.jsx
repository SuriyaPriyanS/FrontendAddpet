import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'reactstrap';
import OAuth from './OAuth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setErrorMessage("Please fill out all fields.");
            return;
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const response = await axios.post('https://backend-10-840q.onrender.com/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            if (data.success === false) {
                setErrorMessage(data.message);
            } else {
                navigate('/login');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            console.log('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register Form</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="formName" className="form-label">
                                        <FaUser className="me-2" /> Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formEmail" className="form-label">
                                        <FaEnvelope className="me-2" /> Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formPassword" className="form-label">
                                        <FaLock className="me-2" /> Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100"
                                >
                                    {loading ? (
                                        <Spinner size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                                <OAuth />
                            </form>
                            <div className="d-flex justify-content-center mt-4">
                                <span>Already have an account? </span>
                                <Link to="/login" className="ms-1">Sign In</Link>
                                
                            </div>
                            {errorMessage && (
                                <Alert color="danger" className="mt-4">
                                    <span className="font-weight-bold">🥴 OOPS! </span>{errorMessage}
                                </Alert>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
