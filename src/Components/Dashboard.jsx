import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectLoggedInUser, logout } from '../redux/Slice/userSlice';
import { selectPets, fetchPets } from '../redux/Slice/petSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const pets = useSelector(selectPets);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchPets());
    }
  }, [dispatch, loggedInUser]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Pet Adoption Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Pet List
            </Nav.Link>
            <Nav.Link as={Link} to="/pet">
              Add Pet
            </Nav.Link>
            <Nav.Link as={Link} to="/adoptions">
              Adoptions
            </Nav.Link>
          </Nav>
          {loggedInUser ? (
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>

      {loggedInUser ? (
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Pets</Card.Title>
                <ul>
                  {pets.map((pet) => (
                    <li key={pet.id}>
                      {pet.name} - {pet.status}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div>
          <h3>Please log in to access the dashboard.</h3>
          <Link to="/login">Login</Link>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
