import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useLocation} from 'react-router-dom'; // Import useNavigate for navigation
import { Button } from "react-bootstrap";
import SuccessCreation from "../CreateCustomer/SuccessCreation";
import API_HOST from "../apiConfig";

const EditCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [formDataC, setFormDataC] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    phone_number: "",
    gender: ""
  });

  const [formDataM, setFormDataM] = useState({
    favorite_style: "",
    round_neck: 0,
    shoulder: 0,
    top_length: 0,
    long_sleeve: 0,
    short_sleeve: 0,
    round_sleeve: 0,
    chest: 0,
    down_length: 0,
    knee: 0,
    round_knee: 0,
    bottom: 0,
    hip: 0,
    waist: 0,
    thigh: 0
  });
  
  // Add console logs to different parts of your code
// Helper function to convert gender between API format and UI format
const mapGenderToUI = (gender) => (gender === 'Male' ? 'Male' : gender === 'Female' ? 'Female' : '');

const mapGenderToAPI = (gender) => (gender === 'Male' ? 'Male' : gender === 'Female' ? 'Female' : '');

useEffect(() => {
  if (location.state && location.state.customerId) {
    const { customerId } = location.state;
    setCustomerId(customerId);

    // Fetch customer data
    axios.get(`${API_HOST}/person/api/v1/customers/${customerId}`)
      .then(response => {
        console.log("Customer data from API:", response.data);

        setFormDataC({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          age: response.data.age,
          phone_number: response.data.phone_number,
          image_url: response.data.image_url,
          gender: response.data.gender === "M" ? "Male" : "Female"
        });
      })
      .catch(error => {
        console.error('Error fetching customer details:', error);
      });
  } else {
    console.error('No customerId found in the state');
  }
}, [location.state, navigate]);

useEffect(() => {
   if (location.state && location.state.customerId) {
    const { customerId } = location.state;
    setCustomerId(customerId);
    // Fetch measurement data
    axios.get(`${API_HOST}/person/api/v1/measurements/customer/${customerId}/`)
      .then(response => {
        console.log("Measurement data from API:", response.data);

        setFormDataM({
          favorite_style: response.data[0].favorite_style || '',
          round_neck: response.data[0].round_neck || 0,
          shoulder: response.data[0].shoulder || 0,
          top_length: response.data[0].top_length || 0,
          long_sleeve: response.data[0].long_sleeve || 0,
          short_sleeve: response.data[0].short_sleeve || 0,
          round_sleeve: response.data[0].round_sleeve || 0,
          chest: response.data[0].chest || 0,
          down_length: response.data[0].down_length || 0,
          knee: response.data[0].knee || 0,
          round_knee: response.data[0].round_knee || 0,
          bottom: response.data[0].bottom || 0,
          hip: response.data[0].hip || 0,
          waist: response.data[0].waist || 0,
          thigh: response.data[0].thigh || 0
        });
      })
      .catch(error => {
        console.error('Error fetching measurement details:', error);
      });
  } else {
    console.error('No customerId found or customerId is not truthy');
  }
}, [customerId]);



const handleChangeCustomer = (e) => {
  const { name, value } = e.target;

  // Use the mapGenderToAPI function to store gender in the consistent API format
  setFormDataC((prevData) => ({ ...prevData, [name]: name === 'gender' ? mapGenderToAPI(value) : value }));

  console.log('formDataC after change:', formDataC);
};

const handleChangeMeasurements = (e) => {
  const { name, value } = e.target;
  setFormDataM((prevData) => ({ ...prevData, [name]: value }));

  console.log("formDataM after change:", formDataM);
};

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('formDataC')
      console.log(formDataC)
      const responseC = await axios.put(`${API_HOST}/person/api/v1/customers/${customerId}/`, formDataC);
      // const responseC = await axios.post(`https://tailor-measurement.onrender.com/person/api/v1/customers/`, formDataC);

      if (responseC.status === 201) {
        const updatedformDataM = {
          ...formDataM,
          customer: customerId
        };
 
       
        const responseO = await axios.put(`${API_HOST}/person/api/v1/measurements/${customerId}/`, updatedformDataM);
        // const responseO = await axios.post(`https://tailor-measurement.onrender.com/person/api/v1/measurements/`, updatedformDataM);

        if (responseO.status === 201) {
          console.log("Data sent successfully!!");
          setShowModal(true);
          // Additional actions after successful data submission
        } else {
          console.error("Failed to send order data");
        }
      } else {
        console.error("Failed to send customer data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const handleGoBack = () => {
    // Use navigate to go back
    navigate(-1);
  };

  console.log("customerId")
  console.log(customerId)
      return (
        <div>
          <Button variant="secondary" className="mb-4 mt-2 mx-1" onClick={handleGoBack}>Go Back</Button>
          <form onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className="header mt-3 pt-3">
                <p className="fs-3 fw-bold my-3">Customer details</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                  <label htmlFor="firstName" className="fs-5 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formDataC.first_name || ''}
                    onChange={handleChangeCustomer}
                    className="form-control rounded-pill w-100 border-1 py-3 px-3"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="LastName" className="fs-5 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formDataC.last_name || ''}
                    onChange={handleChangeCustomer}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="favorite_style" className="fs-5 mb-2">
                    Image Source
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formDataC.image_url || ''}
                    onChange={handleChangeCustomer}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="age" className="fs-5 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formDataC.age || 0}
                    onChange={handleChangeCustomer}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="phone_number" className="fs-5 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formDataC.phone_number || 0}
                    onChange={handleChangeCustomer}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                
            <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
              <label htmlFor="gender" className="fs-5 mb-2">
                Gender
              </label>
              <select
                className="form-select rounded-pill w-100 border-1 py-3 px-3 numero"
                aria-label="Rider"
                name="gender"
                value={formDataC.gender === "Male" ? "Male" : formDataC.gender === "Female" ? "Female" : ''}
                onChange={handleChangeCustomer}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

            </div>

            </div>
          </div>


            <div className="header mt-3 pt-3">
                <p className="fs-3 fw-bold my-3">Customer Measurements</p>
              </div>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                  <label htmlFor="favorite_style" className="fs-5 mb-2">
                    Favorite Style
                  </label>
                  <input
                    type="text"
                    name="favorite_style"
                    value={formDataM.favorite_style || ''}
                    onChange={handleChangeMeasurements}
                    className="form-control rounded-pill w-100 border-1 py-3 px-3"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="round_neck" className="fs-5 mb-2">
                  Round Neck
                  </label>
                  <input
                    type="number"
                    name="round_neck"
                    value={formDataM.round_neck || ''}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="shoulder" className="fs-5 mb-2">
                  Shoulder
                  </label>
                  <input
                    type="number"
                    name="shoulder"
                    value={formDataM.shoulder || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="top_length" className="fs-5 mb-2">
                  Top Length
                  </label>
                  <input
                    type="number"
                    name="top_length"
                    value={formDataM.top_length || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="long_sleeve" className="fs-5 mb-2">
                  Long Sleeve
                  </label>
                  <input
                    type="number"
                    name="long_sleeve"
                    value={formDataM.long_sleeve || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="short_sleeve" className="fs-5 mb-2">
                  Short Sleeve
                  </label>
                  <input
                    type="number"
                    name="short_sleeve"
                    value={formDataM.short_sleeve || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="round_sleeve" className="fs-5 mb-2">
                  Round Sleeve
                  </label>
                  <input
                    type="number"
                    name="round_sleeve"
                    value={formDataM.round_sleeve || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="chest" className="fs-5 mb-2">
                  Chest
                  </label>
                  <input
                    type="number"
                    name="chest"
                    value={formDataM.chest || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="down_length" className="fs-5 mb-2">
                  Down Length
                  </label>
                  <input
                    type="number"
                    name="down_length"
                    value={formDataM.down_length || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="knee" className="fs-5 mb-2">
                  Knee
                  </label>
                  <input
                    type="number"
                    name="knee"
                    value={formDataM.knee || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="round_knee" className="fs-5 mb-2">
                  Round Knee
                  </label>
                  <input
                    type="number"
                    name="round_knee"
                    value={formDataM.round_knee || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="bottom" className="fs-5 mb-2">
                  Bottom
                  </label>
                  <input
                    type="number"
                    name="bottom"
                    value={formDataM.bottom || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="hip" className="fs-5 mb-2">
                  Hip
                  </label>
                  <input
                    type="number"
                    name="hip"
                    value={formDataM.hip || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="waist" className="fs-5 mb-2">
                  Waist
                  </label>
                  <input
                    type="number"
                    name="waist"
                    value={formDataM.waist || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="thigh" className="fs-5 mb-2">
                  Thigh
                  </label>
                  <input
                    type="number"
                    name="thigh"
                    value={formDataM.thigh || 0}
                    onChange={handleChangeMeasurements}
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
               
              </div>
            {/* Save button */}
         {/* Save button */}
         <div className="text-center mt-1">
          <Button
            variant="primary"
            type="submit"
            className="text-decoration-none text-light fw-bold rounded-pill w-50 py-3 mt-3 mb-5"
          >
            Save
          </Button>
        </div>
      </form>
      <SuccessCreation showModal={showModal} handleCloseModal={() => setShowModal(false)} />
    </div>
  );
};

export default EditCustomer;