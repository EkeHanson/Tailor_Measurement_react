// src/components/MeasurementDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import API_HOST from '../apiConfig';

const MeasurementDetail = () => {
  // const apiHostname = process.env.REACT_APP_API_HOSTNAME1;
  const navigate = useNavigate();
  const location = useLocation();
  const customerId = location.state ? location.state.customerId : null;

  const [measurement, setMeasurement] = useState(null);

  useEffect(() => {
    if (customerId) {
      // Fetch measurements for the specified customer ID
      // axios.get(`${API_HOST}/person/api/v1/measurements/customer/${customerId}/`)
      axios.get(`https://tailor-measurement.onrender.com/person/api/v1/measurements/customer/${customerId}/`)
        .then(response => {
          setMeasurement(response.data[0]);
        })
        .catch(error => {
          console.error('Error fetching measurements:', error);
        });
    }
  }, [customerId]);

  if (!measurement) {
    return <p>Loading...</p>;
  }
  const handleGoBack = () => {
    // Use navigate to go back
    navigate(-1);
  };

  return (
    <div>
       <Button variant="secondary" className="mb-4 mt-2 mx-1" onClick={handleGoBack}>Go Back</Button>
      <h2>Measurement Details</h2>
      <div>
        <div>Favorite Style: {measurement.favorite_style}</div>
        <div>Round Neck: {measurement.round_neck}</div>
        <div>Shoulder: {measurement.shoulder}</div>
        <div>Top Length: {measurement.top_length}</div>
        <div>Long Sleeve: {measurement.long_sleeve}</div>
        <div>Short Sleeve: {measurement.short_sleeve}</div>
        <div>Round Sleeve: {measurement.round_sleeve}</div>
        <div>Chest: {measurement.chest}</div>
        <div>Down Length: {measurement.down_length}</div>
        <div>Knee: {measurement.knee}</div>
        <div>Round Knee: {measurement.round_knee}</div>
        <div>Bottom: {measurement.bottom}</div>
        <div>Hip: {measurement.hip}</div>
        <div>Waist: {measurement.waist}</div>
        <div>Thigh: {measurement.thigh}</div>
      </div>
    </div>
  );
};

export default MeasurementDetail;
