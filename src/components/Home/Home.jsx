import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import homeImage from '../../logo/home.png';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <div className="home-page">
      <div className="home-left p-4 w-100">
        <img src={homeImage} alt="City Illustration" className="home-img w-100" />
      </div>
      <div className="home-right text-center p-4 w-100">
        <h2 className="mb-3">
          🏛️ Mahanagar Palika (Municipal Corporation) – Swachh Bharat Initiative
        </h2>
        <p className="mb-4">
          <strong>स्वच्छ भारत अभियान</strong> is a nation-wide campaign initiated by the Government of India
          to promote cleanliness, hygiene, and sanitation in all cities and towns. The Mahanagar Palika
          (Municipal Corporation) is a key administrative body responsible for the effective implementation
          of this initiative at the urban level.
        </p>
        <Button className="button d-flex align-items-center justify-content-center gap-2" onClick={handleAbout}>
          <FaBuilding /> About
        </Button>
      </div>
    </div>
  );
}

export default Home;
