import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, Alert } from 'reactstrap';
import axios from 'axios';
import { addPet } from '../redux/Slice/petSlice';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  photo: Yup.mixed().required('Photo is required'), // Validation for photo
});

const AdoptionForm = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // State for selected photo file

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setSubmitting(true);
      setSubmissionError(null);

      // Prepare form data to include photo file
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('photo', photoFile); // Append photo file to form data

      const response = await axios.post('https://suriyaadption.onrender.com/api/adoptionPosts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });

      // Dispatch Redux action if needed
      dispatch(addPet(response.data));
      setSubmittedData(response.data);

      resetForm();
    } catch (error) {
      setSubmissionError(error.response?.data?.message || error.message);
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]); // Assuming single file selection
  };

  return (
    <div>
      <h2>Adopt a Pet</h2>
      <Formik
        initialValues={{ name: '', description: '', photo: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Pet Name</label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter pet name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                type="text"
                name="description"
                className="form-control"
                placeholder="Enter description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*" // Accept only image files
                onChange={(e) => {
                  handleFileChange(e);
                  setFieldValue('photo', e.currentTarget.files[0]); // Set Formik field value for photo
                }}
                className="form-control"
              />
              <ErrorMessage name="photo" component="div" className="text-danger" />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Display success message and submitted data */}
      {submittedData && (
        <Card className="mt-3">
          <CardBody>
            <h5>Success!</h5>
            <p>Your pet has been successfully added:</p>
            <p>Name: {submittedData.name}</p>
            <p>Description: {submittedData.description}</p>
            {/* Display uploaded photo */}
            {submittedData.photo && (
              <img
                src={`https://suriyaadption.onrender.com${submittedData.photo}`} // Assuming your API returns photo path
                alt={submittedData.name}
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            )}
          </CardBody>
        </Card>
      )}

      {/* Display error message if submission fails */}
      {submissionError && (
        <Alert color="danger" className="mt-3">
          {submissionError}
        </Alert>
      )}
    </div>
  );
};

export default AdoptionForm;
