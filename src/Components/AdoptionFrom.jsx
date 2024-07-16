import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addPet } from '../redux/Slice/petSlice';
import { Button } from 'react-bootstrap';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

const AdoptionForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Adopt a Pet</h2>
      <Formik
        initialValues={{ name: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(addPet(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
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

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdoptionForm;
