import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import mahanagarImage from "../../logo/image.png";
import './AboutUS.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/WhatWeDo');
  };

  return (
    <div className="about-container bg-light py-5 px-4 container">
      <h2 className="mb-5 text-center fw-bold">🏛️ About Mahanagar Palika</h2>

      <div className="row align-items-center mt-5">
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img
            src={mahanagarImage}
            alt="Swachh "
            className="img-fluid about-image"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>

     
        <div className="col-md-6 ">
          <h3 className="mb-3">⚙️ Services Provided:</h3>
          <ul className="list-unstyled">
            <li>✅ Online payment of sanitation and waste collection bills</li>
            <li>✅ Real-time waste collection and garbage truck tracking</li>
            <li>✅ Grievance redressal for cleanliness and hygiene-related issues</li>
            <li>✅ Registration for Swachhata volunteers and housing societies</li>
            <li>✅ Door-to-door awareness campaigns and workshops</li>
          </ul>

          <Button variant="primary" className="mt-4 ms-5" onClick={handleNavigate}>
            Learn More
          </Button>
        </div>
        <div>
            <ul className="mt-5">
                    <li>The Mahanagar Palika (Municipal Corporation) is committed to making</li>
                    <li>our cities cleaner and healthier through the Swachh Bharat initiative.</li>
                    <li>We aim to provide efficient waste management services, promote</li>
                    <li>sanitation awareness, and ensure a sustainable urban environment</li>
                   <li>for all citizens.</li>
                   <li>The 74th Amendment Act defined the formations of urban local</li>
                    <li>governments and their activities.</li>
                </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
