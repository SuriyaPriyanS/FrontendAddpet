import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../redux/Slice/userSlice';
import OAuth from './OAuth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: errorMessage } = useSelector((state) => state.user);

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                dispatch(loginStart());
                const response = await axios.post('https://suriyaadption.onrender.com/api/login', values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;
                if (!data.success) {
                    navigate('/');
                    dispatch(loginFailure(data.message));
                } else {
                    dispatch(loginSuccess(data));
                    navigate('/home');
                }
            } catch (error) {
                dispatch(loginFailure(error.response?.data?.message || error.message));
            }
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <CardBody>
                            <h2 className="text-center mb-4">Login Form</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <FormGroup>
                                    <Label for="email">
                                        <FaEnvelope className="me-2" /> Email address
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">
                                        <FaLock className="me-2" /> Password
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-danger">{formik.errors.password}</div>
                                    ) : null}
                                </FormGroup>
                                <Button type="submit" disabled={formik.isSubmitting || loading} color="primary" block>
                                    {formik.isSubmitting || loading ? (
                                        <Spinner size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                                <br />
                                <OAuth />
                            </form>
                            <div className="d-flex justify-content-center mt-4">
                                <span>Don't have an account? </span>
                                <Link to="/register" className="ms-1">
                                    Sign up
                                </Link>
                            </div>
                            {errorMessage && (
                                <Alert color="danger" className="mt-4">
                                    <span className="font-weight-bold">🥴 OOPS! </span>
                                    {errorMessage}
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
