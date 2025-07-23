import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeImage from '../../logo/home.png';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="row g-0 w-100 h-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={homeImage} alt="City" className="img-fluid home-img" />
        </div>

        {/* Right Side - Info and Buttons */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-4">
          <h2 className="mb-3 text-primary">स्वच्छ महापालिका (Swachh Mahanagar Palika)</h2>
          <p className="mb-4">
            Welcome to the official Mahanagar Palika portal. Here, you can access bill payment,
            civic services, waste management data, and more. Our aim is to build a smarter,
            cleaner city for everyone.
          </p>
          <div className="d-flex gap-3">
            <button className="button" onClick={() => navigate('/services')}>
              Go to Services
            </button>

            <button className="button" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
