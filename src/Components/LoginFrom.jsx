import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../redux/Slice/userSlice';
import OAuth from './OAuth';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(loginFailure("Please fill out all fields"));
        }
        try {
            dispatch(loginStart());
            const API_BASE_URL = 'https://backend-11-9tn7.onrender.com/';
            const response = await axios.post('${API_BASE_URL}api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            if (!data.success) {
                navigate('/');
                return dispatch(loginFailure(data.message));
            } else {
                dispatch(loginSuccess(data));
                navigate('/home');
            }
        } catch (error) {
            dispatch(loginFailure(error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <CardBody>
                            <h2 className="text-center mb-4">Login Form</h2>
                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="formEmail">
                                        <FaEnvelope className="me-2" /> Email address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="formPassword">
                                        <FaLock className="me-2" /> Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    color="primary"
                                    block
                                >
                                    {loading ? (
                                        <Spinner size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                                <br/>
                                <OAuth />
                            </form>
                            <div className="d-flex justify-content-center mt-4">
                                <span>Don't have an account? </span>
                                <Link to="/register" className="ms-1">Sign up</Link>
                            </div>
                            {errorMessage && (
                                <Alert color="success" className="mt-4">
                                    <span className="font-weight-bold">🥴 OOPS! </span>{errorMessage}
                                </Alert>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
