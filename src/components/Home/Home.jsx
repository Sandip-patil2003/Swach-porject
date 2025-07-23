import React from 'react';
import { Button } from 'react-bootstrap';
import { FaBuilding } from 'react-icons/fa';
import homeImage from '../../logo/home.png';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <>
      <div className="home-container d-flex flex-column flex-md-row align-items-center justify-content-between bg-light min-vh-100 w-100 m-0 p-0">
        <div className="home-left w-100 w-md-50 p-3">
          <img src={homeImage} alt="City Illustration" className="img-fluid hover-image w-100" />
        </div>
        <div className="home-right text-center w-100 w-md-50 p-4">
          <h2 className="mb-3">
            🏛️ Mahanagar Palika (Municipal Corporation) – Swachh Bharat Initiative
          </h2>
          <p className="mb-4">
            <strong>स्वच्छ भारत अभियान</strong> is a nation-wide campaign initiated by the Government of India
            to promote cleanliness, hygiene, and sanitation in all cities and towns. The Mahanagar Palika
            (Municipal Corporation) is a key administrative body responsible for the effective implementation
            of this initiative at the urban level.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button variant="outline-dark" onClick={handleAbout} className="px-4 py-2 d-flex align-items-center gap-2">
              <FaBuilding />
              About
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4 w-100">
        <div className="container-fluid px-4">
          <div className="row align-items-center">

            <div className="col-md-6 text-md-start text-center mb-3 mb-md-0">
              <p className="mb-1">
                &copy; {new Date().getFullYear()} Mahanagar Palika. All Rights Reserved.
              </p>
              <p className="mb-0">
                <strong>📍 Address:</strong> Municipal Office, City Center, Maharashtra, India
              </p>
            </div>

            <div className="col-md-6 text-md-end text-center">
              <p className="mb-1">
                <strong>📧 Email:</strong>{' '}
                <a href="mailto:mahanagar@palika.gov.in" className="text-white text-decoration-underline">
                  mahanagar@palika.gov.in
                </a>
              </p>
              <p className="mb-0">
                <strong>📞 Phone:</strong> 1800-123-4567
              </p>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
