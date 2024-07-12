import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import {
  createPetStart,
  createPetSuccess,
  createPetFailure,
} from "../redux/Slice/petSlice"; // Replace with your actual Redux actions

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pet); // Adjust state slice name

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createPetStart());
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("breed", formData.breed);
      formDataWithImage.append("age", formData.age);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("image", formData.image);

      const response = await fetch("http://localhost:5000/api/adoptionPost", {
        method: "POST",
        headers: {
          // Adjust headers as needed (e.g., authentication token)
        },
        body: formDataWithImage,
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch(createPetFailure(data.message));
      } else {
        dispatch(createPetSuccess(data));
        // Optionally, clear form fields after successful submission
        setFormData({
          name: "",
          breed: "",
          age: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
      dispatch(createPetFailure(error.message));
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center my-5">Admin Dashboard</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="breed">
              <Form.Label>Pet Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="age">
              <Form.Label>Pet Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet age"
                value={formData.age}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Pet Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Pet Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Pet"}
        </Button>
      </Form>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      <div className="mt-5">
        {/* Example link to manage pets */}
        <Link to="/manage-pets">
          <Button variant="secondary">Manage Pets</Button>
        </Link>
      </div>
    </Container>
  );
};

export default AdminDashboard;
