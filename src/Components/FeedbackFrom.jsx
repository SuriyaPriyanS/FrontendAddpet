import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const FeedbackForm = () => {
    const initialValues = {
        name: '',
        email: '',
        message: ''
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        message: yup.string().required('Message is required')
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Simulate sending the feedback data to a server
        setTimeout(() => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
        }, 400);
    };

    return (
        <div>
            <h2>Feedback Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <Field as="textarea" id="message" name="message" className="form-control" />
                        <ErrorMessage name="message" component="div" className="error-message" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default FeedbackForm;
