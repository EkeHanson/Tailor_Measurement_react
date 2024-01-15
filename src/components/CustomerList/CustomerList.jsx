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

  const handleDeleteCustomer = async (customerId) => {
    try {
      // Send delete request to the specified endpoint
      await axios.delete(`${API_HOST}/person/api/v1/customers/${customerId}`);

      // After successful deletion, you may want to update the customers list or perform any other actions
      alert(`Customer with ID ${customerId} deleted successfully.`);

      // Refresh the customers list (optional)
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error(`Error deleting customer with ID ${customerId}:`, error);
    }
  };


  const handleEditCustomer = (customerId) => {
     // Use navigate to change the route and pass customerId in the state
     navigate('/edit-customer', { state: { customerId } });
    };

    
  return (
    <Container>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">AppBrew Fashion And Design</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
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
              <Card.Body className="text-left d-flex flex-column ">
                {/* <Card.Title className="text-center">{customer.first_name} {customer.last_name}</Card.Title> */}
                <Card.Title >{customer.first_name} {customer.last_name}</Card.Title>
                <div className="d-flex align-items-center justify-content-center w-100">
                  
                  <Card.Text className="ml-2">
                  
                    Age: {customer.age}
                    <br />                 
                    Gender: {customer.gender}
                    <br />
                    Phone: {customer.phone_number}
                  </Card.Text>
                  <img
                    // src={customer.image_url}
                    //src="https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-1/408156171_368157409090447_8648144420289602602_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=101&ccb=1-7&_nc_sid=4da83f&_nc_ohc=9xUhbcH_nEcAX_aDS_v&_nc_ht=scontent-los2-1.xx&oh=00_AfC9tJVllRhRcZGqnDAmfVpUsuBzIkUuwRVpVIItKcnfSw&oe=65AAF802"
                    // src="https://www.whitehouse.gov/wp-content/uploads/2021/01/44_barack_obama.jpg"
                    src={customer.image_url}
                    
                    alt={`Customer ${customer.first_name} ${customer.last_name}`}
                    className="mb-2 mx-1"
                    style={{ maxWidth: '55%', marginLeft: '3', marginBottom: '1', height: 'auto' }}
                  />

                  {/* Display image */}
                  
                </div>
                <div className="d-flex justify-content-between w-100">
                  <Button variant="primary" onClick={() => handleSeeMeasurementClick(customer.id)}>
                    View
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteCustomer(customer.id)}>
                    Delete
                  </Button>
                  
                  <Button variant="warning" onClick={() => handleEditCustomer(customer.id)}>
                    Edit
                  </Button>
                </div>
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
