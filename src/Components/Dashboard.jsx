import React from 'react';
import { Nav, Navbar, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, fetchAdoptions } from '../redux/Slice/petSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pets, loading: petsLoading, error: petsError } = useSelector((state) => state.pets);
  const { adoptions, loading: adoptionsLoading, error: adoptionsError } = useSelector(
    (state) => state.adoptions
  );

  const handleFetchPets = () => {
    dispatch(fetchPets());
  };

  const handleFetchAdoptions = () => {
    dispatch(fetchAdoptions());
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Pet Adoption Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" onClick={handleFetchPets}>
              Pet List
            </Nav.Link>
            <Nav.Link as={Link} to="/adopt">
              Add Pet
            </Nav.Link>
            <Nav.Link as={Link} to="/adoptions" onClick={handleFetchAdoptions}>
              Adoptions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Pets</Card.Title>
              {petsLoading && <p>Loading...</p>}
              {petsError && <p>Error: {petsError}</p>}
              {pets && (
                <ul>
                  {pets.map((pet) => (
                    <li key={pet._id}>
                      {pet.name} - {pet.status}
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Adoptions</Card.Title>
              {adoptionsLoading && <p>Loading...</p>}
              {adoptionsError && <p>Error: {adoptionsError}</p>}
              {adoptions && (
                <ul>
                  {adoptions.map((adoption) => (
                    <li key={adoption._id}>
                      {adoption.pet.name} - {adoption.user.email}
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
