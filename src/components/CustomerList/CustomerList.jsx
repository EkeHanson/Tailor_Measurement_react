import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import img1 from '../Assets/Rectangle 21 (3).png';
import API_HOST from '../apiConfig';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customers from the API using the environment variable
    axios.get(`${API_HOST}/person/api/v1/customers/`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleSeeMeasurementClick = (customerId) => {
    // Use navigate to change the route and pass customerId in the state
    navigate('/customerdetails', { state: { customerId } });
  };

  const handleCustomerCreate = () => {
    // Use navigate to change the route and pass customerId in the state
    navigate('/create-customer');
  };

  const handleLogin = () => {
    // Add logic for handling login
    navigate('/login');
  };

  const handleSignUp = () => {
    // Add logic for handling sign-up
    navigate('/signup');
  };

  const handleLogout = () => {
    // Add logic for handling logout
    navigate('/logout');
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">AppBrew Fashion And Design</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto"> {/* Use ml-auto to push the Nav to the right */}
            <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            <Nav.Link onClick={handleSignUp}>Sign Up</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

     
      
      <h2 className="mt-4 mb-4">Customer List</h2>
      <Row xs={1} md={2} lg={4} xl={4} className="g-4">
        {customers.map((customer, index) => (
          <Col key={customer.id} className="d-flex">
            <Card className={`bg-light w-100 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
              <Card.Body className="text-center d-flex flex-column align-items-center justify-content-center">
                <Card.Title>{customer.first_name} {customer.last_name}</Card.Title>
                <Card.Text>
                  Age: {customer.age}
                  <br />
                  Gender: {customer.gender}
                  <br />
                  Phone: {customer.phone_number}
                </Card.Text>
                {/* Use handleSeeMeasurementClick to navigate and pass customerId in the state */}
                <Button variant="primary" onClick={() => handleSeeMeasurementClick(customer.id)}>
                  See Measurement
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        <Col className="d-flex">
          <Card className="bg-light w-100">
            <Card.Body className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card.Text style={{ position: 'relative' }}>
              <img
                style={{
                  width: '100%', // Set your desired width
                  height: 'auto', // Maintain aspect ratio
                  cursor: 'pointer', // Add cursor style to indicate it's clickable
                }}
                src={img1}
                alt=""
                onClick={handleCustomerCreate} // Call handleCustomerCreate on click
              />
              {/* Plus sign at the center using Bootstrap classes */}
              <span className="position-absolute top-50 start-50 translate-middle fs-3">+</span>
            </Card.Text>
              {/* <Button variant="" /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerList;
