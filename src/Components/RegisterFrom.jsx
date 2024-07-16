import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'reactstrap';
import OAuth from './OAuth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RegisterForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('https://suriyaadption.onrender.com/api/register', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            if (data.success === false) {
                setErrors({ errorMessage: data.message });
            } else {
                navigate('/login');
            }
        } catch (error) {
            setErrors({ errorMessage: error.response?.data?.message || error.message });
            console.error('Registration failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register Form</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                <FaUser className="me-2" /> Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Enter your name"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                <FaEnvelope className="me-2" /> Email address
                                            </label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                <FaLock className="me-2" /> Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary w-100"
                                        >
                                            {isSubmitting ? (
                                                <Spinner size="sm" role="status" aria-hidden="true" />
                                            ) : (
                                                'Sign Up'
                                            )}
                                        </button>
                                        <OAuth />
                                    </Form>
                                )}
                            </Formik>
                            <div className="d-flex justify-content-center mt-4">
                                <span>Already have an account? </span>
                                <Link to="/login" className="ms-1">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
